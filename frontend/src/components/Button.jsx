const Button = ({ children, className = "", ...props }) => (
  <button
    className={`cursor-pointer inline-flex items-center justify-center rounded-4xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none   px-6 py-3 text-lg ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
