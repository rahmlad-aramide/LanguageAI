import { Hero, HowItWorks, Navbar } from "@/src/components";
import { CircularCTA } from "@/src/components/CircularCTA";
import { Translation } from "@/src/components/Translation";
import { NotificationProvider } from "@/src/contexts";

export default function Home() {
  return (
    <NotificationProvider>
      <header className="sticky top-0 bg-white md:bg-transparent z-50">
        <Navbar />
      </header>
      <main className="relative">
        <Hero />
        {/* <CircularCTA /> */}
        <Translation />
        <HowItWorks />
      </main>
      <footer>
        <div className="flex flex-col items-center justify-center"></div>
      </footer>
    </NotificationProvider>
  );
}
