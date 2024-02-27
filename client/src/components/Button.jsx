import { forwardRef } from "react";
import { Link } from "react-router-dom";

const Button = forwardRef(({ 
    to,
    title,
    styles,
    iconRight,
    iconLeft,
    type,
    color,
    onClick,
    roundPrimary = false,
    medium = false,
    large = false,
    ...props
},ref) => {

    let style =`${color ? (color) : "bg-indigo-500"} text-white rounded-sm font-medium hover:translate-y-[2px] hover:shadow-blue-100 hover:shadow-md`;
    let size = "p-2";
    if (roundPrimary) {
        style = "rounded-md text-indigo-500 font-medium border-2 border-solid border-indigo-500 hover:translate-y-[2px] hover:shadow-blue-100 hover:shadow-md"
    }
    if (medium) {
        size = "py-3 px-5"
    } else if (large) {
        size = "py-5 px-7";
    }
    return (
          <button
            ref={ref}
            onClick={onClick}
            type={type || "button"}
            className={`flex-center  mx-2 ${styles} ${style} ${size}`}
            {...props}
          >
            <Link
              to={to}
              className="flex-center gap-x-2"
            >
                  {iconLeft && <div className='ml-2'>{iconLeft}</div>}
                  {title}
                  {iconRight && <div className='ml-2'>{iconRight}</div>}
            </Link>
          </button>
      );
});

Button.displayName = "Button";

export default Button
