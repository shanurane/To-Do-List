import React from "react";
import { TfiAgenda } from "react-icons/tfi";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-2 bg-zinc-700 text-white">
      <div className="flex">
        <div className="pt-1 text-xl font-bold cursor-pointer">
          <TfiAgenda />
        </div>

        <div className="text-xl font-bold cursor-pointer">Pro</div>
      </div>
      <ul className="flex justify-between gap-5 px-3">
        <li className="cursor-pointer hover:font-bold">Home</li>
        <li className="cursor-pointer hover:font-bold">Tasks</li>
        <li className="cursor-pointer hover:font-bold">About</li>
      </ul>
    </nav>
  );
};

export default Navbar;
