import Git from 'nodegit';

export class Branch {
  private reference: Git.Reference;

  get name() {
    return this.reference.name();
  }

  constructor(baseReference: Git.Reference) {
    this.reference = baseReference;
  }
}

export class Commit {
  private _commit: Git.Commit;
  private _branch: Branch;

  get hash() {
    return this._commit.sha();
  }

  get branch() {
    return this._branch;
  }

  get author() {
    return this._commit.author();
  }
  get committer() {
    return this._commit.committer();
  }
  get message() {
    return this._commit.message();
  }

  constructor(baseCommit: Git.Commit, branch: Branch) {
    this._commit = baseCommit;
    this._branch = branch;
  }
}
