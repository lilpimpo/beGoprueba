// NavigateButton.tsx

import { useNavigate } from 'react-router-dom';
import { Eye } from '../../IconzZz';
import "./navButtStylo.css"
interface NavigateButtonProps {
  to: string;
  className?: string;
  title: string;
}

function NavButtn({ to, className, title }: NavigateButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick} className={`${className} navigate-button`}>
      <span className="button-content">
        {title}
        <Eye className="eye-icon" stroke='white' width={25} height={25}/>
      </span>
    </button>
  );
}

export default NavButtn;