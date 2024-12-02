import { useNavigate } from 'react-router-dom';
import { formatTimestamp } from 'helpers/formatTimestamp';
import { formatDate } from 'helpers/formatDate';
import { fieldTranslations } from 'constants/fieldTranslations';

const EntityList = ({ entities, editable, onDelete, relations = {}, entityType }) => {
  const navigate = useNavigate();

  const handleEdit = (entity) => {
    if (entityType === 'authors') {
      navigate(`/authors/${entity.id}`);
    } else if (entityType === 'books') {
      navigate(`/books/edit/${entity.id}`);
    } else if (entityType === 'order') {
      navigate(`/orders/${entity.id}`);
    }
  };

  const formatField = (key, value) => {
    if (key === 'createdAt' || key === 'updatedAt') {
      return formatTimestamp(value);
    } else if (key === 'order_date') {
      return formatDate(value);
    } else if (typeof value === 'boolean') {
      return value ? 'У наявності' : 'Немає у наявності';
    } else {
      return value;
    }
  };

  return (
    <div>
      {entities.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(entities[0]).map((key) => (
                <th key={key}>{fieldTranslations[key] || key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {entities.map((entity) => (
              <tr key={entity.id}>
                {Object.entries(entity).map(([key, value]) => (
                  <td key={key}>{relations[key] ? relations[key][value] || value : formatField(key, value)}</td>
                ))}
                <td>
                  {editable && (
                    <button className='edit' onClick={() => handleEdit(entity)}>
                      Редагувати
                    </button>
                  )}
                  <button className='delete' onClick={() => onDelete(entity.id)}>
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
  );
};

export default EntityList;
