import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, icon, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      {icon}
      {children}
    </button>
  );
}
