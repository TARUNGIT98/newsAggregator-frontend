import React, { useState } from "react";
import axios from "axios";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

const NewsFeed = () => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("technology");
  const [date, setDate] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = { category };
      if (userId.trim()) params.userId = userId;
      if (date) params.date = date;

      const response = await axios.get(
        "https://newsaggregator-backend-ijc1.onrender.com/api/news",
        {
          params,
        }
      );
      setArticles(response.data);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ivory text-teal">
      {/* Title with Icon */}
      <div className="flex items-center space-x-2 mb-6">
        <GlobeAltIcon className="h-8 w-8" />
        <h2 className="flex text-3xl font-bold justify-center">
          Personalized News Feed
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={fetchNews}
        className="md:flex md:items-end md:space-x-4 space-y-4 md:space-y-0 mb-6"
      >
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">User ID (Optional)</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            className="border border-teal rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="technology, health, etc."
            className="border border-teal rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Date (Optional)</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-teal rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-teal text-ivory font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition"
        >
          Fetch News
        </button>
      </form>

      {/* Status */}
      {loading && <p>Loading news...</p>}
      {error && (
        <p className="text-red-600">Error fetching news: {error.message}</p>
      )}
      {articles.length === 0 && !loading && !error && <p>No articles found.</p>}

      {/* Articles List */}
      <ul className="space-y-4">
        {articles.map((article, index) => (
          <li
            key={index}
            className="bg-white rounded shadow p-4 transition hover:shadow-md hover:-translate-y-0.5"
          >
            <h3 className="text-xl font-semibold mb-1">{article.title}</h3>
            <p className="mb-2">{article.summary || article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
