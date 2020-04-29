import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import GitGraphNode from '../git-graph/GitGraphNode'

export default {
  title: 'GraphNode',
  component: GitGraphNode,
};


export const GraphNode = () => (
  <GitGraphNode x={0} y={0} fill="blue"></GitGraphNode>
);
