import React, {forwardRef} from "react";
import PropTypes from "prop-types";
import useCanvas from "./useCanvas";

export interface CanvasProps {
  draw: (ctx: any, frameCount: number) => void,
  width?: number,
  height?: number,
  options?: any
}


const Canvas = forwardRef((props: CanvasProps, ref) => {
  const {draw, options, ...rest} = props;
  useCanvas(draw, options, ref);

  return <canvas ref={ref} {...rest} />;
});

Canvas.defaultProps = {
  draw: () => {
  }
};

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  options: PropTypes.shape({
    context: PropTypes.oneOf([
      "2d",
      "webgl",
      "experimental-webgl",
      "webgl2",
      "bitmaprenderer"
    ])
  })
};

export default Canvas;