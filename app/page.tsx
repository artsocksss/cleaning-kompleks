export default function Home() {
  return (
    <main>
      <header>
        <a href="/" aria-label="Cleaning Kompleks — на головну"><strong>Cleaning Kompleks</strong></a>
        <a href="#order">Замовити клінінг</a>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Професійний клінінг</p>
          <h1>Чистота, яку видно. Сервіс, якому довіряють.</h1>
          <p>Прибираємо квартири, будинки та комерційні приміщення. Вартість визначаємо після оцінки обсягу робіт.</p>
          <a className="button" href="#order">Розрахувати вартість</a>
        </div>
        <div className="card">
          <span>01</span>
          <b>Увага до деталей</b>
          <small>Дбайливі засоби · Пунктуальна команда</small>
        </div>
      </section>

      <section className="services">
        <h2>Послуги</h2>
        <div className="grid">
          {['Підтримуюче прибирання','Генеральне прибирання','Прибирання після ремонту','Мийка вікон','Хімчистка меблів','Комерційний клінінг'].map((service) => (
            <article key={service}>
              <h3>{service}</h3>
              <p>Професійне виконання та увага до деталей.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="order" className="order">
        <h2>Замовити прибирання</h2>
        <p>Залиште дані — після підключення робочого каналу зв’язку форма прийматиме заявки безпосередньо.</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <input aria-label="Ваше ім'я" placeholder="Ваше імʼя" required />
          <input aria-label="Телефон" placeholder="Телефон" type="tel" required />
          <select aria-label="Послуга" defaultValue="" required>
            <option value="" disabled>Оберіть послугу</option>
            <option>Підтримуюче прибирання</option>
            <option>Генеральне прибирання</option>
            <option>Після ремонту</option>
          </select>
          <button type="submit">Підготувати заявку</button>
        </form>
      </section>

      <footer>© 2026 Cleaning Kompleks</footer>
    </main>
  )
}
