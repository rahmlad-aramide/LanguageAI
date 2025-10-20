import { Inter, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });
export const roboto = Roboto_Mono({ weight: "400", subsets: ["latin"] });

export const monaSans = localFont({
  src: "./Mona-Sans.woff2",
  display: "swap",
});
