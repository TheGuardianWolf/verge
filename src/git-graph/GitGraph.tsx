import { Layer, Line, Stage } from 'react-konva';
import React, { useEffect, useState } from 'react';
import { getCommitsAsync, selectCommits } from '../features/git/slice';
import { useDispatch, useSelector } from 'react-redux';

import GitGraphNode from './GitGraphNode';
import Point from './GraphHelpers';
import _ from 'lodash';

const HORIZONTAL_DISTANCE = 65;
const VERTICAL_DISTANCE = 45;
const LINE_CURVATURE = 7;

type Commit = {
  hash: string;
  branch: string[];
  user: string;
};

type GitGraphProps = {};

type pointCommitPair = {
  point: Point;
  commit: Commit;
};

export function GitGraph({}: GitGraphProps) {
  const dispatch = useDispatch();
  dispatch(getCommitsAsync('.'));
  const { commits, commitsStatus } = useSelector(selectCommits);

  const [nodePositions, setNodePositions] = useState<pointCommitPair[]>([]);

  function generateGraph() {
    let verticalCounter = 0;
    let branchesArray: string[] = [];

    const renderArray = props.commitsById.map((hash: string) => {
      verticalCounter++;
      const currentCommitBranches: string[] = props.commits[hash]['branch'];
      let differenceArray: string[] = _.difference(
        currentCommitBranches,
        branchesArray
      );
      if (differenceArray.length > 0) {
        branchesArray = branchesArray.concat(differenceArray);
      }

      const posX =
        HORIZONTAL_DISTANCE *
        (branchesArray.findIndex((e) => e === currentCommitBranches[0]) + 1);
      const posY = VERTICAL_DISTANCE * verticalCounter;
      if (
        !nodePositions.find((e) => e.point.x === posX && e.point.y === posY)
      ) {
        setNodePositions(
          nodePositions.concat({
            point: { x: posX, y: posY },
            commit: props.commits[hash],
          })
        );
      }

      return (
        <React.Fragment>
          <GitGraphNode
            x={posX}
            y={posY}
            url={props.commits[hash]['user']}
          ></GitGraphNode>
        </React.Fragment>
      );
    });
    return renderArray;
  }

  function drawLines() {
    console.log('WE IN');
    const renderArray = nodePositions.map((startNode) => {
      const endNode = [...nodePositions]
        .reverse()
        .find(
          (e) =>
            _.intersection(e.commit.branch, startNode.commit.branch).length >
              0 &&
            props.commitsById.indexOf(e.commit.hash) >
              props.commitsById.indexOf(startNode.commit.hash)
        );

      if (endNode) {
        //straight
        if (endNode.point.x === startNode.point.x) {
          const pointsArray: number[] = [];
          //start
          pointsArray.push(startNode.point.x);
          pointsArray.push(startNode.point.y);
          pointsArray.push(endNode.point.x);
          pointsArray.push(endNode.point.y);
          return (
            <Line
              stroke="black"
              strokeWidth={2}
              tension={0.2}
              points={pointsArray}
            />
          );
        }
        //diagonal
        else {
          const verticalPointsArray: number[] = [];
          const cornerPointsArray: number[] = [];
          const horizontalPointsArray: number[] = [];

          verticalPointsArray.push(startNode.point.x);
          verticalPointsArray.push(startNode.point.y);
          verticalPointsArray.push(startNode.point.x);
          verticalPointsArray.push(endNode.point.y - LINE_CURVATURE);

          cornerPointsArray.push(startNode.point.x);
          cornerPointsArray.push(endNode.point.y - LINE_CURVATURE);
          cornerPointsArray.push(startNode.point.x - LINE_CURVATURE / 4);
          cornerPointsArray.push(endNode.point.y - LINE_CURVATURE / 4);
          cornerPointsArray.push(startNode.point.x - LINE_CURVATURE);
          cornerPointsArray.push(endNode.point.y);

          horizontalPointsArray.push(startNode.point.x - LINE_CURVATURE);
          horizontalPointsArray.push(endNode.point.y);
          horizontalPointsArray.push(endNode.point.x);
          horizontalPointsArray.push(endNode.point.y);

          return (
            <React.Fragment>
              <Line
                stroke="black"
                strokeWidth={2}
                points={verticalPointsArray}
              />
              <Line
                stroke="black"
                strokeWidth={2}
                tension={0.2}
                points={cornerPointsArray}
              />
              <Line
                stroke="black"
                strokeWidth={2}
                points={horizontalPointsArray}
              />
            </React.Fragment>
          );
        }
      }
    });

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
