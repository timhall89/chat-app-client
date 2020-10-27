import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface NameFormProps {
  onSubmitName: (name: string) => void;
}

const NameForm: React.FC<NameFormProps> = ({ onSubmitName }) => {
  const [name, setName] = useState('');
  const onSubmit: React.FormEventHandler = event => {
    event.preventDefault();
    onSubmitName(name)
  }
  return (
    <form onSubmit={onSubmit}>
      <label>Name:
      <input type="text" value={name} onChange={event => setName(event.target.value)}></input>
      </label>
      <input type="submit" value="submit" />
    </form>
  )
}

NameForm.propTypes = {
  onSubmitName: PropTypes.func.isRequired,
}

export default NameForm;
