import React from 'react'
import type { GithubResponse } from '@/clients/github/api'
import { UserCard } from '@/components/search/UserCard'
import { Card, CardHeader } from '@/components/ui/card'

type UserItem = GithubResponse['searchUsers']['items'][number]

export interface UserSearchProps {
  users: UserItem[]
  loading: boolean
  error: string | null
  query: string
}

export const UserSearch: React.FC<UserSearchProps> = ({ users, loading, error, query }) => {
  if (loading) {
    return (
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Card key={idx} className='animate-pulse'>
            <CardHeader className='flex items-center justify-between p-2'>
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 bg-gray-300 rounded-full dark:bg-zinc-700' />
                <div className='h-4 bg-gray-300 rounded w-32 dark:bg-zinc-700' />
              </div>
              <div className='h-4 w-4 bg-gray-300 rounded dark:bg-zinc-700' />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className='p-4 text-center text-destructive dark:text-red-500'>Error: {error}</div>
  }

  if (!query) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        Enter a search term to find users.
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        No users found matching "{query}".
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
