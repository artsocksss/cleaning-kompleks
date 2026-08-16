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

    // Delivery can be connected later through an environment-backed CRM/email/Telegram integration.
    // No secrets or external credentials are exposed to the browser.
    console.info('Cleaning Kompleks lead received', { name, phone, service })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Не вдалося обробити заявку.' }, { status: 400 })
  }
}
