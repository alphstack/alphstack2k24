import {Checkbox, Button} from "@nextui-org/react";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useSwipeable } from "react-swipeable-views";
import NavBar from "../components/NavBar";
import { StarsComponent } from "../components/StarComponent";
const Home = () => {
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [isSecondSlideVisible, setIsSecondSlideVisible] = useState(false);
    const [swipeProgress, setSwipeProgress] = useState(0);
    
    const slides = [
      { id: 1, content: (<div>
        <NavBar/>
        <div class="w-screen">This is Slide 1</div>
        </div>) },
      {
        id: 2,
        content: (
          <div
            style={{
              opacity: isSecondSlideVisible ? 1 : 0,
              transition: "opacity 1s ease-in",
            }}
          >
          <div
            style={{
              color: "white"
            }}
          >
            Custom Content for Slide 2
            </div>
          </div>
        ),
      },
    ];
  
    // const handleChangeIndex = (index) => {
    //   // Calculate background color based on the current slide index
    //   const progress = index / (slides.length - 1);
    //   const newColor = `rgb(${255 * (1 - progress)}, ${255 * (1 - progress)}, ${255 * (1 - progress)})`;
    //   setBackgroundColor(newColor);
  
    //   // Check if the second slide is active
    //   if (index === 1) {
    //     setIsSecondSlideVisible(true);
    //   } else {
    //     setIsSecondSlideVisible(false);
    //   }
    // };

    const handleChangeIndex = (index) => {
        setSwipeProgress((index / 1) * 100); // In this case, there is only one swipeable view, so index goes from 0 to 1
        if (index === 1) {
          setBackgroundColor("black");
          setIsSecondSlideVisible(true);
        } else {
          setBackgroundColor("white");
          setIsSecondSlideVisible(false);
        }
      };
  
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor,
          transition: "background-color 0.5s ease",
          overflow: "hidden",
          userSelect: "none",
          touchAction: "pan-y",
        }}
      >
        <SwipeableViews
          onChangeIndex={handleChangeIndex}
          enableMouseEvents
          style={{ height: "100%" }}
          hysteresis={1}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              {slide.content}
            </div>
          ))}
        </SwipeableViews>
      </div>
    );
  
}
 
export default Home