import { useEffect, useState } from 'react';
import EntityList from 'components/EntityList';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/clients`);
      setClients(response.data.reverse());
    } catch (err) {
      setError('Не вдалося завантажити клієнтів.');
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/clients/${id}`);
      fetchClients();
    } catch (err) {
      setError('Не вдалося видалити клієнта.');
    }
  };

  return (
    <section>
      <div className='header'>
        <h1>Клієнти</h1>
        <Link to='/clients/create'>
          <button>Додати нового клієнта</button>
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EntityList entities={clients} onDelete={deleteClient} />
    </section>
  );
};
