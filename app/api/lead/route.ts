import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const service = String(body.service ?? '').trim()

    if (!name || !phone || !service) {
      return NextResponse.json({ ok: false, error: 'Заповніть усі поля.' }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID

    if (token && adminChatId) {
      const text = [
        '🧹 Нова заявка — Cleaning Kompleks',
        '',
        `Імʼя: ${name}`,
        `Телефон: ${phone}`,
        `Послуга: ${service}`,
      ].join('\n')

      const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: adminChatId, text }),
      })

      if (!telegramResponse.ok) {
        console.error('Telegram notification failed', await telegramResponse.text())
        return NextResponse.json({ ok: false, error: 'Не вдалося передати заявку адміністратору.' }, { status: 502 })
      }
    } else {
      console.info('Cleaning Kompleks lead received; Telegram is not configured', { name, phone, service })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Не вдалося обробити заявку.' }, { status: 400 })
  }
}
