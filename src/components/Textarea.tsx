import React from 'react';
import { TextareaField } from 'types';

const Textarea: React.FC<TextareaField> = (props) => {
  return (
    <>
      <div className='flex flex-col'>
        <label htmlFor={props.fieldName}>{props.labelName}</label>
        <textarea
          id={props.fieldName}
          className={props.class}
          placeholder={props.placeholder}
          {...props.register(props.fieldName, {
            required: {
              value: props.isRequired,
              message: '*სავალდებულო',
            },
            ...props.RegisterOptions,
          })}
        />
        <p className='text-base pl-[3%] mt-2 text-error'>
          {props.errorMessage}
        </p>
      </div>
    </>
  );
};

export default Textarea;
