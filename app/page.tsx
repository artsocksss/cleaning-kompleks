'use client'

import { FormEvent, useMemo, useState } from 'react'

const services = [
  { title: 'Підтримуюче прибирання', price: 'від 1 200 ₴', rate: 45, text: 'Регулярний порядок: кухня, санвузли, підлога, пил, дзеркала та відкриті поверхні.', tag: 'Популярно', color: 'mint', includes: ['2 клінера', 'до 3 годин', 'еко-засоби'] },
  { title: 'Генеральне прибирання', price: 'від 2 900 ₴', rate: 65, text: 'Глибоке очищення техніки, плінтусів, фурнітури, важкодоступних зон та санвузлів.', tag: 'Deep clean', color: 'blue', includes: ['чек-лист 64 точки', 'парогенератор', 'контроль менеджера'] },
  { title: 'Після ремонту', price: 'від 4 500 ₴', rate: 95, text: 'Прибираємо будівельний пил, сліди фарби, плитку, скло, меблі та підлогу після майстрів.', tag: 'Команда 3+', color: 'coral', includes: ['промисловий пилосос', 'захист поверхонь', 'винос сміття'] },
  { title: 'Мийка вікон', price: 'від 120 ₴/м²', rate: 120, text: 'Скло, рами, відкоси, підвіконня, балконні блоки без розводів і крапель.', tag: 'Crystal', color: 'sky', includes: ['сквіджі', 'осмос-вода', 'антидощ опційно'] },
  { title: 'Хімчистка меблів', price: 'від 900 ₴', rate: 900, text: 'Дивани, крісла, матраци, килими: екстракція, нейтралізація запахів, делікатні засоби.', tag: 'Soft care', color: 'violet', includes: ['тест тканини', 'екстрактор', 'сушка'] },
  { title: 'Комерційний клінінг', price: 'від 55 ₴/м²', rate: 55, text: 'Офіси, шоуруми, салони, ЖК та графіки регулярного обслуговування для бізнесу.', tag: 'B2B', color: 'gold', includes: ['SLA', 'нічні зміни', 'акт виконання'] },
]

const stats = [
  ['4.9/5', 'оцінка після виїзду', 'клієнти відмічають акуратність'],
  ['15 хв', 'реакція менеджера', 'заявка миттєво йде в Telegram'],
  ['64', 'пункти контролю', 'по кімнатах, зонам і матеріалам'],
]

const process = ['Бриф і точний кошторис', 'Підбір команди під задачу', 'Клінінг за зональним чек-листом', 'Фото-контроль і фінальне приймання']
const addOns = ['Духова шафа +350 ₴', 'Холодильник +300 ₴', 'Балкон +450 ₴', 'Антиалергенна обробка +12%', 'Нічний виїзд +20%', 'Доставка ключів за домовленістю']
const rooms = [
  ['Кухня', 'фасади, техніка, жир, стільниці', '40–90 хв'],
  ['Санвузол', 'вапняний наліт, шви, скло, сантехніка', '35–70 хв'],
  ['Житлова зона', 'пил, підлога, меблі, дзеркала', '30–80 хв'],
  ['Після ремонту', 'пил у повітрі, фарба, плитка, вікна', '1–2 дні'],
]
const guarantees = ['Фото-звіт після виїзду', 'Переробка зони, якщо чек-лист не виконаний', 'Окремий інвентар для кухні та санвузлів', 'Безпечні засоби для дітей і тварин']

