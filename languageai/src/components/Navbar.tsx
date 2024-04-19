"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import icon from "../assets/icon.png";

const links = [
  { link: "Home", href: "#" },
  { link: "Features", href: "/#features" },
  { link: "How it works?", href: "/#how-it-works" },
  { link: "Contact Us", href: "/#contact" },
];

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isToggled, setIsToggled] = useState(false);

  const handleOpenNav = () => {
    setIsToggled(!isToggled);
    const navClassList = navRef.current?.classList;

    if (navClassList?.contains("translate-x-full")) {
      navClassList.remove("translate-x-full");
      navClassList.add("right-5");
    } else {
      navClassList?.add("translate-x-full");
      navClassList?.remove("right-5");
    }
  };

  return (
    <nav className="flex justify-center items-center h-fit w-full z-50">
      <div className="md:bg-primary/10 backdrop-blur-[6px] flex justify-between items-center w-full sm:w-[calc(100%_-_32px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto py-3 md:mt-6 mb-0 md:mb-2 h-fit md:h-20 rounded-none md:rounded-full px-4 md:px-7">
        <div className="mr-4 md:bg-transparent">
          <Link
            href="#"
            aria-label="Language.ai"
            className="flex text-lg font-bold text-secondary items-center"
          >
            <Image
              src={icon}
              width={25}
              height={25}
              sizes="100vw"
              alt="Language.ai"
              className="w-6 h-6"
            />
            <span className="ml-2">Language.ai</span>
          </Link>
        </div>
        <button
          data-aos="fade-left"
          aria-label="Open Navbar"
          aria-haspopup="true"
          onClick={handleOpenNav}
          className="sticky md:hidden top-0 z-50 transition duration-200 bg-[#EE07680F] border py-2.5 px-2.5 rounded border-none"
        >
          <div>
            <div
              className={`flex w-6 h-0.5 mb-1.5 bg-primary transition-all duration-200 ${
                !isToggled ? "" : "cross line1"
              }`}
            ></div>
            <div
              className={`flex w-6 h-0.5 mb-1.5 bg-primary transition-all duration-200 ${
                !isToggled ? "" : "cross line2"
              }`}
            ></div>
            <div
              className={`flex w-6 h-0.5 bg-primary transition-all duration-200 ${
                !isToggled ? "" : "cross line3"
              }`}
            ></div>
          </div>
        </button>
        <div
          ref={navRef}
          className="flex fixed md:relative bg-white md:bg-transparent shadow-lg md:shadow-none border md:border-none rounded-xl md:rounded-full top-[70px] md:top-auto right-0 h-fit md:h-[50px] p-8 md:p-0 w-fit md:w-full max-w-[456px] translate-x-full md:translate-x-0 transition duration-200"
        >
          <ul
            data-aos="zoom-in"
            className="flex items-center md:justify-end flex-col md:flex-row mt-0 w-full gap-2 md:gap-5"
          >
            {links.map((link, idx) => (
              <li key={idx} className="mb-3 last:mb-0 md:mb-0">
                <Link
                  href={link.href}
                  className="font-semibold text-[rgba(31,6,16,0.70)]"
                >
                  {link.link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
