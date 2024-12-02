import { useEffect, useState } from 'react';
import EntityList from 'components/EntityList';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/publishers`);
      setPublishers(response.data.reverse());
    } catch (err) {
      console.error('Помилка при завантаженні видавництв:', err);
      setError('Не вдалося завантажити дані. Спробуйте пізніше.');
    }
  };

  const deletePublisher = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/publishers/${id}`);
      fetchPublishers();
    } catch (err) {
      console.error('Помилка при видаленні видавництва:', err);
      setError('Не вдалося видалити видавництво. Спробуйте пізніше.');
    }
  };

  return (
    <section>
      <div className='header'>
        <h1>Видавництва</h1>
        <Link to='/publishers/create'>
          <button>Додати нового клієнта</button>
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EntityList entities={publishers} onDelete={deletePublisher} />
    </section>
  );
};
