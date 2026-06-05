import { Suspense, lazy, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Featured from "@/components/Featured";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import Chatbot from "@/components/Chatbot";
import DoorLoader from "@/components/DoorLoader";
import PromoBanner from "@/components/PromoBanner";
import ScrollProgress from "@/components/ScrollProgress";
import { useMenu } from "@/lib/useMenu";

// Code-split the heavy flip-book so first paint stays light on mobile data.
const BookMenu = lazy(() => import("@/components/BookMenu"));

export default function Home() {
  const [branch, setBranch] = useState("mussafah");
  const { categories, loading } = useMenu(branch);

  return (
    <div className="min-h-screen bg-cream">
      <DoorLoader />
      <ScrollProgress />
      <PromoBanner />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Featured />
        <section id="menu" className="relative py-16 sm:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-script text-2xl text-chili sm:text-3xl">
                Turn the pages
              </span>
              <h2 className="mt-1 font-display text-3xl font-black text-masala sm:text-4xl lg:text-5xl">
                Our full menu
              </h2>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="py-16 text-center text-masala/50">
                Loading menu…
              </div>
            }
          >
            <BookMenu 
              categories={categories} 
              loading={loading} 
              branch={branch} 
              onBranchChange={setBranch} 
            />
          </Suspense>
        </section>
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <Chatbot />
    </div>
  );
}
