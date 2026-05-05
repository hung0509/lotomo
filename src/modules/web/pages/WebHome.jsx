import AboutSection from "../../../components/section/AboutSection";
import HeaderWeb from "../../../components/headers/HeaderWeb";
import SliderWeb from "../../../components/slider/SliderWeb";
import IntroductionSection from "../../../components/section/IntroductionSection";
// import ServiceSection from "../../../components/section/ServiceSection";
// import OutstandingSection from "../../../components/section/OutstandingSection";
// import ProcessSection from "../../../components/section/ProcessSection";
import CTASection from "../../../components/section/CTASection";
import ContactSection from "../../../components/section/ContactSection";
import Footer from "../../../components/footer/Footer";

export default function WebHomePage() {
  return (
    <div id="top">
      <div className="relative">
        <HeaderWeb />
        <SliderWeb />
      </div>
      <div>
        <section id="about">
          <AboutSection />
        </section>

        <section id="intro">
          <IntroductionSection />
        </section>

        <section id="cta">
          <CTASection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
