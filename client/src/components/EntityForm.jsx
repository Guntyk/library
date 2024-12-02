import { useEffect, useState } from 'react';
import { Toggle } from './Toggle';

const EntityForm = ({ fields, dropdowns, switches, onSubmit, validators = {}, initialData = null }) => {
  const initialFormData = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: initialData?.[field.name] || '' }),
    {}
  );

  const [formData, setFormData] = useState(initialFormData);
  const [dropdownData, setDropdownData] = useState({
    author_id: initialData?.author_id || '',
    publisher_id: initialData?.publisher_id || '',
  });
  const [switchData, setSwitchData] = useState(
    switches?.reduce((acc, sw) => ({ ...acc, [sw.name]: initialData?.[sw.name] || false }), {})
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: initialData?.[field.name] || '' }), {}));
      setDropdownData({
        author_id: initialData?.author_id || '',
        publisher_id: initialData?.publisher_id || '',
      });
      setSwitchData(switches?.reduce((acc, sw) => ({ ...acc, [sw.name]: initialData?.[sw.name] || false }), {}));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setDropdownData({ ...dropdownData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setSwitchData({ ...switchData, [name]: checked });
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = "Це поле обов'язкове";
      } else if (validators[field.name]) {
        const validationMessage = validators[field.name](formData[field.name]);
        if (validationMessage !== true) {
          newErrors[field.name] = validationMessage;
        }
      }
    });

    dropdowns?.forEach((dropdown) => {
      if (!dropdownData[dropdown.name]) {
        newErrors[dropdown.name] = "Це поле обов'язкове";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, ...dropdownData, ...switchData });
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
      setDropdownData({ author_id: '', publisher_id: '' });
      setSwitchData(switches?.reduce((acc, sw) => ({ ...acc, [sw.name]: false }), {}));
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    setDropdownData({ author_id: '', publisher_id: '' });
    setSwitchData(switches?.reduce((acc, sw) => ({ ...acc, [sw.name]: false }), {}));
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input name={field.name} value={formData[field.name]} onChange={handleChange} />
          {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
        </div>
      ))}

      {dropdowns?.map((dropdown) => (
        <div key={dropdown.name}>
          <label>{dropdown.label}</label>
          <select name={dropdown.name} value={dropdownData[dropdown.name] || ''} onChange={handleDropdownChange}>
            <option value=''></option>
            {dropdown.options.map((option) => (
              <option key={option.value} value={option.value} selected={dropdownData[dropdown.name] === option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[dropdown.name] && <p style={{ color: 'red' }}>{errors[dropdown.name]}</p>}
        </div>
      ))}

      {switches?.map((sw) => (
        <div key={sw.name}>
          <label>{sw.label}</label>
          <Toggle sw={sw} switchData={switchData} handleSwitchChange={handleSwitchChange} />
        </div>
      ))}

      <button type='submit'>{initialData ? 'Зберегти' : 'Створити'}</button>
      <button type='button' className='secondary' onClick={handleReset}>
        Скинути
      </button>
    </form>
  );
};

export default EntityForm;
