import React, { useEffect, useState } from "react";
import "./App.css";
import QuoteCard from "./components/QuoteCard";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [category, setCategory] = useState("All");
  const [currentCategory, setCurrentCategory] = useState("");

  // Fetch Quote
  const fetchQuote = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      const categories = ["Motivation", "Life", "Success"];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      setQuote(data.quote);
      setAuthor(data.author);
      setCurrentCategory(randomCategory);
    } catch (err) {
      setError("⚠️ Failed to fetch quote. Please try again.");
    }

    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    fetchQuote();

    const saved =
      JSON.parse(localStorage.getItem("likedQuotes")) || [];
    setLikedQuotes(saved);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Typing animation
  useEffect(() => {
    let i = 0;
    setDisplayText("");

    const interval = setInterval(() => {
      if (i < quote.length) {
        setDisplayText((prev) => prev + quote[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [quote]);

  // Apply dark mode to body (FIXED)
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Save liked quotes
  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  // Like toggle
  const handleLike = () => {
    const exists = likedQuotes.find((q) => q.quote === quote);

    if (exists) {
      setLikedQuotes(likedQuotes.filter((q) => q.quote !== quote));
    } else {
      setLikedQuotes([...likedQuotes, { quote, author }]);
    }
  };

  // Remove liked
  const removeLiked = (text) => {
    setLikedQuotes(likedQuotes.filter((q) => q.quote !== text));
  };

  return (
    <div className="app">
      <h1 className="title">🌞 Daily Motivation</h1>

      {/* Dark Mode Toggle */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="container">
        {/* CATEGORY FILTER BUTTONS */}
        <div className="category-buttons">
          {["All", "Motivation", "Life", "Success"].map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LOADING / ERROR / QUOTE */}
        {loading ? (
          <div className="spinner"></div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : category === "All" || category === currentCategory ? (
          <QuoteCard
            quote={displayText}
            author={author}
            onLike={handleLike}
            liked={likedQuotes.some((q) => q.quote === quote)}
          />
        ) : (
          <p className="empty">No quote in this category</p>
        )}

        {/* New Quote */}
        <button className="new-btn" onClick={fetchQuote}>
          ✨ New Quote
        </button>

        {/* Stats */}
        <p>📊 Total Likes: {likedQuotes.length}</p>
        <p>
          🧠 Unique Authors:{" "}
          {new Set(likedQuotes.map((q) => q.author)).size}
        </p>

        <h3>❤️ Liked Quotes ({likedQuotes.length})</h3>

        {/* Search */}
        <input
          type="text"
          placeholder="Search liked quotes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {/* Liked List */}
        <div className="liked-list">
          {likedQuotes.length === 0 ? (
            <p className="empty">No liked quotes yet</p>
          ) : likedQuotes
              .filter((q) =>
                q.quote.toLowerCase().includes(search.toLowerCase())
              )
              .length === 0 ? (
            <p className="empty">No matching quotes found</p>
          ) : (
            likedQuotes
              .filter((q) =>
                q.quote.toLowerCase().includes(search.toLowerCase())
              )
              .map((q) => (
                <div key={q.quote} className="liked-item">
                  <div>
                    <p>"{q.quote}"</p>
                    <span>- {q.author}</span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeLiked(q.quote)}
                  >
                    ❌
                  </button>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;