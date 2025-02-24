import React, { useRef } from "react";
import "./index.css";
import navLogo from "./assets/navLogo.svg";
import navMobileMenu from "./assets/navMobileMenu.svg";
import homeLogo from "./assets/homeLogo.svg";
import styles from "../bubble.module.css";
import heroImg1 from "./assets/heroImg1.svg";
import heroImgMobile from "./assets/heroImgMobile.svg";
import heroImg2 from "./assets/heroImg2.svg";
import One from "./assets/1.svg";
import Two from "./assets/2.svg";
import Three from "./assets/3.svg";
import Four from "./assets/4.svg";
import Five from "./assets/5.svg";
import Six from "./assets/6.svg";
import Seven from "./assets/7.svg";

import { useAnimate } from "framer-motion";
// import { FiMousePointer } from "react-icons/fi";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className="navbar h-full w-full bg-black sm:flex justify-center items-center overflow-hidden sm:px-6 sm:py-[0.94rem]">
        <div className="absolute top-0 bg-black h-[5rem] w-full z-[10]"></div>
        <div className="navbar-logo h-full flex items-center z-[110]">
          <a href="https://www.ted.com/tedx/events?autocomplete_filter=TEDxBVCOE" className="nav-a flex">
            <img src={navLogo} alt="" className="nav_logo w-[14rem]" />
          </a>
        </div>
      </nav>
    </>
  );
};

const Hero = () => {
  return (
    <>
      <div className="Hero flex items-center justify-center overflow-hidden z-[20]">
        <img src={homeLogo} alt="" className="absolute top-0 bg-img h-screen w-full object-cover object-center items-center justify-center" />
        <div className="top-0 z-[20] bg-black opacity-90 absolute h-screen w-full">
          <Example />
        </div>
        <div className="Center-Text absolute flex sm:top-80 top-40 w-full justify-center items-center">
          <h1 className="Center_Text-h1 sm:text-8xl text-red-600 z-[20] font-semibold text-center">
            Coming soon - March 2025
          </h1>
          {/* <div className="z-[10]">
            <BubbleText />
          </div> */}
        </div>

      </div>
    </>
  );
};

// const BubbleText = () => {
//   return (
//     <h2 className="Home_Sub_Heading text-center text-9xl font-thin text-red-600 text-bold">
//       {"COMING SOON!!".split("").map((child, idx) => (
//         <span className={styles.hoverText} key={idx}>
//           {child}
//         </span>
//       ))}
//     </h2>
//   );
// };

export default App;

const Example = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[One, Two, Three, Four, Five, Six, Seven]}
    >
      <section className="grid h-screen w-full place-content-center bg-transparent">
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
          {/* <FiMousePointer /> */}
        </p>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden opacity-60"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="Cards pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-red-600 bg-white object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};
