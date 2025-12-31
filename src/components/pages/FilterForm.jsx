export default function FilterForm({ category, setCategory }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-fit">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            className="accent-purple-700"
            value="all"
            checked={category === "all"}
            onChange={() => setCategory("all")}
          />
          <span>All</span>
        </label>

        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            className="accent-purple-700"
            value="music"
            checked={category === "music"}
            onChange={() => setCategory("music")}
          />
          <span>Music</span>
        </label>

        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            className="accent-purple-700"
            value="education"
            checked={category === "education"}
            onChange={() => setCategory("education")}
          />
          <span>Education</span>
        </label>

        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            className="accent-purple-700"
            value="cultural"
            checked={category === "cultural"}
            onChange={() => setCategory("cultural")}
          />
          <span>Cultural</span>
        </label>

        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            className="accent-purple-700"
            value="entertainment"
            checked={category === "entertainment"}
            onChange={() => setCategory("entertainment")}
          />
          <span>Entertainment</span>
        </label>

        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            className="accent-purple-700"
            value="spiritual"
            checked={category === "spiritual"}
            onChange={() => setCategory("spiritual")}
          />
          <span>Spiritual</span>
        </label>
      </div>
    </div>
  );
}
