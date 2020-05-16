import { AppThunk, RequestStatus, RootState } from '../../app/store';
import { Branch, Commit } from './models';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import Git from 'nodegit';
import _ from 'lodash';
import fastSort from 'fast-sort';

type GitCommits = { [hash: string]: Commit };

interface GitState {
  commits: GitCommits;
  commitsStatus: RequestStatus;
}

const initialState: GitState = {
  commits: {},
  commitsStatus: RequestStatus.NONE,
};

export const gitSlice = createSlice({
  name: 'git',
  initialState,
  reducers: {
    getCommits: {
      reducer(
        state,
        action: PayloadAction<
          GitCommits | null,
          string,
          { status: RequestStatus }
        >
      ) {
        state.commitsStatus = action.meta.status;

        switch (action.meta.status) {
          case RequestStatus.SUCCESS:
            state.commits = action.payload ?? {};
            break;
        }
      },
      prepare(status: RequestStatus, payload: GitCommits | null = null) {
        return { payload, meta: { status } };
      },
    },
  },
});

export const { getCommits } = gitSlice.actions;

export const getCommitsAsync = (repoPath: string): AppThunk => async (
  dispatch
) => {
  dispatch(getCommits(RequestStatus.REQUESTED));

  try {
    const repo = await Git.Repository.open(repoPath);
    const refs = await repo.getReferences();

    const localBranchRefs = refs.filter(
      (ref) => ref.isBranch() && !ref.isRemote()
    );

    const branchCommits = await Promise.all<Git.Commit[]>(
      localBranchRefs.map((ref) => {
        const walker = Git.Revwalk.create(repo);
        walker.pushRef(ref.name());
        return walker.getCommitsUntil((c: Git.Commit) => true);
      })
    );

    const branchCommitHashSets = branchCommits.map(
      (commits) => new Set(commits.map((commit) => commit.sha()))
    );

    const localBranches = localBranchRefs.map((ref) => new Branch(ref));

    const branchHashSets = _.zip(localBranches, branchCommitHashSets) as [
      Branch,
      Set<string>
    ][];

    const allCommits = fastSort(_.flatten(branchCommits)).desc((c) =>
      c.timeMs()
    );

    // We want the below to throw undefined errors if the commit is not in a branch
    const commits = _.fromPairs(
      allCommits.map((commit) => {
        const commitHash = commit.sha();
        return [
          commitHash,
          new Commit(
            commit,
            (branchHashSets.find(([_, set]) => {
              return set.has(commitHash);
            }) as [Branch, Set<string>])[0]
          ),
        ];
      })
    );

    dispatch(getCommits(RequestStatus.SUCCESS, commits));
  } catch (e) {
    console.error(e);
    dispatch(getCommits(RequestStatus.FAIL));
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCommits = (state: RootState) => ({
  commits: state.git.commits,
  commitsStatus: state.git.commitsStatus,
});

export default gitSlice.reducer;
