import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntityForm from 'components/EntityForm';
import axios from 'axios';

export const CreatePublisherPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const createPublisher = async (publisher) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/publishers`, publisher);
      navigate('/publishers');
    } catch (err) {
      console.error('Помилка при створенні видавця:', err);
      setError('Не вдалося створити видавця. Спробуйте пізніше.');
    }
  };

  const handleSubmit = (publisherData) => {
    createPublisher(publisherData);
  };

  return (
    <section>
      <h1>Додати нового видавця</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EntityForm
        fields={[
          { name: 'name', label: "Назва" },
          { name: 'location', label: 'Розташування' },
        ]}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
