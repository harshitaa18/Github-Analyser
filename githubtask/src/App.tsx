import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import UserSearchForm from './components/UserSearchForm';
import ProfileDisplay from './components/ProfileDisplay';
import { GithubUser, Repository } from './types';
import { fetchUserProfile, fetchUserRepositories, fetchCommitActivity } from './api';
import { Card, CardContent } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [commitData, setCommitData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleSearch = async (username: string) => {
    if (!username.trim()) return;
    
    setLoading(true);
    try {
      // Fetch user profile
      const userProfile = await fetchUserProfile(username);
      setUser(userProfile);
      
      // Fetch repositories
      const repos = await fetchUserRepositories(username);
      setRepositories(repos);
      
      // Fetch commit activity for all repos (limited to 5 most recently updated for demo)
      const topRepos = repos.slice(0, 5);
      const commitActivity = await fetchCommitActivity(username, topRepos);
      setCommitData(commitActivity);
      
    } catch (error) {
      toast.error('Error', {
        description: error instanceof Error ? error.message : 'Failed to fetch GitHub data',
      });
      
      // Reset states on error
      setUser(null);
      setRepositories([]);
      setCommitData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-6">GitHub Profile Analyzer</h1>
          
          <Card>
            <CardContent className="pt-6">
              <UserSearchForm onSearch={handleSearch} isLoading={loading} />
            </CardContent>
          </Card>
          
          {user && (
            <ProfileDisplay 
              user={user} 
              repositories={repositories} 
              commitData={commitData} 
              isLoading={loading} 
            />
          )}
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;