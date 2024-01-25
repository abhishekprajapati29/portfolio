import { BallCanvas } from "./canvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { technologies } from "../constants";
import { useEffect, useState } from "react";

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: any) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {!isMobile && technologies?.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

const TechSection = SectionWrapper(Tech, "");
export default TechSection;