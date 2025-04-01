import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'astro:schema'
// Or 'zod'
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
  searchInput: z.string().min(1, {
    // Allow single character search now
    message: 'Search input cannot be empty.',
  }),
})

type FormSchemaType = z.infer<typeof formSchema>

function _UserSearchForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchInput: '',
    },
  })

  function onSubmit({ searchInput }: FormSchemaType) {
    const trimmedInput = searchInput.trim()
    if (!trimmedInput) {
      form.setError('searchInput', { type: 'manual', message: 'Search input cannot be empty.' })
      return // Prevent submission if empty after trimming
    }

    if (trimmedInput.includes('/')) {
      const parts = trimmedInput.split('/')
      if (parts.length === 2 && parts[0] && parts[1]) {
        const username = parts[0]
        const repository = parts[1]
        window.location.href = `/user/repository?u=${encodeURIComponent(username)}&r=${encodeURIComponent(repository)}`
      } else {
        form.setError('searchInput', {
          type: 'manual',
          message: 'Invalid format. Use "username" or "username/repository".',
        })
      }
    } else {
      // No slash found, redirect to the combined search page
      const query = trimmedInput
      window.location.href = `/search?q=${encodeURIComponent(query)}` // <-- UPDATED LINE
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md mx-auto'>
        <FormField
          control={form.control}
          name='searchInput'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search Github Users or Repositories</FormLabel>
              <div className='flex gap-2'>
                <FormControl>
                  <Input placeholder='e.g., fzf, octocat/Spoon-Knife' {...field} />
                </FormControl>
                <Button type='submit'>Search</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export const UserSearchForm = withNuqsAdapter(_UserSearchForm)
