import React, { useState } from 'react';
import { Repository } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ReloadIcon, GitHubLogoIcon, StarFilledIcon } from '@radix-ui/react-icons';

interface RepositoryListProps {
  repositories: Repository[];
  isLoading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  const filteredRepos = repositories
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Repositories ({repositories.length})</span>
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Recently Updated</SelectItem>
              <SelectItem value="stars">Most Stars</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <ReloadIcon className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : repositories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No repositories found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRepos.map(repo => (
              <div key={repo.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:underline flex items-center gap-2"
                    >
                      {repo.name}
                      <GitHubLogoIcon className="h-4 w-4" />
                    </a>
                    {repo.description && (
                      <p className="text-muted-foreground mt-1">{repo.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {repo.language && (
                        <Badge variant="outline">{repo.language}</Badge>
                      )}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <StarFilledIcon className="h-4 w-4 mr-1" />
                        {repo.stargazers_count}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Updated: {new Date(repo.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RepositoryList;