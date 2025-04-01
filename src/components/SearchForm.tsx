import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'astro:schema'
import { withNuqsAdapter } from '@/components/NuqsProvider'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  searchInput: z.string().min(2, {
    message: 'Input must be at least 2 characters.',
  }),
})

function _UserSearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchInput: '',
    },
  })

  type FormSchemaType = z.infer<typeof formSchema>

  function onSubmit({ searchInput }: FormSchemaType) {
    const trimmedInput = searchInput.trim()

    if (trimmedInput.includes('/')) {
      // Potentially a "user/repo" format
      const parts = trimmedInput.split('/')
      // Basic validation: ensure exactly two non-empty parts
      if (parts.length === 2 && parts[0] && parts[1]) {
        const username = parts[0]
        const repository = parts[1]
        // Redirect to the repository page
        window.location.href = `/user/repository?u=${encodeURIComponent(username)}&r=${encodeURIComponent(repository)}`
      } else {
        // Handle invalid "user/repo" format - e.g., "user/", "/repo", "user/repo/extra"
        // Option 1: Show an error message
        form.setError('searchInput', {
          type: 'manual',
          message: 'Invalid format. Use "username" or "username/repository".',
        })
        // Option 2: Fallback to user search (treating the whole string as username)
        // window.location.href = `/user?u=${encodeURIComponent(trimmedInput)}`;
        // Let's go with Option 1 for better UX
      }
    } else {
      // No slash found, treat as a username
      const username = trimmedInput
      // Redirect to the user page (existing behavior)
      window.location.href = `/user?u=${encodeURIComponent(username)}`
    }
  }

  return (
    <Form {...form}>
      {/* Original className='flex' might need adjustment depending on desired layout */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md mx-auto'>
        <FormField
          control={form.control}
          name='searchInput' // Updated name to match schema
          render={({ field }) => (
            <FormItem>
              {/* Updated label */}
              <FormLabel>Github Username, Repository or User/Repository</FormLabel>
              <div className='flex gap-2'>
                <FormControl>
                  {/* Updated placeholder */}
                  <Input placeholder='e.g., octocat or octocat/Spoon-Knife' {...field} />
                </FormControl>
                {/* Updated button text */}
                <Button type='submit'>Search</Button>
              </div>
              <FormMessage />{' '}
              {/* This will now show the custom error message if format is invalid */}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
export const UserSearchForm = withNuqsAdapter(_UserSearchForm)
