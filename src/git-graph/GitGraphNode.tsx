import { Circle, Layer } from 'react-konva';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Konva from 'konva';

function GitGraphNode(props: any) {

  const [point, setPoint] = useState({x: props.x, y: props.y})
  const [isDragging, setIsDragging] = useState(false)
  const [isMouseEnter, setIsMouseEnter] = useState(false)

  return (
    <Layer>
      {isDragging ? renderStableNode(point.x, point.y, props.fill, isDragging) : null}
      <Circle
        x={point.x}
        y={point.y}
        draggable
        radius={12}
        fill={props.fill}
        stroke='blue'
        strokeWidth={3}
        opacity={isDragging ? 0.5 : 1}
        scale={{
          x: isMouseEnter ? 1.2 : 1, 
          y: isMouseEnter ? 1.2 : 1
        }}
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
        onMouseEnter={() => {
          setIsMouseEnter(true);
        }}
        onMouseLeave={() => {
          setIsMouseEnter(false);
        }}
      />
    </Layer>
  );
}

function renderStableNode(x: number, y: number, fill: any, isDragging: boolean) {
  return (
    <Circle
      x={x}
      y={y}
      radius={12}
      fill={fill}
      stroke='blue'
      strokeWidth={3}
      scale={{
        x: isDragging ? 1.2 : 1, 
        y: isDragging ? 1.2 : 1
      }}
  />
  )
}

export default GitGraphNode;