export default function Button({ contain, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-gradient-to-r from-purple-600 to-violet-500 px-5 py-2.5 rounded-xl text-center text-white text-sm font-semibold w-fit hover:from-purple-700 hover:to-violet-600 transition-all duration-300 ease-out shadow-md shadow-purple-300/30 hover:shadow-purple-400/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 ${className}`}
    >
      {contain}
    </button>
  );
}
