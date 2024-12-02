import { useEffect, useState } from 'react';
import EntityList from 'components/EntityList';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { fieldTranslations } from 'constants/fieldTranslations';
import { formatDate } from 'helpers/formatDate';
import { formatTimestamp } from 'helpers/formatTimestamp';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchClients();
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/orders`);
      setOrders(response.data.reverse());
    } catch (err) {
      setError('Не вдалося завантажити замовлення.');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/books`);
      const booksMap = response.data.reduce((acc, book) => {
        acc[book.id] = book.title;
        return acc;
      }, {});
      setBooks(booksMap);
    } catch (err) {
      setError('Не вдалося завантажити клієнтів.');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/clients`);
      const clientsMap = response.data.reduce((acc, client) => {
        acc[client.id] = client.name;
        return acc;
      }, {});
      setClients(clientsMap);
    } catch (err) {
      setError('Не вдалося завантажити клієнтів.');
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/orders/${id}`);
      fetchOrders();
    } catch (err) {
      setError('Не вдалося видалити замовлення.');
    }
  };

  const formatField = (key, value) => {
    if (key === 'createdAt' || key === 'updatedAt') {
      return formatTimestamp(value);
    } else if (key === 'order_date') {
      return formatDate(value);
    } else {
      return value;
    }
  };

  return (
    <section>
      <div className='header'>
        <h1>Замовлення</h1>
        <Link to='/orders/create'>
          <button>Додати нове замовлення</button>
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(orders[0]).map((key) => (
                  <th key={key}>{fieldTranslations[key] || key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  {Object.entries(order).map(([key, value]) => {
                    if (key === 'client_id') {
                      return <td key={key}>{clients?.[value]}</td>;
                    } else if (key === 'book_ids') {
                      return (
                        <td key={key}>
                          <ul className='orderedBooks'>
                            {order?.book_ids.map((id) => (
                              <li key={id}>{books[id]}</li>
                            ))}
                          </ul>
                        </td>
                      );
                    } else {
                      return <td key={key}>{formatField(key, value)}</td>;
                    }
                  })}
                  <td>
                    <button className='edit' onClick={() => navigate(`/orders/${order.id}`)}>
                      Редагувати
                    </button>
                    <button className='delete' onClick={() => deleteOrder(order.id)}>
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Немає даних для відображення</p>
        )}
      </div>
    </section>
  );
};
