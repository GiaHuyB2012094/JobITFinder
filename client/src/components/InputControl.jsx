import { forwardRef } from "react"

const InputControl = forwardRef(({type, placeholder, styles, label, name, error, value, onChange, force, ...props}, ref) => {
  return (
    <div className="flex flex-col mt-0 w-full mx-2">
      <p className="text-gray-600 text-sm mb-1 font-medium">
          {label}
          {force ? <span className="font-bold text-red-500 mx-1">*</span> : ""}
      </p>
      
      <input
        type={type} 
        name={name}
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
        className={`rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 ${styles}`}
        aria-invalid={error ? "true" : "false"}
        {...props}
        />
        {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  )
});

InputControl.displayName = 'InputControl';
export default InputControl