import React, { useEffect, useState } from "react";
import "./style.css";
import image1 from "./assets/img1.png";
import image2 from "./assets/img2.png";
import image3 from "./assets/img3.png";
import image4 from "./assets/img4.png";
import image5 from "./assets/img5.png";
import image6 from "./assets/img6.png";
import image7 from "./assets/img7.png";
import image8 from "./assets/img8.png";

const FlipperBackground = () => {
  const [state, setState] = useState({
    flipped: [],

    //Add Background Images in this array
    images: [
      image1,
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image7,
      image5,
      image6,
      image7,
      image7,
    ],
    frontindices: [],
    backIndices: [],

    //Define Number of Rows in this field
    imageInaRow: 5,

    //Set flip time through this key
    flippingTime: 400,
  });

  useEffect(() => {
    if (screen.width < 750 && screen.width > 0) {
      setState({
        ...state,
        imageInaRow: 2,
      });
    } else {
      setState({
        ...state,
        imageInaRow: 5,
      });
    }
  }, [screen.width]);

  const generateRandomArray = (length) => {
    let arr = [];
    while (arr.length < length) {
      let r = Math.floor(Math.random() * length);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  useEffect(() => {
    let totalImages = state.images.length;

    setState({
      ...state,
      flipped: [...new Array(totalImages).fill(false)],
    });

    let i = -1;
    setInterval(() => {
      let frontindicesArray = generateRandomArray(totalImages);
      let backIndicesArray = shuffle(frontindicesArray);
      let frontindices = [...frontindicesArray];
      let backIndices = [...backIndicesArray];

      i = i + 1;
      if (i > state.images.length) {
        i = 0;
      }

      setState((prevState) => {
        let fI = prevState.frontindices.length
          ? prevState.frontindices
          : frontindices;

        let bI = prevState.backIndices.length
          ? prevState.backIndices
          : backIndices;

        return {
          ...prevState,
          frontindices: fI.map((m, index) => {
            if (i === index && !prevState.flipped[i]) {
              return frontindices[index];
            }
            return m;
          }),
          backIndices: bI.map((m, index) => {
            if (i === index && prevState.flipped[i]) {
              return backIndices[index];
            }
            return m;
          }),
          flipped: prevState.flipped.map((m, index) => {
            if (i === index) {
              return !m;
            }
            return m;
          }),
        };
      });
    }, state.flippingTime);
  }, []);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };
  const flipSelected = (i) => {
    setState({
      ...state,
      flipped: state.flipped.map((m, index) => {
        if (i === index) {
          return !m;
        }
        return m;
      }),
    });
  };

  return (
    <div>
      <div className="flip-card">
        {state.frontindices.length ? (
          state.images.map((m, i) => {
            return (
              <div
                key={i}
                style={{
                  width: `${100 / state.imageInaRow}%`,
                  height: `${
                    100 / Math.ceil(state.images.length / state.imageInaRow)
                  }vh`,
                }}
                className={
                  state.flipped[i]
                    ? "flip-card-inner"
                    : "flip-card-inner rotate"
                }
                onClick={() => flipSelected(i)}
              >
                <div className="flip-card-front">
                  <img
                    style={{
                      width: `100%`,
                      height: "100%",
                    }}
                    src={state.images[state.frontindices[i]]}
                    alt="Avatar"
                  ></img>
                </div>
                <div className="flip-card-back">
                  <img
                    style={{
                      width: `100%`,
                      height: "100%",
                    }}
                    src={state.images[state.backIndices[i]]}
                    alt="Avatar"
                  ></img>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default FlipperBackground;
