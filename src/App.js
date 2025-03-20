import React from "react";
import NewsFeed from "./NewsFeed";

function App() {
  return (
    <div className="min-h-screen bg-ivory text-teal flex flex-col">
      {/* Header */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold">News Aggregator</h1>
      </header>

      {/* Main Content - centered container */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto p-4">
          <NewsFeed />
        </div>
      </main>
    </div>
  );
}

export default App;
