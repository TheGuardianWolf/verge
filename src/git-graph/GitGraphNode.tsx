import React, { useEffect, useState } from 'react';
import { Circle } from 'konva/types/shapes/Circle';
import ImageCircle from './ImageCircle';
import { Layer } from 'react-konva';

const CIRCLE_SIZE = 18;
const FOCUS_SCALE_FACTOR = 1.2;
const FOCUS_OPACITY = 0.5;

type StableNodeProps = {
  x: number;
  y: number;
  url: string;
};

export function GitGraphNode(props: StableNodeProps) {
  const [point, setPoint] = useState({ x: props.x, y: props.y });
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [fillImage, setFillImage] = useState<HTMLImageElement>(
    new Image(CIRCLE_SIZE, CIRCLE_SIZE)
  );

  useEffect(() => {
    console.log('usingEffects' + props.url);
    const image = new Image();
    image.onload = () => {
      setFillImage(image);
    };
    image.src = props.url;
  }, [props.url]);

  const createDragHandler = (drag: boolean) => (e: { target: Circle }) => {
    if (!drag) {
      console.log(e);
      setPoint({
        x: e.target.x(),
        y: e.target.y(),
      });
    }
    setIsDragging(drag);
  };

  const createHoveredHandler = (hovered: boolean) => () => {
    setIsMouseEnter(hovered);
  };

  return (
    <React.Fragment>
      {isDragging && (
        <ImageCircle
          x={point.x}
          y={point.y}
          image={fillImage}
          scale={{
            x: isDragging ? FOCUS_SCALE_FACTOR : 1,
            y: isDragging ? FOCUS_SCALE_FACTOR : 1,
          }}
        />
      )}
      <ImageCircle
        x={point.x}
        y={point.y}
        image={fillImage}
        draggable
        opacity={isDragging ? FOCUS_OPACITY : 1}
        scale={{
          x: isMouseEnter ? FOCUS_SCALE_FACTOR : 1,
          y: isMouseEnter ? FOCUS_SCALE_FACTOR : 1,
        }}
        onDragStart={createDragHandler(true)}
        onDragEnd={createDragHandler(false)}
        onMouseEnter={createHoveredHandler(true)}
        onMouseLeave={createHoveredHandler(false)}
      />
    </React.Fragment>
  );
}

export default GitGraphNode;
