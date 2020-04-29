import { Circle, Layer } from 'react-konva';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Konva from 'konva';

function GitGraphNode(props: any) {

  const [point, setPoint] = useState({x: props.x, y: props.y})
  const [isDragging, setIsDragging] = useState(false)
  const [originalPoint, setOriginalPoint] = useState({x: props.x, y: props.y})

  return (
    <Layer>
      <Circle
        x={point.x}
        y={point.y}
        draggable
        radius={50}
        fill={props.fill}
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={e => {
          setPoint({
            x: e.target.x(),
            y: e.target.y()
          })
          setIsDragging(false);
        }}
      />
      {isDragging ? renderStableNode(point.x, point.y, props.fill) : null}
    </Layer>
  );
}

function renderStableNode(x: number, y: number, fill: any) {
  return (
    <Circle
      x={x}
      y={y}
      radius={50}
      fill={fill}
  />
  )
}

export default GitGraphNode;