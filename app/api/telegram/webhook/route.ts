import { NextResponse } from 'next/server'

const apiBase = () => `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID
  if (!token || !adminChatId) return NextResponse.json({ ok: false, error: 'Telegram is not configured' }, { status: 503 })

  const update = await request.json()
  const message = update?.message
  if (!message?.chat?.id) return NextResponse.json({ ok: true })

  const text = String(message.text ?? '')
  if (text === '/start') {
    await fetch(`${apiBase()}/sendMessage`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: message.chat.id, text: 'Cleaning Kompleks\n\nПрофесійний клінінг для дому та бізнесу.\n\nВідкрийте міні-додаток, щоб обрати послугу та залишити заявку.', reply_markup: { inline_keyboard: [[{ text: 'Відкрити міні-додаток', web_app: { url: process.env.TELEGRAM_WEBAPP_URL } }]] } }),
    })
  }

  return NextResponse.json({ ok: true })
}
