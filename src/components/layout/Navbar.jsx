import Button from "../common/Button";

export default function Navbar() {
  return (
    <nav className="bg-neutral-200 h-20 w-full flex items-center justify-between px-6 py-4 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-999 fixed">
      <h2 className="font-semibold text-2xl text-[#6A00F5]">Book My Event</h2>

      <ul className="flex gap-10">
        <li className="hover:text-purple-400 tracking-wider hover:transition-all duration-150 ease-in">
          <a>Home</a>
        </li>
        <li className="hover:text-purple-400">
          <a>Trending</a>
        </li>
        <li className="hover:text-purple-400">
          <a>Upcoming</a>
        </li>
        <li className="hover:text-purple-400">
          <a>My Bookings</a>
        </li>
      </ul>

      <div className="flex gap-4">
        <Button contain="Login" />
        <Button contain="Sign up" />
      </div>
    </nav>
  );
}
