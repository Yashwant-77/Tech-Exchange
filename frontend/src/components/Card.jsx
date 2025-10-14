const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border  bg-white  shadow-sm  ${className}`}>
    {children}
  </div>
);

export default Card;
