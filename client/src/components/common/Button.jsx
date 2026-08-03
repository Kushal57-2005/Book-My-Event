export default function Button({ contain, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-stone-900 text-amber-300 border border-stone-800 px-5 py-2.5 rounded-xl text-center text-xs font-bold w-fit hover:bg-stone-800 transition-all duration-300 ease-out shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 ${className}`}
    >
      {contain}
    </button>
  );
}
