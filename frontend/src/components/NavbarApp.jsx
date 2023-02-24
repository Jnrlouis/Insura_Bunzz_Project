import { useState } from 'react';
import { Link } from 'react-router-dom';

import { close, logo, menu } from './../assets';
import { navLinks2 } from './../constants';
import ButtonApp from './ButtonApp';
const NavbarApp = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      {/* <img src={logo} alt="hookbank" className="w-[124px] h-[32px]" /> */}
      <h1 className="text-gradient text-2xl font-bold">THEBA INSURA APP</h1>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks2.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              index === navLinks2.length - 1 ? 'mr-0' : 'mr-10'
            } text-white `}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        <div className="ml-5">
          <ButtonApp />
        </div>
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px]
        object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`${
            toggle ? 'flex' : 'hidden'
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            <ButtonApp />

            {navLinks2.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  index === navLinks2.length - 1 ? 'mr-0' : 'mb-5'
                } text-white `}
              >
                <Link to={`#${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarApp;
