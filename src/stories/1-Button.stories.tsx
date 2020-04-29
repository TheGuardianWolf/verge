import { Button } from '@storybook/react/demo';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const Test = () => <div style={{width: '200px', height: '200px', backgroundColor: 'black'}}></div>;
