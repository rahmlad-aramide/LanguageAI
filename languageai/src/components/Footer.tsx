import Image from "next/image";
import Link from "next/link";
import icon from "../assets/icon-white.png";
import arrow from "../assets/arrow-white.png";
import { Button } from ".";

export const Footer = () => {
  return (
    <footer className="hidden md:block h-full bg-[#050B2C] py-16">
      <div className="bg-primary w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto rounded-3xl p-11">
        <div className="flex justify-between mb-11">
          <div className="flex items-center gap-2">
            <h2 className="text-4xl text-white font-semibold">
              Get in Contact With Us
            </h2>
            <Image
              src={arrow}
              width={32}
              height={25}
              alt="Right arrow"
              className="w-8 h-6"
            />
          </div>
          <div>
            <Button variant="white" className="font-bold">
              Chat with us
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <Link
              href="#"
              aria-label="Language.ai"
              className="flex flex-col mb-6 md:flex-row items-center gap-2 text-lg font-bold text-white"
            >
              <Image
                src={icon}
                width={97}
                height={96}
                alt="Language.ai"
                className="w-6 h-6"
              />
              <span>Language.ai</span>
            </Link>
            <h2 className="text-white font-medium max-w-[60ch]">
              Our platform is user-friendly and easy to navigate, and we provide
              a range of resources to help learners improve their language
              skills
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-12 text-white">
            <div>
              <h2 className="font-bold text-xl mb-5">Links</h2>
              <ul className="space-y-4">
                <li>
                  <a href="#">How to use</a>
                </li>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-xl mb-5">Legal</h2>
              <ul className="space-y-4">
                <li>
                  <a href="#">Cookies policy</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
