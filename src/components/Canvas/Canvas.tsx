import React, {useEffect, useRef} from "react";

export interface CanvasProps {
  width?: number
  height?: number
}

const Canvas = ({width, height}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      }
    }

  }, [])


  return <canvas ref={canvasRef} height={height} width={width}/>
}


export default Canvas;