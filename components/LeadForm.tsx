'use client'

import { FormEvent, useState } from 'react'

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          service: data.get('service'),
        }),
      })

      if (!response.ok) throw new Error('Request failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} aria-live="polite">
      <input name="name" placeholder="Ваше імʼя" autoComplete="name" required />
      <input name="phone" placeholder="Телефон" type="tel" autoComplete="tel" required />
      <select name="service" defaultValue="" required>
        <option value="" disabled>Оберіть послугу</option>
        <option>Підтримуюче прибирання</option>
        <option>Генеральне прибирання</option>
        <option>Прибирання після ремонту</option>
        <option>Мийка вікон</option>
        <option>Хімчистка меблів</option>
        <option>Комерційний клінінг</option>
      </select>
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Надсилаємо…' : 'Надіслати заявку'}
      </button>
      {status === 'success' && <p role="status">Заявку отримано. Ми звʼяжемося з вами найближчим часом.</p>}
      {status === 'error' && <p role="alert">Не вдалося надіслати заявку. Перевірте дані та спробуйте ще раз.</p>}
    </form>
  )
}
