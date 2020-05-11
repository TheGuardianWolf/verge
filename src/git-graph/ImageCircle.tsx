import React, { useMemo, useState } from 'react';

import { Circle } from 'react-konva';
import { CircleConfig } from 'konva/types/shapes/Circle';

const CIRCLE_SIZE = 18;
const CIRCLE_RADIUS = 12;
const CIRCLE_BORDER = 20;
const BACKGROUND_FILL = 'white';

export default function ImageCircle(
  props: Omit<CircleConfig, 'radius'> & {
    x: number;
    y: number;
    image: HTMLImageElement;
    radius?: number;
  }
) {
  const [] = useState(false);
  const fillPatternScale = useMemo(
    () => ({
      x: CIRCLE_SIZE / (props.image?.width ?? 1),
      y: CIRCLE_SIZE / (props.image?.height ?? 1),
    }),
    [props.image]
  );

  const fillPatternOffset = useMemo(
    () => ({
      x: (props.image?.width ?? 0) / 2,
      y: (props.image?.height ?? 0) / 2,
    }),
    [props.image]
  );

  return (
    <React.Fragment>
      <Circle
        radius={CIRCLE_RADIUS}
        fill={BACKGROUND_FILL}
        fillPatternRepeat="no-repeat"
        {...props}
      />
      <Circle
        radius={CIRCLE_RADIUS}
        stroke="black"
        strokeWidth={CIRCLE_BORDER}
        fillPatternImage={props.image}
        fillPatternOffset={fillPatternOffset}
        fillPatternScale={fillPatternScale}
        fillPatternRepeat="no-repeat"
        {...props}
      />
    </React.Fragment>
  );
}
