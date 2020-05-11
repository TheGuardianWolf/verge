import { Layer, Stage } from 'react-konva';

import { Button } from '@storybook/react/demo';
import GitGraph from '../git-graph/GitGraph';
import React from 'react';
import { action } from '@storybook/addon-actions';
import store from './data/store.json';
import store2 from './data/store2.json';
import store3 from './data/store3.json';

export const GraphNode = () => (
  <GitGraph commitsById={store["commitsById"]} commits={store["commits"]} />
);

export const GraphNode2 = () => (
  <GitGraph commitsById={store2["commitsById"]} commits={store2["commits"]} />
);


export const GraphNode3 = () => (
  <GitGraph commitsById={store3["commitsById"]} commits={store3["commits"]} />
);


export default {
  title: 'GitGraph',
  component: GitGraph,
};