export default function Home() {
  const [status, setStatus] = useState('')
  const [selectedService, setSelectedService] = useState('Генеральне прибирання')
  const [area, setArea] = useState('60')
  const [urgency, setUrgency] = useState('standard')

  const selected = useMemo(() => services.find((service) => service.title === selectedService) ?? services[1], [selectedService])
  const estimate = useMemo(() => {
    const meters = Math.max(1, Number(area) || 0)
    const raw = selected.title === 'Хімчистка меблів' ? selected.rate : selected.rate * meters
    const urgentMultiplier = urgency === 'today' ? 1.2 : urgency === 'weekend' ? 1.15 : 1
    return Math.max(1200, Math.round(raw * urgentMultiplier)).toLocaleString('uk-UA')
  }, [area, selected, urgency])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Відправляємо заявку…')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        phone: form.get('phone'),
        service: form.get('service'),
        area: form.get('area'),
        date: form.get('date'),
        note: form.get('note'),
        source: 'landing-premium',
      }),
    })
    const data = await response.json()
    setStatus(data.ok ? 'Заявку прийнято. Менеджер зв’яжеться з вами протягом 15 хвилин.' : (data.error ?? 'Помилка. Спробуйте ще раз.'))
    if (data.ok) event.currentTarget.reset()
  }

  return (
    <main>
      <header>
        <a className="brand" href="/" aria-label="Cleaning Kompleks — на головну"><strong>Cleaning Kompleks</strong><span>premium cleaning studio</span></a>
        <nav aria-label="Основна навігація"><a href="#services">Послуги</a><a href="#prices">Прайс</a><a href="#process">Процес</a><a href="#order">Замовити</a></nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Клінінг з сервісом рівня готелю</p>
          <h1>Яскрава чистота для дому, офісу та простору після ремонту.</h1>
          <p>Ми не просто прибираємо — збираємо команду під задачу, рахуємо бюджет онлайн, працюємо за чек-листом і передаємо результат менеджеру на контроль.</p>
          <div className="hero-actions"><a className="button" href="#order">Забронювати слот</a><a className="button secondary" href="#prices">Подивитись прайс</a></div>
          <div className="shine-row"><span>страхування відповідальності</span><span>безпечна хімія</span><span>Telegram-автоматизація</span></div>
        </div>
        <aside className="quote-card" aria-label="Орієнтовна вартість">
          <span>Живий калькулятор</span>
          <b>≈ {estimate} ₴</b>
          <label>Сервіс<select value={selectedService} onChange={(event) => setSelectedService(event.target.value)}>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
          <label>Площа або обсяг<input type="number" min="1" value={area} onChange={(event) => setArea(event.target.value)} /></label>
          <div className="toggle-row" aria-label="Терміновість"><button className={urgency === 'standard' ? 'active' : ''} type="button" onClick={() => setUrgency('standard')}>Стандарт</button><button className={urgency === 'today' ? 'active' : ''} type="button" onClick={() => setUrgency('today')}>Сьогодні</button><button className={urgency === 'weekend' ? 'active' : ''} type="button" onClick={() => setUrgency('weekend')}>Вихідні</button></div>
          <small>{selected.text}</small>
        </aside>
      </section>

      <section className="stats" aria-label="Переваги">{stats.map(([value, label, text]) => <div key={value}><b>{value}</b><span>{label}</span><small>{text}</small></div>)}</section>

      <section id="services" className="services">
        <div className="section-head"><p className="eyebrow">Кольорові пакети</p><h2>Кожна послуга має чіткий склад, стартову ціну та сценарій виконання</h2></div>
        <div className="grid">{services.map((service) => <article className={`service-card ${service.color}`} key={service.title}><span>{service.tag}</span><h3>{service.title}</h3><p>{service.text}</p><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul><b>{service.price}</b></article>)}</div>
      </section>

      <section id="prices" className="price-board">
        <div><p className="eyebrow">Детальний прайс</p><h2>Прозора матриця вартості без “сюрпризів” після виїзду</h2></div>
        <div className="price-table">{services.map((service) => <div key={service.title}><strong>{service.title}</strong><span>{service.price}</span><small>{service.includes.join(' · ')}</small></div>)}</div>
        <div className="addons">{addOns.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="detail-lab">
        <div><p className="eyebrow">Зони робіт</p><h2>Розкладаємо клінінг на зрозумілі ділянки</h2></div>
        <div className="room-grid">{rooms.map(([title, text, time]) => <article key={title}><b>{title}</b><span>{text}</span><small>{time}</small></article>)}</div>
      </section>

      <section className="guarantees">
        <div><p className="eyebrow">Гарантії</p><h2>Чіткий результат, а не просто “прибрали”</h2></div>
        <ul>{guarantees.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section id="process" className="process">
        <div><p className="eyebrow">Як працюємо</p><h2>Автоматизація заявки + людський контроль якості</h2><p>Форма одразу передає заявку адміністратору в Telegram разом з площею, датою, коментарем і джерелом. Менеджер бачить контекст до першого дзвінка.</p></div>
        <ol>{process.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section id="order" className="order">
        <p className="eyebrow">Швидке бронювання</p><h2>Опишіть задачу — ми повернемося з точним кошторисом</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" aria-label="Ваше ім'я" placeholder="Ваше імʼя" required />
          <input name="phone" aria-label="Телефон" placeholder="Телефон" type="tel" required />
          <select name="service" aria-label="Послуга" defaultValue="" required><option value="" disabled>Оберіть послугу</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select>
          <input name="area" aria-label="Площа" placeholder="Площа, м²" type="number" min="1" />
          <input name="date" aria-label="Бажана дата" type="date" min={new Date().toISOString().slice(0, 10)} />
          <textarea name="note" aria-label="Коментар" placeholder="Коментар: адреса, тип приміщення, побажання, додаткові опції" />
          <button type="submit">Отримати точний кошторис</button>
          <p aria-live="polite">{status}</p>
        </form>
      </section>

      <footer><span>© 2026 Cleaning Kompleks</span><a href="docs/telegram-bot.md">Telegram automation</a></footer>
    </main>
  )
}
