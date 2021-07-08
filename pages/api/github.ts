import { Octokit } from '@octokit/rest';
import { NextApiRequest, NextApiResponse } from "next";

export const getGitHubData = async () => {
  // todo cache these as they don't change often
  const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

  const repos = await octokit.request("/users/futureproofd/repos");

  const filteredRepos = repos?.data?.map(repo => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    language: repo.language
  }));

  return filteredRepos || [];
}

/*
 API Routes let you create an API endpoint inside a Next.js app. You can do so by creating a 
 function inside the pages/api directory that has the following format:
*/
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gitJSONData = await getGitHubData();
  res.status(200).json(gitJSONData);
}
