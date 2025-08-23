import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen font-josefin relative overflow-hidden">
      <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col gap-12 lg:gap-16 lg:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2">
            <LeftSection />
          </div>
          <div className="w-full lg:w-1/2">
            <RightSection />
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-10 w-20 h-20 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-orange/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-4 w-4 h-4 bg-gold rotate-45 animate-ping"></div>
      <div className="absolute bottom-1/4 right-8 w-6 h-6 bg-orange/30 rotate-45 animate-pulse delay-500"></div>
    </div>
  );
};

export default HeroSection;