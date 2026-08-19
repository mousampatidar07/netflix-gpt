import React from "react";

const NoResponse = () => {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl py-4 text-white">
        Movie Suggestions
      </h1>

      <p className="text-red-400 mb-6">
        No Response From Suggestion System
      </p>

      <div className="flex overflow-x-scroll">
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-48 h-72 shrink-0 bg-gray-800 rounded-lg flex items-center justify-center"
            >
              <p className="text-gray-500 text-sm">
                No Movie
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoResponse;