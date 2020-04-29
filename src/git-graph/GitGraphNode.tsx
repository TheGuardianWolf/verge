import React, { useState } from 'react';
import { Circle } from 'react-konva';
import Konva from 'konva';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Counter.module.css';

function GitGraphNode(props: any) {

  const [point, setPoint] = useState({x: props.x, y: props.y})
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Circle
      x={point.x}
      y={point.y}
      draggable
      radius={200}
      fill={props.fill}
      onDragStart={e => {
        // setPoint();//need to create a copy of it to drag
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
  );;
}

export default GitGraphNode;