import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EntityList from 'components/EntityList';

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchPublishers();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/books`);
      setBooks(response.data);
    } catch (err) {
      setError('Не вдалося завантажити книги. Спробуйте пізніше.');
    }
  };

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

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/books/${id}`);
      fetchBooks();
    } catch (err) {
      setError('Не вдалося видалити книгу.');
    }
  };

  return (
    <section>
      <div className='header'>
        <h1>Книги</h1>
        <Link to='/books/create'>
          <button>Додати нову книгу</button>
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EntityList
        entities={books}
        onDelete={deleteBook}
        relations={{
          author_id: authors,
          publisher_id: publishers,
        }}
        entityType='books'
        editable
      />
    </section>
  );
};
