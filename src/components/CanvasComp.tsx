"use client"
import React, { useRef, useEffect } from "react"
import CanvasDrawing from "@/utils/CanvasDrawing"

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawingToolRef = useRef<CanvasDrawing | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    // Initialize the drawing tool
    const drawingTool = new CanvasDrawing(canvas, {
      lineWidth: 3,
      strokeStyle: "#3498db",
      canvasWidth: 800,
      canvasHeight: 500,
    })

    drawingToolRef.current = drawingTool

    return () => {
      // Clean up event listeners
      drawingTool.destroy()
    }
  }, [])

  const handleClearCanvas = () => {
    drawingToolRef.current?.clearCanvas()
  }

  const handleChangeColor = () => {
    if (drawingToolRef.current?.getOptions().strokeStyle === "#3498db") {
      drawingToolRef.current?.setOptions({ strokeStyle: "#e74c3c" })
    } else {
      drawingToolRef.current?.setOptions({ strokeStyle: "#3498db" })
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", display: "block", margin: "0 auto" }}
      ></canvas>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleClearCanvas}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Clear Canvas
        </button>
        <button
          onClick={handleChangeColor}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Change Color
        </button>
      </div>
    </div>
  )
}

export default CanvasComponent
