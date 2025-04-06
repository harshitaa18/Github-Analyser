// src/components/RepoSelector.tsx

import React from 'react';
import { Repository } from '../types';

type Props = {
  repositories: Repository[];
  selectedRepo: string | null;
  onSelect: (repoName: string) => void;
};

const RepoSelector: React.FC<Props> = ({ repositories, selectedRepo, onSelect }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Select a repository:</label>
      <select
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        value={selectedRepo || ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose a repository --</option>
        {repositories.map((repo) => (
          <option key={repo.id} value={repo.name}>
            {repo.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RepoSelector;
