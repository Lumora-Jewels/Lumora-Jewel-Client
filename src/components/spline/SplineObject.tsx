import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import ring from "../../assets/images/ring.png";

interface SplineObjectProps {
  sceneUrl?: string;
  mobileSceneUrl?: string;
  onLoad?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

const SplineObject: React.FC<SplineObjectProps> = ({
  sceneUrl = "https://prod.spline.design/M87OFWBZi1z5Y1NB/scene.splinecode",
  mobileSceneUrl = "https://prod.spline.design/M87OFWBZi1z5Y1NB/scene.splinecode",
  onLoad,
  onError,
  className = "w-full h-[60vh] max-h-[400px] 2xl:h-[70vh] 2xl:max-h-[820px] relative"
}) => {
  const [currentScene, setCurrentScene] = useState(sceneUrl);

  useEffect(() => {
    const handleResize = () => {
      if (mobileSceneUrl && window.innerWidth < 1536) {
        setCurrentScene(mobileSceneUrl);
      } else {
        setCurrentScene(sceneUrl);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [sceneUrl, mobileSceneUrl]);

  const handleLoad = () => {
    console.log("Spline scene loaded successfully");
    onLoad?.();
  };

  const handleError = (error: any) => {
    console.error("Failed to load Spline scene:", error);
    onError?.(error);
  };

  return (
    <div className={className}>
      <img src={ring} className="w-full bg-cover h-auto hidden"/>
      <Spline 
        scene={currentScene}
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full"
      />
      <div className="absolute w-full h-20 bg-white bottom-0"></div>
    </div>
  );
};

export default SplineObject;
