import React, { useEffect, useState } from 'react';

import { Circle } from 'konva/types/shapes/Circle';
import ImageCircle from './ImageCircle';
import { Layer, Stage } from 'react-konva';
import GitGraphNode from './GitGraphNode';

const horizontalDistance = 65;
const verticalDistance = 45;

// type Commit = {
//   hash: string,
//   branch: string
// }

type GitGraphProps = {
  "commitsById": string[],
  "commits": any
};


export function GitGraph(props: any) {

  function generateGraph() {
    let verticalCounter = 0;
    let branchesArray: string[] = [];

    const renderArray = props.commitsById.map((hash: string) => {
      verticalCounter++;
      console.log(props.commits[hash]["branch"]);
      const currentBranch = props.commits[hash]["branch"];
      if(!branchesArray.includes(currentBranch)) {
        branchesArray.push(currentBranch)
      }

      console.log(horizontalDistance * branchesArray.findIndex(e => e === currentBranch) + 2);

      return (
        <GitGraphNode 
        x={horizontalDistance * (branchesArray.findIndex(e => e === currentBranch) + 1)}
        y={verticalDistance * verticalCounter}
        url={props.commits[hash]["user"]} ></GitGraphNode>
      )
    })
    return renderArray;
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {generateGraph()}
      </Layer>
    </Stage>
  );
}

export default GitGraph;
