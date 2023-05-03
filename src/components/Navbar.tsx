import Link from "next/link";
import React, { useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
const Navbar: React.FC = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between bg-blue-200 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-gray-600">
        <span className="text-2xl font-bold tracking-tight">
          Portugal Paradise
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={handleToggle}
          className="flex items-center rounded border border-gray-600 px-3 py-2 text-gray-600 hover:border-white hover:text-white"
        >
          <svg
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } block w-full flex-grow lg:flex lg:w-auto lg:items-center`}
      >
        <div className="text-center text-sm lg:flex-grow">
          <Link
            href="/reviews"
            className="mt-4 block text-lg font-semibold text-gray-600 hover:text-white lg:mr-8 lg:mt-0 lg:inline-block"
          >
            Reviews
          </Link>
          <Link
            href="/amenities"
            className="mt-4 block text-lg font-semibold text-gray-600 hover:text-white lg:mr-8 lg:mt-0 lg:inline-block"
          >
            Amenities
          </Link>
          <Link
            href="/book"
            className="mt-4 block text-lg font-semibold text-gray-600 hover:text-white lg:mr-8 lg:mt-0 lg:inline-block"
          >
            Book
          </Link>
          <div className="mx-auto mt-4 text-lg font-semibold text-gray-600 hover:text-white lg:mt-0 lg:inline-block">
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>

          {/* More links here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
