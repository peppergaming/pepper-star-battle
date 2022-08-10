import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import useCanvas from "./useCanvas";

export interface CanvasProps {
  draw: (ctx: any, frameCount: number) => void;
  width?: number;
  height?: number;
  options?: any;
}

const Canvas = forwardRef<any, any>((props: CanvasProps, ref) => {
  const { draw, options, ...rest } = props;
  useCanvas(draw, options, ref);

  return <canvas ref={ref} {...rest} />;
});

export default Canvas;
