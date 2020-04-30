import { Circle, Layer } from 'react-konva';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Konva from 'konva';

function GitGraphNode(props: any) {
  const fillPatternX: number = -9;
  const fillPatternY: number = -9;
  const radius: number = 12;
  const strokeWidth: number = 20;
  const fillPatternScale: number = 18;

  const [point, setPoint] = useState({x: props.x, y: props.y});
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [fillImage, setFillImage] = useState<HTMLImageElement>();

  useEffect(() => {
    console.log('usingEffects' + props.url)
    const image = new window.Image();
    image.onload = () => {
      setFillImage(image);
    }
    image.src = props.url;
  }, [props.url])

  function StableNode(props: any) {
    return (
      <Circle
        x={props.x}
        y={props.y}
        radius={radius}
        stroke='black'
        strokeWidth={strokeWidth}
        fillPatternImage = {props.patternImage}
        fillPatternScaleY={fillPatternScale / (fillImage ? fillImage.height : 1)}
        fillPatternScaleX={fillPatternScale / (fillImage ? fillImage.width : 1)}
        fillPatternX={fillPatternX}
        fillPatternY={fillPatternY}
        fillPatternRepeat='no-repeat'
        scale={{
          x: props.isDragging ? 1.2 : 1, 
          y: props.isDragging ? 1.2 : 1
        }}
    />
    )
  }

  return (
    <Layer>
      {isDragging ? <StableNode x={point.x} y={point.y} fill={props.fill} isDragging={isDragging} patternImage={fillImage}/> : null}
      <Circle
        x={point.x}
        y={point.y}
        draggable
        radius={radius}
        stroke='black'
        strokeWidth={strokeWidth}
        opacity={isDragging ? 0.5 : 1}
        fillPatternImage = {fillImage}
        fillPatternScaleY={fillPatternScale / (fillImage ? fillImage.height : 1)}
        fillPatternScaleX={fillPatternScale / (fillImage ? fillImage.width : 1)}
        fillPatternX={fillPatternX}
        fillPatternY={fillPatternY}
        fillPatternRepeat='no-repeat'
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

export default GitGraphNode;