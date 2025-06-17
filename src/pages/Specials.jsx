import React from "react";
import StoryHighlights from "../components/specials/StoryHighlights";

function Specials() {
  return (
    <div className="min-h-screen p-4 pt-24">
      <h1 className="text-4xl font-serif text-center mb-8 text-primary dark:text-white">Today's Specials</h1>
      <StoryHighlights />
    </div>
  );
}

export default Specials; 