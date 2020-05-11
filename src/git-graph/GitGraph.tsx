import { Layer, Stage, Line } from 'react-konva';
import React, { useEffect, useState } from 'react';

import GitGraphNode from './GitGraphNode';
import _ from 'lodash';
import Point from './GraphHelpers' 
import { start } from 'repl';

const horizontalDistance = 65;
const verticalDistance = 45;

type Commit = {
  hash: string,
  branch: string[],
  user: string
}

type GitGraphProps = {
  commitsById: string[],
  commits: {
    [key: string]: Commit
  }
};

type pointBranches = {
  point: Point,
  branches: string[],
}


export function GitGraph(props: GitGraphProps) {
  const [nodePositions, setNodePositions] = useState<pointBranches[]>([]);

  function generateGraph() {
    let verticalCounter = 0;
    let branchesArray: string[] = [];

    const renderArray = props.commitsById.map((hash: string) => {
      verticalCounter++;
      const currentCommitBranches: string[] = props.commits[hash]["branch"];
      let differenceArray: string[] = _.difference(currentCommitBranches, branchesArray);
      if(differenceArray.length > 0) {
        branchesArray = branchesArray.concat(differenceArray);
      }

      const posX = horizontalDistance * (branchesArray.findIndex(e => e === currentCommitBranches[0]) + 1);
      const posY = verticalDistance * verticalCounter;
      if (!nodePositions.find((e) => (e.point.x === posX && e.point.y === posY))) {
        setNodePositions(nodePositions.concat({point: {x: posX, y: posY}, branches: currentCommitBranches}));
      }

      return (
        <React.Fragment>
          <GitGraphNode
          x={posX}
          y={posY}
          url={props.commits[hash]["user"]} ></GitGraphNode>
        </React.Fragment>
      )
    })
    return renderArray;
  }

  function drawLines() {
    const renderArray = nodePositions.map(startNode => {
      let endNode;
      const pointsArray: number[] = [];
      pointsArray.push(startNode.point.x);
      pointsArray.push(startNode.point.y);

      //commit right below
      endNode = [...nodePositions].reverse().find(e => e.point.x === startNode.point.x && e.point.y > startNode.point.y);
      //diagonal
      if (!endNode) {
        endNode = [...nodePositions].reverse().find(e => e.point.x < startNode.point.x && e.point.y > startNode.point.y)
      }
  
      if (endNode && _.intersection(endNode.branches, startNode.branches).length > 0) {
        pointsArray.push(startNode.point.x);
        pointsArray.push(endNode.point.y);
        pointsArray.push(endNode.point.x);
        pointsArray.push(endNode.point.y);

        return (
          <Line
            stroke={'red'}
            points={pointsArray}
          />
        )
      }
    })

    return renderArray;
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {drawLines()}
        {generateGraph()}
      </Layer>
    </Stage>
  );
}

export default GitGraph;
