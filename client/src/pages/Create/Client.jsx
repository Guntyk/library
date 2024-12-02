import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EntityForm from 'components/EntityForm';

const CreateClientPage = () => {
  const [validationError, setValidationError] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (clientData) => {
    if (!validateEmail(clientData.email)) {
      setValidationError('Невірний формат електронної пошти.');
      return;
    }
    setValidationError(null);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/clients`, clientData);
      navigate('/clients');
    } catch (err) {
      setError('Не вдалося зберегти клієнта.');
    }
  };

  return (
    <section>
      <h1>Створити нового клієнта</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
      <EntityForm
        fields={[
          { name: 'name', label: 'Ім’я' },
          { name: 'email', label: 'Електронна пошта' },
        ]}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default CreateClientPage;
