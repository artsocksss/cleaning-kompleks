import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const service = String(body.service ?? '').trim()

    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Заповніть усі поля.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const recipient = process.env.CLEANING_EMAIL

    if (!apiKey || !recipient) {
      return NextResponse.json({ error: 'Форма ще не налаштована для прийому заявок.' }, { status: 503 })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Cleaning Kompleks <onboarding@resend.dev>',
        to: [recipient],
        subject: `Нова заявка: ${service}`,
        text: `Ім'я: ${name}\nТелефон: ${phone}\nПослуга: ${service}`,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Не вдалося надіслати заявку.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Некоректний запит.' }, { status: 400 })
  }
}
