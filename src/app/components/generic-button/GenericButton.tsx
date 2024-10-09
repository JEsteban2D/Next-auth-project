import React from 'react'
import styles from './GenericButton.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const GenericButton = ({children, className, ...props}: ButtonProps) => {
  return (
    <button 
    className={`${styles.button} ${className}`}
    {...props}>
      {children || 'Button'}
    </button>
  )
}

export default GenericButton