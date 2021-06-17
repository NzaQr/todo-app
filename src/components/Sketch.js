import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { SketchPicker } from "react-color";

const Sketch = () => {
  const [colorPicker, setColorPicker] = useState(false);
  const [selectedColor, setColor] = useState("#000");
  const [eraserMode, setEraserMode] = useState(true);
  const [eraserOptions, setEraserOptions] = useState(false);
  const [eraserWidth, setEraserWidth] = useState(8);
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
  };

  const ref = useRef();
  const onColorChange = (updatedColor) => {
    setColor(updatedColor);
    console.log(selectedColor);
  };

  return (
    <div>
      <h1>Sketch</h1>
      <ReactSketchCanvas
        ref={ref}
        allowOnlyPointerType="all"
        style={styles}
        width="600"
        height="400"
        strokeWidth={4}
        strokeColor={selectedColor === "#000" ? "#000" : selectedColor.hex}
        eraserWidth={eraserWidth}
      />
      <input type="color" value={selectedColor.hex} disabled />
      <button
        onClick={() => {
          setColorPicker(!colorPicker);
        }}
      >
        {colorPicker ? "Close" : "Change color"}
      </button>
      {colorPicker ? (
        <SketchPicker color={selectedColor} onChange={onColorChange} />
      ) : (
        ""
      )}

      <button
        onClick={() => {
          ref.current.eraseMode(eraserMode);
          setEraserMode(!eraserMode);
          setEraserOptions(!eraserOptions);
        }}
        style={eraserOptions ? { borderStyle: "inset" } : { borderStyle: "" }}
      >
        Eraser
      </button>
      {eraserOptions && (
        <>
          <p>Size</p>
          <button
            onClick={() => {
              setEraserWidth(eraserWidth + 5);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setEraserWidth(eraserWidth - 5);
            }}
          >
            -
          </button>
        </>
      )}
      <button
        onClick={() => {
          ref.current.clearCanvas();
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          ref.current.undo();
        }}
      >
        Undo
      </button>
      <button
        onClick={() => {
          ref.current.redo();
        }}
      >
        Redo
      </button>
    </div>
  );
};

export default Sketch;
