import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import DropFile from "./Components/DropFile";
import Pixelmatch from "pixelmatch";

function App() {
  const imgOneRef = useRef(null);
  const imgTwoRef = useRef(null);
  const canvas = useRef(null);

  const [screenshotOne, setscreenshotOne] = useState("");
  const [screenshotTwo, setscreenshotTwo] = useState("");

  useEffect(() => {
    console.log("inuseEffect", imgOneRef.current, imgTwoRef.current);
  }, [screenshotOne, screenshotTwo]);

  function writeResultToPage(imgDataOutput) {
    let ctx = canvas.current.getContext("2d");
    ctx.putImageData(imgDataOutput, 0, 0);
  }

  function printNumberPixels(pixels) {
    let div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = "<strong>Differing pixels: </strong>" + pixels;
    document.body.append(div);
  }

  const convertImageToCanvas = (imageID) => {
    let image = imageID;
    let canvas = document.createElement("canvas");
    // canvas.width = image.width;
    // canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    return canvas;
  };
  const compareImage = () => {
    let cnvBefore = convertImageToCanvas(imgOneRef.current);
    let cnvAfter = convertImageToCanvas(imgTwoRef.current);

    let ctxBefore = cnvBefore.getContext("2d");
    let ctxAfter = cnvAfter.getContext("2d");

    let imgDataBefore = ctxBefore.getImageData(
      0,
      0,
      cnvBefore.width,
      cnvBefore.height
    );
    let imgDataAfter = ctxAfter.getImageData(
      0,
      0,
      cnvAfter.width,
      cnvAfter.height
    );

    const hght = imgDataBefore.height;
    const wdth = imgDataBefore.width;

    let imgDataOutput = new ImageData(wdth, hght);

    let numDiffPixels = Pixelmatch(
      imgDataBefore.data,
      imgDataAfter.data,
      imgDataOutput.data,
      wdth,
      hght,
      { threshold: 0.1 }
    );

    printNumberPixels(numDiffPixels);
    writeResultToPage(imgDataOutput);
  };
  return (
    <>
      <div class="grid-container">
        <div class="grid-child purple">
          <DropFile
            ref={imgOneRef}
            screenshot={screenshotOne}
            setScreenshot={setscreenshotOne}
          />
        </div>
        <div class="grid-child green">
          <DropFile
            ref={imgTwoRef}
            screenshot={screenshotTwo}
            setScreenshot={setscreenshotTwo}
          />
        </div>
      </div>
      <button id="diff" class="js-compareImages" onClick={compareImage}>
        compare images
      </button>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <canvas ref={canvas} id="myCanvas"></canvas>
    </>
  );
}

export default App;
