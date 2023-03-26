import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

const [newBlog, setNewBlog] = useState('')
const [newAuthor, setNewAuthor] = useState('')
const [newUrl, setNewUrl] = useState('')


test('<BlogForm /> submits new blog with needed info', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  screen.debug()
  render(<BlogForm handleSubmit={addBlog}/>)

  const inputit = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save post')
  console.log('TÄSSÄ INPUTIT ', inputit)

  await user.type(inputit[0], 'Blogilainen')
  await user.type(inputit[1], 'Venla')
  await user.type(inputit[2], 'joku/kiva')

  render(<BlogForm handleSubmit={addBlog} handleBlogChange={({ target }) => setNewBlog(target.value)}
    handleAuthorChange={({ target }) => setNewAuthor(target.value)}
    handleURLChange={({ target }) => setNewUrl(target.value)}/>)

  await user.click(sendButton)
  //console.log('TÄSSÄ INPUTIT JÄLKEEN', inputit)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls[0][0])
  expect(addBlog.mock.calls[0][0].Title).toBe('Blogilainen')
  expect(addBlog.mock.calls[0][0].Author).toBe('Venla')
  expect(addBlog.mock.calls[0][0].Url).toBe('joku/kiva')
})