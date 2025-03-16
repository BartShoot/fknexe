import { useEffect, useState } from 'react'
import { Github, Star } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { GithubApi, type GithubResponse } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

function _UserRepositories() {
  const [owner] = useQueryState('u', parseAsString)
  const [repositories, setRepositories] = useState<GithubResponse['searchRepositories']['items']>(
    [],
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!owner) return

      try {
        setLoading(true)
        const response = await GithubApi.searchRepositories({ q: `+user:${owner}` })
        setRepositories(response.items)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories')
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [owner])

  if (loading) {
    return <div className='flex justify-center p-12'>Loading repositories...</div>
  }

  if (error) {
    return <div className='text-center text-red-500 p-4'>{error}</div>
  }

  if (repositories.length === 0) {
    return <div className='p-4'>No repositories found for {owner}.</div>
  }

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <h2 className='text-xl font-bold mb-6'>{owner}'s Repositories</h2>
      <div className='grid gap-4'>
        {repositories.map((repo) => (
          <Card key={repo.id}>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle className='flex items-center gap-2'>
                <div className='typography'>
                  <h3 className='!m-0'>{repo.name}</h3>
                </div>
                <div className='flex items-center gap-1 text-sm'>
                  <Star size={16} className='fill-yellow-600 stroke-yellow-600' />{' '}
                  {repo.stargazers_count}
                </div>
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ButtonLink variant='ghost' size='icon' href={repo.html_url}>
                      <Github />
                    </ButtonLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            {repo.description && (
              <CardContent>
                <CardDescription>{repo.description}</CardDescription>
              </CardContent>
            )}
            <CardFooter className='py-2'>
              <a
                href={`/user/repository?u=${encodeURIComponent(owner ?? '')}&r=${encodeURIComponent(repo.name)}`}
                className='block'
              >
                <Button>View Details</Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const UserRepositories = withNuqsAdapter(_UserRepositories)
