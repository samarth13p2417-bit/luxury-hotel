import Hero from "@/components/sections/Hero";
import CloudTransitionSection from "@/components/sections/CloudTransitionSection";
import PrivateIsland from "@/components/sections/PrivateIsland";
import HotelExterior from "@/components/sections/HotelExterior";
import GrandLobby from "@/components/sections/GrandLobby";
import InfinityPool from "@/components/sections/InfinityPool";
import LuxuryRooms from "@/components/sections/LuxuryRooms";
import Restaurant from "@/components/sections/Restaurant";
import Spa from "@/components/sections/Spa";
import PrivateBeach from "@/components/sections/PrivateBeach";
import Experiences from "@/components/sections/Experiences";
import Testimonials from "@/components/sections/Testimonials";
import Membership from "@/components/sections/Membership";
import BookingExperience from "@/components/sections/BookingExperience";
import Footer from "@/components/sections/Footer";
import LuxuryCanvas from "@/components/canvas/LuxuryCanvas";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Real-time 3D Particle Canvas Background */}
      <LuxuryCanvas />

      {/* Main Resort Journey Sections */}
      <Hero />
      
      <CloudTransitionSection />
      
      <PrivateIsland />
      
      <HotelExterior />
      
      <GrandLobby />
      
      <InfinityPool />
      
      <LuxuryRooms />
      
      <Restaurant />
      
      <Spa />
      
      <PrivateBeach />
      
      <Experiences />
      
      <Testimonials />
      
      <Membership />
      
      <BookingExperience />
      
      <Footer />
    </div>
  );
}
