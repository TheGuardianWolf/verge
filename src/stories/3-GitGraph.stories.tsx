import { Layer, Stage } from 'react-konva';

import { Button } from '@storybook/react/demo';
import GitGraph from '../git-graph/GitGraph';
import React from 'react';
import { action } from '@storybook/addon-actions';
import store from './data/store.json';

export const GraphNode = () => (
  <GitGraph commitsById={store["commitsById"]} commits={store["commits"]}>
  </GitGraph>
);

export default {
  title: 'GitGraph',
  component: GitGraph,
};
