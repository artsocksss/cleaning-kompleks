'use client'

import { FormEvent, useMemo, useState } from 'react'

type Step = 1 | 2 | 3 | 4

const serviceOptions = [
  { title: 'Підтримуюче прибирання', rate: 45, duration: '2–3 год' },
  { title: 'Генеральне прибирання', rate: 65, duration: '4–6 год' },
  { title: 'Після ремонту', rate: 95, duration: '6–8 год' },
  { title: 'Мийка вікон', rate: 120, duration: 'від 1 год' },
  { title: 'Хімчистка меблів', rate: 900, duration: '1–2 год' },
  { title: 'Комерційний клінінг', rate: 55, duration: 'за графіком' },
]

export default function MiniApp() {
  const [step, setStep] = useState<Step>(1)
  const [service, setService] = useState(serviceOptions[1].title)
  const [area, setArea] = useState('50')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectedService = useMemo(() => serviceOptions.find((item) => item.title === service) ?? serviceOptions[0], [service])
  const estimate = useMemo(() => {
    const meters = Math.max(1, Number(area) || 0)
    const price = selectedService.title === 'Хімчистка меблів' ? selectedService.rate : meters * selectedService.rate
    return Math.max(1200, Math.round(price)).toLocaleString('uk-UA')
  }, [area, selectedService])

  async function submit(event: FormEvent) {
    event.preventDefault()
    setStatus('Відправляємо…')
    const response = await fetch('/api/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, service, area, date, time, note, source: 'telegram-mini-app' }),
    })
    const data = await response.json()
    if (data.ok) { setIsSubmitted(true); setStatus('Заявку надіслано. Менеджер підтвердить деталі у Telegram або телефоном.') } else setStatus(data.error ?? 'Не вдалося надіслати заявку.')
  }

  return (
    <main className="miniapp">
      <div className="mini-head"><b>Cleaning Kompleks</b><span>{estimate} ₴ · {selectedService.duration}</span></div>
      <div className="progress"><i style={{ width: `${step * 25}%` }} /></div>

      {step === 1 && <section><p className="eyebrow">Крок 1 з 4</p><h1>Оберіть сервіс</h1><div className="mini-grid">{serviceOptions.map((item) => <button className={service === item.title ? 'selected' : ''} key={item.title} onClick={() => { setService(item.title); setStep(2) }}><b>{item.title}</b><span>від {item.rate} ₴ · {item.duration}</span></button>)}</div></section>}
      {step === 2 && <section><p className="eyebrow">Крок 2 з 4</p><h1>Площа та бюджет</h1><div className="estimate"><span>Орієнтовно</span><b>{estimate} ₴</b></div><input autoFocus type="number" min="1" inputMode="numeric" placeholder="м²" value={area} onChange={(event) => setArea(event.target.value)} /><button className="primary" disabled={!area} onClick={() => setStep(3)}>Далі</button></section>}
      {step === 3 && <section><p className="eyebrow">Крок 3 з 4</p><h1>Контакти та час</h1><input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDate(event.target.value)} /><input type="time" value={time} onChange={(event) => setTime(event.target.value)} /><input placeholder="Ваше імʼя" value={name} onChange={(event) => setName(event.target.value)} required /><input type="tel" placeholder="Телефон" value={phone} onChange={(event) => setPhone(event.target.value)} required /><textarea placeholder="Коментар або адреса" value={note} onChange={(event) => setNote(event.target.value)} /><button className="primary" disabled={!date || !time || !name || !phone} onClick={() => setStep(4)}>Перевірити заявку</button></section>}
      {step === 4 && <section><p className="eyebrow">{isSubmitted ? 'Готово' : 'Фінальний крок'}</p><h1>{isSubmitted ? 'Заявку надіслано' : 'Підтвердіть заявку'}</h1>{isSubmitted ? <div className="success"><b>{status}</b><span>Орієнтир: {estimate} ₴ · {date} о {time}</span></div> : <><div className="summary"><b>{service}</b><span>{area} м² · {estimate} ₴</span><span>{date} о {time}</span><span>{name} · {phone}</span>{note && <small>{note}</small>}</div><form onSubmit={submit}><button className="primary" type="submit">Надіслати заявку</button>{status && <p aria-live="polite">{status}</p>}</form></>}</section>}

      {step > 1 && !isSubmitted && <button className="back" onClick={() => setStep((step - 1) as Step)}>← Назад</button>}
    </main>
  )
}
