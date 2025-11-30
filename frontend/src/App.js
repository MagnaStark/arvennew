import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CalculatorSection } from "./components/CalculatorSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CalculatorSection />
        <BenefitsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
