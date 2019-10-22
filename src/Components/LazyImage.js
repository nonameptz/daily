import React, { useState, useEffect } from "react";
import "./LazyImage.css";

const LazyImage = (props) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      setError(true);
    };
    img.src = props.src;
  }, [props.src]);

  return (
      <div>
        {!loaded &&
          <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        }
        {loaded &&
          <img
            className={props.className}
            style={props.style}
            src={ error ? props.noImageSrc : props.src}
            alt={props.alt}
          />
        }
      </div>
  )
};

export default LazyImage;