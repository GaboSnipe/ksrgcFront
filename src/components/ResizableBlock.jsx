import React, { useState, useEffect } from "react";

const ResizableBlock = ({ initialWidth, thresholdWidth }) => {
  const [width, setWidth] = useState(initialWidth);
  const [isHidden, setIsHidden] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= thresholdWidth) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    console.log(isHidden);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [thresholdWidth]);

  const handleShowBlock = () => {
    setWidth(thresholdWidth)
    setIsHidden(false);
  };

  return (
    <div>
      {isHidden ? (
        <button onClick={handleShowBlock} style={{ margin: '10px' }}>Show Block</button>
      ) : (
        <div
          style={{
            width: `${width}%`,
            height: "90vh",
            backgroundColor: "lightgray",
            position: "relative"
          }}
        >
          Resizable Block
        </div>
      )}
    </div>
  );
};

export default ResizableBlock;
