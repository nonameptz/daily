import React, { useState, useEffect, FunctionComponent } from "react";
import "./LazyImage.css";

interface IProps {
  src: string,
  style: object,
  className: string
  noImageSrc: string,
  alt: string
}

const LazyImage: FunctionComponent<IProps> = props => {
  const { src, style, className, noImageSrc, alt } = props;
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      setError(true);
    };
    img.src = src;
  }, [src]);

  return (
      <div>
        {!loaded &&
          <div className="bouncing-loader">
            <div />
            <div />
            <div />
          </div>
        }
        {loaded &&
          <img
            className={className}
            style={style}
            src={ error ? noImageSrc : src}
            alt={alt}
          />
        }
      </div>
  )
};

export default LazyImage;