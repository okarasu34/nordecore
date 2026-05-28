# Deconor — Premium Surface Materials

E-commerce platform for premium building materials. Built with Next.js 14, Prisma, Stripe, and AI room visualization.

---

## 🚀 Kurulum (Setup)

### 1. Gereksinimler
- Node.js 18+
- Git
- Supabase hesabı (ücretsiz) → supabase.com
- Stripe hesabı (ücretsiz) → stripe.com
- Cloudinary hesabı (ücretsiz) → cloudinary.com
- Resend hesabı (ücretsiz) → resend.com
- Replicate hesabı (AI için) → replicate.com

### 2. Projeyi klonla
```bash
git clone https://github.com/YOUR_USERNAME/Deconor.git
cd Deconor
npm install
```

### 3. Environment değişkenlerini ayarla
```bash
cp .env.example .env.local
```

`.env.local` dosyasını açıp tüm değerleri doldur:

**Supabase:**
1. supabase.com → New Project
2. Settings → Database → Connection string'i kopyala → DATABASE_URL
3. Settings → API → URL ve anon key'i kopyala

**Stripe:**
1. stripe.com → Dashboard → Developers → API Keys
2. Publishable key → NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
3. Secret key → STRIPE_SECRET_KEY
4. Webhook: `stripe listen --forward-to localhost:3000/api/payments/webhook`
5. Webhook secret → STRIPE_WEBHOOK_SECRET

**Cloudinary:**
1. cloudinary.com → Dashboard
2. Cloud name, API Key, API Secret'i kopyala

**Resend:**
1. resend.com → API Keys → Create API Key

**Replicate:**
1. replicate.com → Account → API Token

### 4. Veritabanını oluştur
```bash
npx prisma db push
npm run db:seed
```

### 5. Geliştirme sunucusunu başlat
```bash
npm run dev
```

Tarayıcıda aç: http://localhost:3000

---

## 📁 Proje Yapısı

```
Deconor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/        ← Ürün CRUD
│   │   │   ├── orders/          ← Sipariş yönetimi
│   │   │   ├── payments/        ← Stripe ödeme
│   │   │   │   └── webhook/     ← Stripe webhook
│   │   │   └── visualizer/      ← AI görselleştirici
│   │   └── site/
│   │       └── page/            ← Ana sayfa
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       ← Nav + dil geçişi
│   │   │   ├── VideoHero.tsx    ← Video hero bölümü
│   │   │   └── StatsBar.tsx     ← İstatistik bandı
│   │   ├── product/
│   │   │   ├── ProductCard.tsx  ← Ürün kartı
│   │   │   └── RoomVisualizer.tsx ← AI görselleştirici
│   │   └── cart/
│   │       └── CartDrawer.tsx   ← Sepet drawer
│   ├── lib/
│   │   ├── prisma.ts            ← DB bağlantısı
│   │   ├── stripe.ts            ← Stripe config
│   │   └── cloudinary.ts        ← Görsel upload
│   ├── store/
│   │   ├── cart.ts              ← Sepet state (Zustand)
│   │   └── locale.ts            ← Dil state (EN/NO)
│   └── types/
│       └── index.ts             ← TypeScript tipleri
├── prisma/
│   ├── schema.prisma            ← Veritabanı şeması
│   └── seed.ts                  ← Örnek veriler
└── .env.example                 ← Env şablonu
```

---

## 🌍 Deployment (Vercel)

```bash
# 1. GitHub'a push et
git add .
git commit -m "Initial commit"
git push origin main

# 2. vercel.com → New Project → GitHub repo seç
# 3. Environment Variables'ı Vercel dashboard'dan ekle
# 4. Deploy!
```

---

## 💳 Ödeme Test Kartları

| Kart | Numara |
|------|--------|
| Başarılı | 4242 4242 4242 4242 |
| Başarısız | 4000 0000 0000 0002 |
| 3D Secure | 4000 0025 0000 3155 |

Son kullanma: herhangi gelecek tarih, CVV: herhangi 3 rakam

---

## 🎨 AI Room Visualizer

Replicate API ile çalışır. Stable Diffusion inpainting modeli kullanır.
- Kullanıcı oda fotoğrafı yükler
- Ürün seçer (zemin/duvar)
- AI 10-20 saniyede sonucu üretir
- Maliyeti: ~€0.01 per görsel

---

## 📧 Email Şablonları

Otomatik gönderilen emailler:
- ✅ Sipariş onayı (ödeme sonrası)
- 📦 Kargo bildirimi (manuel tetikleme)
- 🌟 Değerlendirme isteği (7 gün sonra)

---

## 🔧 Geliştirme Notları

- `npm run dev` → localhost:3000
- `npm run db:studio` → Prisma Studio (görsel DB yönetimi)
- `npm run db:seed` → Örnek verileri ekle
- Stripe webhook test: `stripe listen --forward-to localhost:3000/api/payments/webhook`
