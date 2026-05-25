import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const SUPPORTED_CURRENCIES: Record<string, string> = {
  NO: 'nok',
  SE: 'sek',
  FI: 'eur',
  DE: 'eur',
  GB: 'gbp',
  NL: 'eur',
  DK: 'dkk',
  DEFAULT: 'eur',
}

export const getCurrencyForCountry = (country: string) =>
  SUPPORTED_CURRENCIES[country.toUpperCase()] ?? SUPPORTED_CURRENCIES.DEFAULT

// Stripe payment methods per region
export const PAYMENT_METHODS: Record<string, string[]> = {
  NO: ['card', 'klarna', 'vipps'],
  SE: ['card', 'klarna', 'swish'],
  FI: ['card', 'klarna'],
  DE: ['card', 'klarna', 'sepa_debit'],
  DEFAULT: ['card', 'klarna'],
}
