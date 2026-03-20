import React from "react";

function QuoteCard({ quote, author, onLike, liked }) {
  return (
    <div className="card">
      <p className="quote">“{quote}”</p>
      <h4 className="author">— {author}</h4>

      <button
        className={`like-btn ${liked ? "liked" : ""}`}
        onClick={onLike}
        disabled={!quote}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
    </div>
  );
}

export default QuoteCard;