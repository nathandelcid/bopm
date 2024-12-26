interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';  // optional prop for different styles
}

function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`button ${variant}`}
    >
      {children}
    </button>
  );
}

export default Button;