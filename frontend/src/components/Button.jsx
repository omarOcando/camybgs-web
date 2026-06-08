import { Link } from "react-router-dom";

function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  target,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) {
  const classes = `button button--${variant} button--${size}${className ? ` ${className}` : ""}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  if (href) {
    return <a href={href} target={target} className={classes} rel="noopener noreferrer">{children}</a>;
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
