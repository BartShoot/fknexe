import { useEffect, useState } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { UAParser } from 'ua-parser-js'
import { GithubApi } from '@/clients/github/api'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { PageTitle } from '@/components/layout/PageTitle'
import { Button } from '@/components/ui/button'
import { PackageService } from '@/services/PackageService'

type ApiAction =
  | 'latest-release'
  | 'releases'
  | 'readme'
  | 'search-users'
  | 'search-repos'
  | 'ranked-release'

interface GitHubApiTesterProps {
  defaultOwner?: string
  defaultRepo?: string
  defaultAction?: ApiAction
}

// Reusable form field component
interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'select'
  options?: { value: string; label: string }[]
}

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  options = [],
}: FormFieldProps) => (
  <div>
    <label className='block text-gray-700 mb-2'>{label}</label>
    {type === 'select' ?
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    : <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded'
        placeholder={placeholder}
      />
    }
  </div>
)

// Result display component
interface ResultDisplayProps {
  result: unknown
  error: string | null
}

const ResultDisplay = ({ result, error }: ResultDisplayProps) => {
  if (error) {
    return (
      <div className='bg-red-100 text-red-700 p-4 rounded mb-6'>
        <h2 className='font-bold text-lg mb-2'>Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (!result) return null

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='font-bold text-lg mb-4'>API Result</h2>
      <pre className='bg-gray-50 p-4 rounded overflow-x-auto'>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  )
}

// Configuration for API actions
const API_ACTIONS = [
  { value: 'latest-release', label: 'Get Latest Release' },
  { value: 'ranked-release', label: 'Get Ranked Release' },
  { value: 'releases', label: 'Get All Releases' },
  { value: 'readme', label: 'Get README' },
  { value: 'search-users', label: 'Search Users' },
  { value: 'search-repos', label: 'Search Repositories' },
]

// Helper to check if an action needs repository field
const needsRepo = (action: ApiAction): boolean => {
  return ['latest-release', 'releases', 'readme', 'ranked-release'].includes(action)
}

// Helper to check if an action needs search query field
const needsSearchQuery = (action: ApiAction): boolean => {
  return ['search-users', 'search-repos'].includes(action)
}

function _GitHubApiTester({
  defaultOwner = 'rustdesk',
  defaultRepo = 'rustdesk',
  defaultAction = 'ranked-release',
}: GitHubApiTesterProps) {
  // Use Nuqs for storing API parameters in the URL
  const [action, setAction] = useQueryState(
    'action',
    parseAsString.withDefault(defaultAction as string),
  )
  const [owner, setUser] = useQueryState('owner', parseAsString.withDefault(defaultOwner))
  const [repo, setRepo] = useQueryState('repo', parseAsString.withDefault(defaultRepo))

  // Local state for search query and results
  const [searchQuery, setSearchQuery] = useState('')
  const [result, setResult] = useState<Awaited<ReturnType<typeof executeApiCall>> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Make sure action is a valid ApiAction
  const currentAction =
    API_ACTIONS.some((a) => a.value === action) ? (action as ApiAction) : defaultAction

  // Clear result when changing action type to prevent type mismatches
  useEffect(() => {
    setResult(null)
    setError(null)
  }, [currentAction])

  // Validate inputs based on action
  const validateInputs = () => {
    if (needsRepo(currentAction) && (!owner || !repo)) {
      return 'Both username and repository name are required for this action'
    }

    if (needsSearchQuery(currentAction) && !searchQuery && !owner) {
      return 'A search query is required for this action'
    }

    return null
  }

  // Execute API call based on action
  const executeApiCall = async () => {
    switch (currentAction) {
      case 'latest-release':
        return await GithubApi.getLatestRelease({ owner, repo })
      case 'ranked-release':
        return await PackageService.getRankedPackages(owner, repo, UAParser(navigator.userAgent))
      case 'releases':
        return await GithubApi.getReleases({ owner, repo })
      case 'readme':
        return await GithubApi.getReadme({ owner, repo })
      case 'search-users':
        return await GithubApi.searchUsers({ q: searchQuery || owner })
      case 'search-repos':
        return await GithubApi.searchRepositories({
          q: searchQuery || repo || owner,
        })
      default:
        throw new Error(`Unknown action: ${currentAction}`)
    }
  }

  const fetchData = async () => {
    const validationError = validateInputs()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError(null)
      setResult(null) // Clear previous results to avoid type conflicts
      const data = await executeApiCall()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Get placeholder text for search query based on action
  const getSearchQueryPlaceholder = () => {
    return currentAction === 'search-users' ?
        'Enter username to search for...'
      : 'Enter repository name to search for...'
  }

  // Handle action change, ensuring type safety
  const handleActionChange = (newAction: string) => {
    if (API_ACTIONS.some((a) => a.value === newAction)) {
      setAction(newAction)
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <PageTitle>GitHub API Tester</PageTitle>

      <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          {/* API Action selector */}
          <FormField
            label='API Action'
            value={currentAction}
            onChange={handleActionChange}
            type='select'
            options={API_ACTIONS}
          />

          {/* User/Organization field - always visible */}
          <FormField
            label='User/Organization'
            value={owner ?? ''}
            onChange={setUser}
            placeholder='e.g., rustdesk'
          />

          {/* Repository field - conditional */}
          {needsRepo(currentAction) && (
            <FormField
              label='Repository'
              value={repo ?? ''}
              onChange={setRepo}
              placeholder='e.g., rustdesk'
            />
          )}

          {/* Search query field - conditional */}
          {needsSearchQuery(currentAction) && (
            <FormField
              label='Search Query'
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={getSearchQueryPlaceholder()}
            />
          )}
        </div>

        <Button onClick={fetchData} className='mt-4 w-full'>
          {loading ? 'Loading...' : 'Execute API Call'}
        </Button>
      </div>

      <ResultDisplay result={result} error={error} />
    </div>
  )
}

export const GitHubApiTester = withNuqsAdapter(_GitHubApiTester)
