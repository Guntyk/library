import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <section>
      <h1>Вітаємо у нашій книгарні!</h1>
      <p className='subtitle'>Виберіть розділ для перегляду:</p>
      <div className='grid-container'>
        <Link to='/orders' className='tile big-tile'>
          <h2>Замовлення</h2>
          <div>
            <span>ЗамовленняЗамовленняЗамовлення</span>
            <span>ЗамовленняЗамовленняЗамовлення</span>
            <span>ЗамовленняЗамовленняЗамовлення</span>
            <span>ЗамовленняЗамовленняЗамовлення</span>
            <span>ЗамовленняЗамовленняЗамовлення</span>
          </div>
        </Link>
        <Link to='/books' className='tile'>
          <h2>Книги</h2>
          <div>
            <span>КнигиКнигиКниги</span>
            <span>КнигиКнигиКниги</span>
            <span>КнигиКнигиКниги</span>
            <span>КнигиКнигиКниги</span>
            <span>КнигиКнигиКниги</span>
          </div>
        </Link>
        <Link to='/authors' className='tile'>
          <h2>Автори</h2>
          <div>
            <span>Автори</span>
            <span>Автори</span>
            <span>Автори</span>
            <span>Автори</span>
            <span>Автори</span>
          </div>
        </Link>
        <Link to='/publishers' className='tile'>
          <h2>Видавництва</h2>
          <div>
            <span>Видавництва</span>
            <span>Видавництва</span>
            <span>Видавництва</span>
            <span>Видавництва</span>
            <span>Видавництва</span>
          </div>
        </Link>
        <Link to='/clients' className='tile'>
          <h2>Клієнти</h2>
          <div>
            <span>Клієнти</span>
            <span>Клієнти</span>
            <span>Клієнти</span>
            <span>Клієнти</span>
            <span>Клієнти</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
