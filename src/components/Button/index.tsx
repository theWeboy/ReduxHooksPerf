import React from 'react';
import './Button.css';

interface ButtonProps {
  content: string;
  onClick: any;
  children?: JSX.Element | React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { content, onClick } = props;
  return (
    <button className="btn" onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
