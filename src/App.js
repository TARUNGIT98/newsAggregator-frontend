import React, { useState, useEffect } from "react";
import NewsFeed from "./NewsFeed";

function App() {
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    const fullTitle = "News Curator!";
    let index = 0;

    const intervalId = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, index + 1));
      index++;

      if (index === fullTitle.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000428] via-[#004e92] to-[#191654] text-white flex flex-col">
      {/* Unified Header */}
      <header className="p-8 text-center">
        <h1 className="text-5xl  tracking-wide font-sansation drop-shadow-lg">
          {typedTitle}
        </h1>
        <p className="mt-2 text-lg text-gray-200 font-medium">
          Your digital news steward!
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">
        {/* Container for the NewsFeed */}
        <div className="w-full max-w-4xl p-4">
          <NewsFeed />
        </div>
      </main>
    </div>
  );
}

export default App;
