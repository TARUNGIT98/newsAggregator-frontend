import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const NewsFeed = () => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = { category, country };
      if (userId.trim()) params.userId = userId;

      const response = await axios.get(
        "https://newsaggregator-backend-ijc1.onrender.com/api/news",
        { params }
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
    <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
      {/* Form */}
      <form onSubmit={fetchNews}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">User ID (Optional)</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              className="p-2 rounded border border-white/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" px-4 py-2 rounded border border-white/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="general">General</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Region</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-2 rounded border border-white/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 cursor-pointer"
              //   style={{
              //     backgroundImage:
              //       "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              //     backgroundRepeat: "no-repeat",
              //     backgroundPosition: "right 0.5rem center",
              //     backgroundSize: "1rem 1rem",
              //   }}
            >
              <option value="us">United States</option>
              <option value="gb">United Kingdom</option>
              <option value="in">India</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="sg">Singapore</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors font-bold text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Fetch News
          </button>
        </div>
      </form>

      {/* Status and Articles */}
      <div className="mt-8">
        {loading && <p className="text-center text-lg">Loading news...</p>}
        {error && (
          <p className="text-center text-red-400 text-lg">
            Error fetching news: {error.message}
          </p>
        )}
        {articles.length === 0 && !loading && !error && (
          <p className="text-center text-gray-200">No articles found.</p>
        )}
        <ul className="mt-8 space-y-6">
          {articles.map((article, index) => (
            <li
              key={index}
              className="bg-gray-700 p-6 rounded-xl shadow-xl hover:scale-[1.02] transform transition duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
              <p className="mb-4 text-gray-200">
                {article.summary || article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline font-semibold"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsFeed;
