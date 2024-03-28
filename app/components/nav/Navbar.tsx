"use client";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import m9Logo from "@/public/assets/home-page/m9logo.png";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Blogs",
    path: "/blogs",
  },
  {
    title: "Football Scores",
    path: "/footballscores",
  },
];

interface Props {
  visibleDefault: boolean;
  fixed?: boolean;
}

const Navbar = ({ visibleDefault, fixed = true }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(visibleDefault || false);

  useEffect(() => {
    if (fixed === true) {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;

        setVisible(currentScrollPos < prevScrollPos && currentScrollPos > 10);

        setPrevScrollPos(currentScrollPos);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [fixed, prevScrollPos, visible]);

  return (
    <header>
      <nav
        className={`  
        sticky mx-auto text-black top-0 left-0 right-0 z-10 bg-transparent transition-all duration-300`}
      >
        <div className="flex md:py-4 flex-wrap items-center justify-between mx-auto px-5 lg:px-20 my-3 md:my-0">
          <a href="/">
            <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] xl:w-[80px] xl:h-[80px]">
              <Image
                width={50}
                src={m9Logo}
                alt="logo"
                className="w-full h-full"
              />
            </div>
          </a>
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center p-2 border rounded border-slate-800 hover:opacity-70 transition-all"
              >
                <FaBars />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center p-2 border rounded border-slate-800 hover:opacity-70 transition-all"
              >
                <IoCloseSharp />
              </button>
            )}
          </div>

          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 ">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink href={link.path} title={link.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
      </nav>
    </header>
  );
};

export default Navbar;
