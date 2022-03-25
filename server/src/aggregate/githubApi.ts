import dotenv from 'dotenv';
import { readFile } from 'fs-extra';
import glob from 'globby';
import path from 'path';

import { Octokit } from '@octokit/rest';

const uploadToRepo = async (
  octo: Octokit,
  coursePath: string,
  org: string,
  repo: string,
  branch = `main`,
) => {
  const currentCommit = await getCurrentCommit(octo, org, repo, branch);
  const filesPaths = await glob(coursePath);
  const filesBlobs = await Promise.all(filesPaths.map(createBlobForFile(octo, org, repo)));
  const pathsForBlobs = filesPaths.map((fullPath) => path.relative(coursePath, fullPath));
  const newTree = await createNewTree(octo, org, repo, filesBlobs, pathsForBlobs, currentCommit.treeSha);
  const commitMessage = `AUTOUPDATE`;
  const newCommit = await createNewCommit(
    octo,
    org,
    repo,
    commitMessage,
    newTree.sha,
    currentCommit.commitSha,
  );
  await setBranchToCommit(octo, org, repo, branch, newCommit.sha);
};

const getCurrentCommit = async (octo: Octokit, org: string, repo: string, branch = 'main') => {
  const { data: refData } = await octo.git.getRef({
    owner: org,
    repo,
    ref: `heads/${branch}`,
  });
  const commitSha = refData.object.sha;
  const { data: commitData } = await octo.git.getCommit({
    owner: org,
    repo,
    commit_sha: commitSha,
  });
  return {
    commitSha,
    treeSha: commitData.tree.sha,
  };
};

// Notice that readFile's utf8 is typed differently from Github's utf-8
const getFileAsUTF8 = (filePath: string) => readFile(filePath, 'utf8');

const createBlobForFile = (octo: Octokit, org: string, repo: string) => async (filePath: string) => {
  const content = await getFileAsUTF8(filePath);
  const blobData = await octo.git.createBlob({
    owner: org,
    repo,
    content,
    encoding: 'utf-8',
  });
  return blobData.data;
};

const createNewTree = async (
  octo: Octokit,
  owner: string,
  repo: string,
  blobs: any[],
  paths: string[],
  parentTreeSha: string,
) => {
  // My custom config. Could be taken as parameters
  const tree = blobs.map(({ sha }, index) => ({
    path: paths[index],
    mode: `100644`,
    type: `blob`,
    sha,
  })) as any[];
  const { data } = await octo.git.createTree({
    owner,
    repo,
    tree,
    base_tree: parentTreeSha,
  });
  return data;
};

const createNewCommit = async (
  octo: Octokit,
  org: string,
  repo: string,
  message: string,
  currentTreeSha: string,
  currentCommitSha: string,
) =>
  (
    await octo.git.createCommit({
      owner: org,
      repo,
      message,
      tree: currentTreeSha,
      parents: [currentCommitSha],
    })
  ).data;

const setBranchToCommit = (octo: Octokit, org: string, repo: string, branch = `main`, commitSha: string) =>
  octo.git.updateRef({
    owner: org,
    repo,
    ref: `heads/${branch}`,
    sha: commitSha,
  });

export const updateRepo = async (branch: string) => {
  dotenv.config();
  const octo = new Octokit({
    auth: process.env.GH_PAT,
  });
  // For this, I was working on a organization repos, but it works for common repos also (replace org for owner)
  const ORGANIZATION = 'bouhm';
  const REPO = 'mondstats-data';

  await uploadToRepo(octo, `./data`, ORGANIZATION, REPO, branch);
};
