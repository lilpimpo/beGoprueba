// NavigateButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from '../../IconzZz';

interface NavigateButtonProps {
  to: string;
  className?: string;
  title: string;
}

const NavButtn: React.FC<NavigateButtonProps> = ({ to, className, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick} className={className}>
      {title}
      <Eye stroke='white'/>
    </button>
  );
};

export default NavButtn;
