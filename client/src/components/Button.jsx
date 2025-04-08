const Button = ({ onClick, children, color = "primary", type = "button" }) => {
    const baseStyle = "py-2 px-4 rounded font-semibold transition duration-200";
    const variants = {
      primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
      secondary: "bg-blue-500 hover:bg-blue-600 text-white",
      warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
      danger: "bg-rose-600 hover:bg-rose-700 text-white",
      neutral: "bg-gray-300 hover:bg-gray-400 text-black",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyle} ${variants[color]}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  