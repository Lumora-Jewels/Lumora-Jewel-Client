import CategorySection from "../sections/homepagesections/CategorySection";
import HeroSection from "../sections/homepagesections/HeroSection";

const HomePage =()=>{
    return(
        <div className="h-full w-full text-navy py-6">
            <HeroSection/>
            <CategorySection/>
        </div>
    )
}

export default HomePage;