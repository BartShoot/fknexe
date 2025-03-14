import React, { useState } from 'react'
import { Button } from './Button'
import { withNuqsAdapter } from './NuqsProvider'

function _SearchForm() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/user?u=${encodeURIComponent(searchTerm.trim())}`
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center gap-4 w-full max-w-md mx-auto p-6'
    >
      <h1 className='text-2xl font-bold mb-4'>GitHub Binary Downloader</h1>
      <p className='text-center mb-6'>
        Find and download executable files from GitHub repositories without the complexity.
      </p>
      <div className='flex w-full'>
        <input
          type='text'
          placeholder='Enter GitHub username...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          aria-label='GitHub username'
        />
        <Button type='submit' className='rounded-l-none px-6 py-2'>
          Search
        </Button>
      </div>
    </form>
  )
}

export const SearchForm = withNuqsAdapter(_SearchForm)
