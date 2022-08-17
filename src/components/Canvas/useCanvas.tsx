import { useEffect } from "react";

const useCanvas = (
  draw: (ctx: any, frameCount: any) => any,
  options = { context: null },
  canvasRef: any
) => {
  // const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = (canvas as HTMLCanvasElement).getContext(
        options.context || "2d"
      );
      let frameCount = 0;
      let animationFrameId: number;
      if (context) {
        const render = () => {
          frameCount++;
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
