"use client"
import React, { useRef, useEffect } from "react";
import CanvasDrawing from "@/utils/CanvasDrawing";

const CanvasRectDraw: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  const drawingToolRef = useRef<CanvasDrawing | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // Initialize the drawing tool
    const drawingTool = new CanvasDrawing(canvas, {
      lineWidth: 2,
      strokeStyle: "#3498db",
      canvasWidth: 800,
      canvasHeight: 600,
    });

    drawingToolRef.current = drawingTool;

    return () => {
      // Clean up event listeners
      drawingTool.destroy();
    };
  }, []);

  const drawLineBetweenRects = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const parent = parentRef.current;
    const child = childRef.current;

    if (!ctx || !parent || !child) return;

    // Get bounding rectangles of both elements
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    // Calculate canvas offset
    const canvasRect = canvas?.getBoundingClientRect();
    const canvasOffsetX = canvasRect?.left;
    const canvasOffsetY = canvasRect?.top;

    // Calculate line start (bottom center of parent)
    const startX = parentRect.left + parentRect.width / 2 - (canvasOffsetX || 0);
    const startY = parentRect.bottom - (canvasOffsetY || 0);

    // Calculate line end (top center of child)
    const endX = childRect.left + childRect.width / 2 - (canvasOffsetX || 0);
    const endY = childRect.top - (canvasOffsetY || 0);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid #ccc", display: "block", margin: "0 auto" }}></canvas>
      <div
        ref={parentRef}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#3498db",
          margin: "100px auto",
        }}
      ></div>
      <div
        ref={childRef}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#e74c3c",
          margin: "50px auto",
        }}
      ></div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={drawLineBetweenRects}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Draw Line
        </button>
      </div>
    </div>
  );
};

export default CanvasRectDraw;
