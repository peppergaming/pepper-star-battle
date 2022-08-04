import {useRef, useEffect} from "react";

const updateCanvasSize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  const {width, height} = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const {devicePixelRatio: ratio = 1} = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    return true;
  }

  return false;
};

const useCanvas = (draw: (ctx: any, frameCount: any) => any, options = {context: null}, canvasRef) => {
  // const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = (canvas as HTMLCanvasElement).getContext(options.context || "2d");
      let frameCount = 0;
      let animationFrameId: number;
      if (context) {
        const render = () => {
          frameCount++;
          // updateCanvasSize(canvas, context);
          draw(context, frameCount);
          animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
          window.cancelAnimationFrame(animationFrameId);
        };
      }

    }
  }, [draw]);

  return canvasRef;
};

export default useCanvas;