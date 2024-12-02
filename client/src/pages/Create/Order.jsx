import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const CreateOrderPage = () => {
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState({ order_date: '', status: '', client_id: '', book_ids: [] });
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchClients();
  }, [id]);

  useEffect(() => {
    if (books.length > 0) {
      if (id) {
        fetchOrder(id);
      }
    }
  }, [books]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/clients`);
      setClients(response.data);
    } catch (err) {
      setError('Не вдалося завантажити клієнтів.');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/books`);
      setBooks(response.data.map((book) => ({ value: book.id, label: book.title })));
    } catch (err) {
      setError('Не вдалося завантажити книги.');
    }
  };

  const fetchOrder = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/orders/${id}`);
      const filteredBooks = books.filter(({ value }) => response.data.book_ids.includes(value));

      const formattedResponse = {
        ...response.data,
        order_date: new Date(response.data?.order_date).toISOString().split('T')[0],
        books: books.filter(({ value }) => response.data.book_ids.includes(value)),
      };

      setSelectedBooks(filteredBooks);
      setOrder(formattedResponse);
    } catch (err) {
      setError('Не вдалося завантажити замовлення для редагування.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? 'put' : 'post';
    const url = id
      ? `${process.env.REACT_APP_BASE_API_URL}/orders/${id}`
      : `${process.env.REACT_APP_BASE_API_URL}/orders`;

    try {
      const response = await axios[method](url, order);
      navigate('/orders');
    } catch (err) {
      setError(id ? 'Не вдалося оновити замовлення.' : 'Не вдалося створити замовлення.');
    }
  };

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleBooksChange = (selectedBooks) => {
    setSelectedBooks(selectedBooks);
    setOrder({
      ...order,
      book_ids: selectedBooks.map(({ value }) => value),
    });
  };

  const handleReset = () => {
    setOrder({ order_date: '', status: '', client_id: '', book_ids: [] });
    setSelectedBooks([]);
  };

  return (
    <section>
      <h1>{id ? 'Редагувати замовлення' : 'Створити замовлення'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='order_date'>Дата замовлення</label>
          <input
            type='date'
            id='order_date'
            name='order_date'
            value={order.order_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='status'>Статус</label>
          <input type='text' id='status' name='status' value={order.status} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='client_id'>Клієнт</label>
          <select id='client_id' name='client_id' value={order.client_id} onChange={handleChange} required>
            <option value=''>Виберіть клієнта</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='books'>Вибір книг</label>
          <Select
            id='books'
            isMulti
            value={selectedBooks}
            onChange={handleBooksChange}
            placeholder='Оберіть книги...'
            options={books}
          />
        </div>
        <div>
          <button type='submit'>{id ? 'Оновити замовлення' : 'Створити замовлення'}</button>
          <button className='secondary' type='button' onClick={handleReset}>
            Скинути
          </button>
        </div>
      </form>
    </section>
  );
};
