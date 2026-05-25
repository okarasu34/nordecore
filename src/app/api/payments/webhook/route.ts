import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as any
      const orderId = pi.metadata.orderId

      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
      })

      // Send confirmation email
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } }, shippingAddress: true },
      })

      if (order) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: order.email,
          subject: `Nordecore — Order Confirmed #${order.id.slice(-8).toUpperCase()}`,
          html: buildConfirmationEmail(order),
        })
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as any
      await prisma.order.update({
        where: { id: pi.metadata.orderId },
        data: { status: 'CANCELLED' },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}

function buildConfirmationEmail(order: any): string {
  const itemsHtml = order.items.map((item: any) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;font-family:Georgia,serif;font-size:14px;color:#2c1e0a">${item.name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;text-align:right;font-family:Arial,sans-serif;font-size:13px;color:#7a6a50">${item.quantity}m²</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d0;text-align:right;font-family:Georgia,serif;font-size:15px;color:#c9a84c">€${(item.price * item.quantity).toFixed(0)}</td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <body style="background:#f5f0e8;margin:0;padding:40px 20px;font-family:Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid rgba(201,168,76,0.2);">
        <div style="background:#2a1e0e;padding:28px 32px;text-align:center;">
          <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:6px;color:#c9a84c;">Nordecore</div>
          <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;color:#888;margin-top:6px;text-transform:uppercase;">Order Confirmed</div>
        </div>
        <div style="padding:32px;">
          <p style="font-family:Georgia,serif;font-size:18px;color:#2c1e0a;">Thank you, ${order.shippingAddress?.name ?? order.email}!</p>
          <p style="font-family:Arial,sans-serif;font-size:13px;color:#7a6a50;line-height:1.9;">Your order <strong>#${order.id.slice(-8).toUpperCase()}</strong> has been confirmed and is being prepared.</p>
          <table style="width:100%;margin:24px 0;">${itemsHtml}</table>
          <div style="display:flex;justify-content:space-between;padding:12px 0;border-top:2px solid rgba(201,168,76,0.2);">
            <span style="font-family:Arial,sans-serif;font-size:13px;font-weight:bold;color:#2c1e0a;">Total</span>
            <span style="font-family:Georgia,serif;font-size:20px;color:#c9a84c;">€${order.total.toFixed(0)}</span>
          </div>
        </div>
        <div style="background:#f5f0e8;padding:20px 32px;text-align:center;border-top:1px solid rgba(201,168,76,0.15);">
          <p style="font-family:Arial,sans-serif;font-size:11px;color:#8a7a60;">Nordecore AS · Oslo, Norway · Nordecore.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}
