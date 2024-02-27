import { forwardRef, useState } from "react"
import { urlAvatarDefault } from "../constants";

const Image = forwardRef(({ src, alt, srcSet, className, ...props },ref) => {
  
    const [fallBack, setFallBack] = useState("");
    const handleError = () => {
        setFallBack(urlAvatarDefault);
    }
  return (
    <img
        ref={ref}
        src={fallBack || src}
        alt={alt}
        className={`overflow-hidden ${className}`}
        {...props}
        srcSet={srcSet}
        onError={handleError}
    />
  )
});

Image.displayName = "Image";

export default Image
