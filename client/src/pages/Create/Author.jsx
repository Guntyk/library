import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EntityForm from 'components/EntityForm';
import axios from 'axios';

export const CreateAuthorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAuthor(id);
    }
  }, [id]);

  const fetchAuthor = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/authors/${id}`);
      setAuthor(response.data);
    } catch (err) {
      console.error('Помилка при завантаженні автора:', err);
      setError('Не вдалося завантажити дані автора. Спробуйте пізніше.');
    }
  };

  const createAuthor = async (author) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/authors`, author);
      navigate('/authors');
    } catch (err) {
      console.error('Помилка при створенні автора:', err);
      setError('Не вдалося створити автора. Спробуйте пізніше.');
    }
  };

  const updateAuthor = async (author) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_API_URL}/authors/${id}`, author);
      navigate('/authors');
    } catch (err) {
      console.error('Помилка при оновленні автора:', err);
      setError('Не вдалося оновити автора. Спробуйте пізніше.');
    }
  };

  const handleSubmit = (authorData) => {
    if (id) {
      updateAuthor(authorData);
    } else {
      createAuthor(authorData);
    }
  };

  return (
    <section>
      <h1>{id ? 'Редагувати автора' : 'Додати нового автора'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EntityForm
        fields={[
          { name: 'first_name', label: "Ім'я" },
          { name: 'last_name', label: 'Прізвище' },
          { name: 'bio', label: 'Біографія' },
        ]}
        initialData={author}
        onSubmit={handleSubmit}
      />
    </section>
  );
};
