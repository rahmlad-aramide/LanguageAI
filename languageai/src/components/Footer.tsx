import Image from "next/image";
import Link from "next/link";
import icon from "../assets/icon.png";

export const Footer = () => {
  return (
    <footer className="w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto h-full">
      <div className="relative">
        <svg
          className="flex md:hidden w-full absolute top-0 -z-10"
          //   width="320"
          //   height="350"
          viewBox="0 0 320 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M308 350H12C5.37258 350 0 344.627 0 338V108.446C0 101.819 5.37258 96.4464 12 96.4464H120.405C127.032 96.4464 132.405 91.0738 132.405 84.4464V12C132.405 5.37259 137.778 0 144.405 0H308C314.627 0 320 5.37259 320 12V338C320 344.627 314.627 350 308 350Z"
            fill="#EE0768"
          />
        </svg>
        <svg
          className="hidden md:block absolute top-0 -z-10"
          //   width="1290"
          //   height="324"
          viewBox="0 0 1290 324"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1247 0H43C19.2518 0 0 19.2518 0 43V141.5C0 165.248 19.2517 184.5 42.9999 184.5H397.143C411.414 184.5 424.756 191.581 432.755 203.401L501.577 305.099C509.575 316.919 522.917 324 537.189 324H1247C1270.75 324 1290 304.748 1290 281V43C1290 19.2518 1270.75 0 1247 0Z"
            fill="#EE0768"
          />
        </svg>
        <div className="flex flex-row-reverse md:flex-col">
          <div>
            Our platform is user-friendly and easy to navigate, and we provide a
            range of resources to help learners improve their language skills
          </div>
          <div>
            <div className="mr-4 md:bg-transparent">
              <Link
                href="#"
                aria-label="Language.ai"
                className="flex flex-col md:flex-row gap-2 text-lg font-bold text-secondary"
              >
                <Image
                  src={icon}
                  width={49}
                  height={54}
                  alt="Language.ai"
                  className="w-6 h-auto"
                />
                <span>Language.ai</span>
              </Link>
            </div>
            <p>&copy; Language.ai 2023</p>
          </div>
        </div>
        <div></div>
      </div>
    </footer>
  );
};
