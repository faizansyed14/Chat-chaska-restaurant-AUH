import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Featured from "@/components/Featured";
import BookMenu from "@/components/BookMenu";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import Chatbot from "@/components/Chatbot";
import DoorLoader from "@/components/DoorLoader";
import { useMenu } from "@/lib/useMenu";

export default function Home() {
  const { categories } = useMenu();

  return (
    <div className="min-h-screen bg-cream">
      <DoorLoader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Featured />
        <BookMenu categories={categories} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <Chatbot />
    </div>
  );
}
