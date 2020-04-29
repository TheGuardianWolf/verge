import { Layer, Stage } from 'react-konva';

import { Button } from '@storybook/react/demo';
import GitGraphNode from '../git-graph/GitGraphNode'
import React from 'react';
import { action } from '@storybook/addon-actions';

export const GraphNode = () => (
  <Stage width={window.innerWidth} height={window.innerHeight}>
    {/* <Layer> */}
      <GitGraphNode x={0} y={0} fill="yellow"></GitGraphNode>
    {/* </Layer> */}
  </Stage>
);


export default {
  title: 'GraphNode',
  component: GitGraphNode,
};