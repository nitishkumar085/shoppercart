import React from "react";
import "./NotFound.css";

export default function NotFound({
  code = "404",
  title = "Page not found",
  message = "The page you're looking for doesn't exist or has been moved.",
  homeHref = "/",
  onGoHome,
}) {
  const handleGoHome = (e) => {
    if (onGoHome) {
      e.preventDefault();
      onGoHome();
    }
  };

  return (
    <div className="not-found">
      <div className="not-found__content">
        <p className="not-found__code">{code}</p>
        <h1 className="not-found__title">{title}</h1>
        <p className="not-found__message">{message}</p>
        <div className="not-found__actions">
          <a href={homeHref} className="not-found__btn" onClick={handleGoHome}>
            Go back home
          </a>
          <button
            type="button"
            className="not-found__btn not-found__btn--ghost"
            onClick={() => window.history.back()}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}