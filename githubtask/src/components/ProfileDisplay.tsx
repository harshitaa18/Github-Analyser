import React from 'react';
import { GithubUser, Repository } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import RepositoryList from './RepositoryList';
import CommitChart from './CommitChart';
import { ExternalLinkIcon, ReloadIcon } from '@radix-ui/react-icons';

interface ProfileDisplayProps {
  user: GithubUser;
  repositories: Repository[];
  commitData: any;
  isLoading: boolean;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  user,
  repositories,
  commitData,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar_url} alt={user.login} />
              <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                {user.name || user.login}
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </CardTitle>
              <CardDescription className="text-lg">@{user.login}</CardDescription>
              {user.bio && <p className="mt-2 text-muted-foreground">{user.bio}</p>}
            </div>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <div className="text-center">
              <p className="text-lg font-bold">{user.public_repos}</p>
              <p className="text-sm text-muted-foreground">Repositories</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{user.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{user.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.location && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Location:</span>
                <span className="ml-2">{user.location}</span>
              </div>
            )}
            {user.company && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Company:</span>
                <span className="ml-2">{user.company}</span>
              </div>
            )}
            {user.blog && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Website:</span>
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 hover:underline"
                >
                  {user.blog}
                </a>
              </div>
            )}
            {user.email && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Email:</span>
                <a href={`mailto:${user.email}`} className="ml-2 text-blue-500 hover:underline">
                  {user.email}
                </a>
              </div>
            )}
            <div>
              <span className="text-sm font-medium text-muted-foreground">Member since:</span>
              <span className="ml-2">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="repositories">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="commits">Commit Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="repositories" className="mt-4">
          <RepositoryList repositories={repositories} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="commits" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Commit Activity</CardTitle>
              <CardDescription>
                Commit activity for the top most recently updated repositories
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <ReloadIcon className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : commitData && commitData.length > 0 ? (
                <CommitChart commitData={commitData} />
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  No commit data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDisplay;