"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FiMenu
        className="block lg:hidden text-black h-6 w-6"
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="click"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div
          id="dropdown"
          className="absolute top-[45px] mt-[20px] right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Featured
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Recent
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Search
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Log in
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign up
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
