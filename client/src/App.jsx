import { Route, Link, Routes } from 'react-router-dom';
import { CreatePublisherPage } from 'pages/Create/Publisher';
import { CreateAuthorPage } from 'pages/Create/Author';
import { CreateOrderPage } from 'pages/Create/Order';
import CreateClientPage from 'pages/Create/Client';
import CreateBookPage from 'pages/Create/Book';
import { Publishers } from 'pages/Publishers';
import { Authors } from 'pages/Authors';
import { Clients } from 'pages/Clients';
import { Orders } from 'pages/Orders';
import { Books } from 'pages/Books';
import { Main } from 'pages/Main';
import logo from 'assets/icons/logo.png';
import 'styles/reset.scss';
import 'styles/main.scss';

const App = () => {
  return (
    <>
      <nav>
        <Link className='logoLink' to='/'>
          <img className='logo' src={logo} />
        </Link>
        <Link className='link' to='/books'>
          Книги
        </Link>
        <Link className='link' to='/authors'>
          Автори
        </Link>
        <Link className='link' to='/orders'>
          Замовлення
        </Link>
        <Link className='link' to='/clients'>
          Клієнти
        </Link>
        <Link className='link' to='/publishers'>
          Видавництва
        </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/edit/:id' element={<CreateBookPage />} />
        <Route path='/books/create' element={<CreateBookPage />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/authors/new' element={<CreateAuthorPage />} />
        <Route path='/authors/:id' element={<CreateAuthorPage />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/:id' element={<CreateOrderPage />} />
        <Route path='/orders/create' element={<CreateOrderPage />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/clients/create' element={<CreateClientPage />} />
        <Route path='/publishers' element={<Publishers />} />
        <Route path='/publishers/create' element={<CreatePublisherPage />} />
      </Routes>
    </>
  );
};

export default App;
