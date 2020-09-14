import React from 'react';

const Inputs = (props) => {
  const{ htmlFor, id, type, name, dataTestId, func, label } = props;
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type} id={id} name={name}
        data-testid={dataTestId} onClick={func}
      />
      
    </div>
  )
}

export default Inputs;