import LeadForm from '@/components/LeadForm'

const services = [
  'Підтримуюче прибирання',
  'Генеральне прибирання',
  'Прибирання після ремонту',
  'Мийка вікон',
  'Хімчистка меблів',
  'Комерційний клінінг',
]

export default function Home() {
  return (
    <main>
      <header>
        <strong>Cleaning Kompleks</strong>
        <a href="#order">Замовити клінінг</a>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Професійний клінінг</p>
          <h1>Чистота, яку видно. Сервіс, якому довіряють.</h1>
          <p>Прибираємо квартири, будинки та комерційні приміщення. Фіксована ціна після оцінки та контроль якості.</p>
          <a className="button" href="#order">Розрахувати вартість</a>
        </div>
        <div className="card">
          <span>4.9/5</span>
          <b>100% контроль якості</b>
          <small>Дбайливі засоби · Пунктуальна команда</small>
        </div>
      </section>

      <section className="services" aria-labelledby="services-title">
        <h2 id="services-title">Послуги</h2>
        <div className="grid">
          {services.map((service) => (
            <article key={service}>
              <h3>{service}</h3>
              <p>Професійне виконання та увага до деталей.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="order" className="order" aria-labelledby="order-title">
        <h2 id="order-title">Замовити прибирання</h2>
        <p>Залиште контакти — менеджер уточнить деталі та підготує розрахунок.</p>
        <LeadForm />
      </section>

      <footer>© 2026 Cleaning Kompleks</footer>
    </main>
  )
}
