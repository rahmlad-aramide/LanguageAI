import { Hero, Navbar } from "@/src/components";
import { CircularCTA } from "@/src/components/CircularCTA";
import { Translation } from "@/src/components/Translation";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        {/* <CircularCTA /> */}
        <Translation />
      </main>
      <footer>
        <div className="flex flex-col items-center justify-center"></div>
      </footer>
    </>
  );
}
