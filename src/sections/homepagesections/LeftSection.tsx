import SplineObject from "../../components/spline/SplineObject";
import { Gem, Crown, Clock } from "lucide-react";

const LeftSection = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-full">
        <SplineObject />

        <div className="absolute top-2 right-2 hidden">
          <Crown size={28} className="text-yellow-500" />
        </div>

        <div className="absolute bottom-2 left-2 hidden">
          <Gem size={28} className="text-blue-500" />
        </div>

        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 hidden">
          <Clock size={28} className="text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
