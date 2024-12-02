import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EntityForm from 'components/EntityForm';

const CreateBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
    fetchPublishers();
    if (id) fetchBook(id);
  }, [id]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/authors`);
      const authorsMap = response.data.reduce((acc, author) => {
        acc[author.id] = `${author.first_name} ${author.last_name}`;
        return acc;
      }, {});
      setAuthors(authorsMap);
    } catch (err) {
      setError('Не вдалося завантажити авторів.');
    }
  };

  const fetchPublishers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/publishers`);
      const publishersMap = response.data.reduce((acc, publisher) => {
        acc[publisher.id] = publisher.name;
        return acc;
      }, {});
      setPublishers(publishersMap);
    } catch (err) {
      setError('Не вдалося завантажити видавництва.');
    }
  };

  const fetchBook = async (bookId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/books/${bookId}`);
      setBook(response.data);
    } catch (err) {
      setError('Не вдалося завантажити книгу.');
    }
  };

  const handleSubmit = async (bookData) => {
    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_BASE_API_URL}/books/${id}`, bookData);
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_API_URL}/books`, bookData);
      }
      navigate('/books');
    } catch (err) {
      setError('Не вдалося зберегти книгу.');
    }
  };

  return (
    <section>
      <h1>{id ? 'Редагувати книгу' : 'Створити нову книгу'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EntityForm
        fields={[
          { name: 'title', label: 'Назва' },
          { name: 'genre', label: 'Жанр' },
        ]}
        dropdowns={[
          {
            label: 'Автор',
            name: 'author_id',
            options: Object.entries(authors).map(([id, name]) => ({
              value: id,
              label: name,
            })),
          },
          {
            label: 'Видавництво',
            name: 'publisher_id',
            options: Object.entries(publishers).map(([id, name]) => ({
              value: id,
              label: name,
            })),
          },
        ]}
        switches={[{ name: 'availability', label: 'Наявність' }]}
        onSubmit={handleSubmit}
        initialData={book}
      />
    </section>
  );
};

export default CreateBookPage;
