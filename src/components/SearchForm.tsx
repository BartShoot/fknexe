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
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

function _UserSearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit({ username }: z.infer<typeof formSchema>) {
    window.location.href = `/user?u=${encodeURIComponent(username.trim())}`
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github user name</FormLabel>
              <div className='flex gap-2'>
                <FormControl>
                  <Input placeholder='sherlock-project' {...field} />
                </FormControl>
                <Button type='submit'>Search user</Button>
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
