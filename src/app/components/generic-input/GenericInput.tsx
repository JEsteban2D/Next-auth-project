import React from 'react';
import styles  from './GenericInput.module.css';

interface GenericInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    customProp?: string;
}

const GenericInput = ({className, placeholder, ...props}:GenericInputProps) => {
  return (
    <input
    className={`${styles.input} ${className}`}
    placeholder={placeholder || 'Enter text...'}
    {...props}
    />
  )
}

export default GenericInput