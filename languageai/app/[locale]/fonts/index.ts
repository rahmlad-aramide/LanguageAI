import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const monaSans = localFont({
  src: "./Mona-Sans.woff2",
  display: "swap",
});
