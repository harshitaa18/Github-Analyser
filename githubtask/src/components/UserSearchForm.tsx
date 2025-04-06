import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

interface UserSearchFormProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <Input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e:any) => setUsername(e.target.value)}
        className="flex-grow"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !username.trim()}>
        {isLoading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          'Analyze Profile'
        )}
      </Button>
    </form>
  );
};

export default UserSearchForm;