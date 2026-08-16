'use client'

import { FormEvent, useMemo, useState } from 'react'

type Step = 1 | 2 | 3 | 4

export default function MiniApp() {
  const [step, setStep] = useState<Step>(1)
  const [service, setService] = useState('')
  const [area, setArea] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')

  const services = useMemo(() => ['Підтримуюче прибирання', 'Генеральне прибирання', 'Після ремонту', 'Мийка вікон', 'Хімчистка меблів', 'Комерційний клінінг'], [])

  async function submit(event: FormEvent) {
    event.preventDefault()
    setStatus('Відправляємо…')
    const response = await fetch('/api/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, service, area, date, telegram: true }),
    })
    const data = await response.json()
    if (data.ok) { setStep(4); setStatus('') } else setStatus(data.error ?? 'Не вдалося надіслати заявку.')
  }

  return (
    <main className="miniapp">
      <div className="mini-head"><b>Cleaning Kompleks</b><span>Клінінг</span></div>
      <div className="progress"><i style={{ width: `${step * 25}%` }} /></div>

      {step === 1 && <section><p className="eyebrow">Крок 1 з 4</p><h1>Що потрібно прибрати?</h1><div className="mini-grid">{services.map((item) => <button className={service === item ? 'selected' : ''} key={item} onClick={() => { setService(item); setStep(2) }}>{item}</button>)}</div></section>}
      {step === 2 && <section><p className="eyebrow">Крок 2 з 4</p><h1>Яка площа?</h1><input autoFocus type="number" min="1" inputMode="numeric" placeholder="м²" value={area} onChange={(e) => setArea(e.target.value)} /><button className="primary" disabled={!area} onClick={() => setStep(3)}>Далі</button></section>}
      {step === 3 && <section><p className="eyebrow">Крок 3 з 4</p><h1>Коли вам зручно?</h1><input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} /><input placeholder="Ваше імʼя" value={name} onChange={(e) => setName(e.target.value)} required /><input type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required /><button className="primary" disabled={!date || !name || !phone} onClick={() => setStep(4)}>Перевірити заявку</button></section>}
      {step === 4 && <section><p className="eyebrow">{status || 'Фінальний крок'}</p><h1>{status ? 'Заявку надіслано' : 'Підтвердіть заявку'}</h1>{!status && <><div className="summary"><b>{service}</b><span>{area} м² · {date}</span><span>{name} · {phone}</span></div><form onSubmit={submit}><button className="primary" type="submit">Надіслати заявку</button></form></>}</section>}

      {step > 1 && !status && <button className="back" onClick={() => setStep((step - 1) as Step)}>← Назад</button>}
    </main>
  )
}
