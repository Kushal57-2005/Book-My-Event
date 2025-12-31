export default function Button({ contain, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-purple-600 p-2 rounded-lg text-center text-white w-fit hover:bg-purple-500 transition-all duration-300 ease-out ${className}`}
    >
      {contain}
    </button>
  );
}
