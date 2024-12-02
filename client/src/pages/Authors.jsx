import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EntityList from 'components/EntityList';
import axios from 'axios';

export const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/authors`);
      setAuthors(response.data.reverse());
    } catch (err) {
      console.error('Помилка при завантаженні авторів:', err);
      setError('Не вдалося завантажити дані. Спробуйте пізніше.');
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/authors/${id}`);
      fetchAuthors();
    } catch (err) {
      console.error('Помилка при видаленні автора:', err);
      setError('Не вдалося видалити автора. Спробуйте пізніше.');
    }
  };

  return (
    <section>
      <div className='header'>
        <h1>Автори</h1>
        <Link to='/authors/new'>
          <button>Додати нового автора</button>
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EntityList entities={authors} onDelete={deleteAuthor} entityType='authors' editable />
    </section>
  );
};
