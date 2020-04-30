import { Layer, Stage } from 'react-konva';

import { Button } from '@storybook/react/demo';
import GitGraphNode from '../git-graph/GitGraphNode'
import React from 'react';
import { action } from '@storybook/addon-actions';

export const GraphNode = () => (
  <Stage width={window.innerWidth} height={window.innerHeight}>
    {/* <Layer> */}
      <GitGraphNode x={0} y={0} url='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAADSCAMAAAAIR25wAAAABlBMVEX///+s2IwoT/dmAAABRUlEQVR4nO3PgQ0DAQgDse/+S3eFSgTU6H0DEPw8kiRJkqSf+nSF1BBSQ0gNITWE1BBSQ0gNITWE1BBSQ0gNITWE1BBSQ0gNITWE1NAd6Z+GkAZLZ0NIg6WzIaTB0tkQ0mDpbAhpsHQ2hDRYOhtCGiydDSENls6GkAZLZ0NIg6WzIaTB0tkQ0mDpbAhpsHQ2hDRYOhtCGiydDSENls6GkAZLZ0Oh/uqZTEgNITWE1BBSQ0gNITWE1BBSQ0gNITWE1BBSQ0gNITWE1BBSQ0jveSb0C9JqSMtnIiEtn4mEtHwmEtLymUhIy2ciIS2fiYS0fCYS0vKZSEjLZyIhLZ+JhLR8JhLS8plISMtnIiEtn4mEtHwmEtLymUh3v/ywlCn0LxISEhISEhISEhISEhISEhISEhISEhISEhIS0gtJkiRJkiRpqS+JcEfIQXj9pAAAAABJRU5ErkJggg=='></GitGraphNode>
    {/* </Layer> */}
  </Stage>
);


export default {
  title: 'GraphNode',
  component: GitGraphNode,
};