import React from 'react';
import { animals } from '../mocks/handlers';

type FormFields = {
  name: string;
  type: string;
  age: string;
  about: string;
};

const defaultValues = {
  name: '',
  type: '',
  age: '',
  about: '',
};

type FormProps = {
  initialValues?: FormFields;
  onSubmit: (formValues: FormFields) => void;
};

const Form = ({ initialValues, onSubmit }: FormProps) => {
  const [fields, setFields] = React.useState<FormFields>(defaultValues);

  React.useEffect(() => {
    if (initialValues) {
      setFields(initialValues);
    }
  }, [initialValues]);

  const updateFromKey =
    (key: keyof FormFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setFields((currentState) =>
        Object.assign({}, currentState, { [key]: e.target.value })
      );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFields(defaultValues);
    onSubmit(fields);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 pt-4 w-full max-w-xs flex-grow-0"
    >
      Add a pet
      <div>
        <label className="block text-sm" htmlFor="name">
          Name
        </label>
        <input
          className="border border-black px-2 py-1 rounded-md text-sm"
          required
          type="text"
          id="name"
          value={fields.name}
          onChange={updateFromKey('name')}
        />
      </div>
      <div>
        <label className="block text-sm" htmlFor="age">
          Age
        </label>
        <input
          className="border border-black px-2 py-1 rounded-md text-sm"
          required
          type="number"
          id="age"
          value={fields.age}
          onChange={updateFromKey('age')}
        />
      </div>
      <div>
        <label className="block text-sm" htmlFor="type">
          Type
        </label>
        <select
          className="border border-black px-2 py-1 rounded-md text-sm"
          required
          id="type"
          value={fields.type}
          onChange={updateFromKey('type')}
        >
          <option />
          {animals.map((animal) => (
            <option selected={animal === fields.type} value={animal}>
              {animal}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm" htmlFor="about">
          About
        </label>
        <textarea
          className="border border-black px-2 py-1 rounded-md text-sm"
          required
          id="about"
          value={fields.about}
          onChange={updateFromKey('about')}
        />
      </div>
      <button className="w-28 rounded-md border-2 border-black" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
