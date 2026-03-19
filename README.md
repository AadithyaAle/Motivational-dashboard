# 🌞 Daily Motivation Dashboard

A modern React application that delivers daily motivational quotes with interactive features like liking, filtering, search, and dark mode.

---

## 🚀 Features

* 🔄 Fetch random quotes from API
* ❤️ Like / Unlike quotes
* 🗑 Remove individual liked quotes
* 🔍 Search liked quotes
* 🎯 Category filter (Motivation, Life, Success)
* 🌙 Dark / Light mode toggle (user-controlled)
* 💾 Persistent storage using localStorage
* ✨ Typing animation for quotes
* 📊 Stats (total likes, unique authors)
* ⚠️ Error handling for API failures
* ⏳ Loading spinner

---

## 🛠️ Tech Stack

* React (Hooks: useState, useEffect)
* JavaScript (ES6+)
* CSS (Glassmorphism + responsive design)
* API: https://dummyjson.com/quotes/random

---

## 📂 Project Structure

```
src/
 ├── App.js
 ├── App.css
 ├── index.js
 └── components/
       └── QuoteCard.js
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```
git clone https://github.com/your-username/motivation-dashboard.git
```

2. Navigate to project folder

```
cd motivation-dashboard
```

3. Install dependencies

```
npm install
```

4. Start the app

```
npm start
```

---

## 🧠 How It Works

* `useEffect` is used to fetch quotes from API on component mount
* `useState` manages UI state (quote, loading, likes, theme, etc.)
* Quotes can be liked and stored in localStorage
* Search and filter features dynamically update UI
* Dark mode is toggled manually and persisted using localStorage

---

## 🎨 UI & UX Highlights

* Calm gradient backgrounds for better user experience
* Glassmorphism card design
* Smooth animations and transitions
* Responsive layout
* Accessible and clean interface

---

## 📊 Evaluation Criteria Covered

✔ API Integration
✔ State Management
✔ Interactivity
✔ Conditional Rendering
✔ UI Clarity
✔ Code Readability

---

## 💡 Future Improvements

* Add user authentication
* Save quotes to cloud database
* Add categories from real API
* Add share functionality

---

## 👨‍💻 Author

Developed by **[Your Name]**

---

## 📜 License

This project is for educational purposes.
