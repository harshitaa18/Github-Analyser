import { GithubUser, Repository, CommitActivity } from './types';

const BASE_URL = 'https://api.github.com';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
};

// Fetch user profile
export async function fetchUserProfile(username: string): Promise<GithubUser> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" not found`);
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

// Fetch user repositories
export async function fetchUserRepositories(username: string): Promise<Repository[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

// Fetch commit activity for repositories
export async function fetchCommitActivity(
  username: string,
  repositories: Repository[]
): Promise<CommitActivity[]> {
  try {
    const commitData: CommitActivity[] = [];

    for (const repo of repositories) {
      try {
        const response = await fetch(
          `${BASE_URL}/repos/${username}/${repo.name}/stats/commit_activity`,
          { headers }
        );

        if (!response.ok) {
          console.warn(`Skipping repo ${repo.name}: ${response.status}`);
          continue;
        }

        const weeklyData = await response.json();

        const processedData = {
          repository: repo.name,
          data: weeklyData.flatMap((week: any, weekIndex: number) => {
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - ((52 - weekIndex) * 7));

            return week.days.map((count: number, dayIndex: number) => {
              const date = new Date(weekStart);
              date.setDate(weekStart.getDate() + dayIndex);
              return {
                date: date.toISOString().split('T')[0],
                count,
              };
            });
          }),
        };

        commitData.push(processedData);
      } catch (error) {
        console.error(`Error fetching commit data for ${repo.name}:`, error);
      }
    }

    return commitData;
  } catch (error) {
    console.error('Error in fetchCommitActivity:', error);
    throw error;
  }
}
