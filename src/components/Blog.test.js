import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Toggalable'
import BlogDetailForm from './blogDetailForm'

//Testataan renderöityykö blogin title
test('renderöitävä sisältö', () => {
  const blog = {
    title: 'Blogilainen'
  }


  render(<Blog blog={blog} currentUser='Einari Rapu' />)

  screen.debug()

  const element = screen.getByText('Blogilainen')
  expect(element).toBeDefined()
})


describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="view">
        <div className="testDiv" >
          <BlogDetailForm key={blog.id} url={blog.url} likes={blog.likes} author={blog.author} user={blog.user} currentUser='Einari Rapu' blog={blog}/>
        </div>
      </Togglable>
    ).container
  })

  let blog = {
    title: 'Paljon rahaa',
    author: 'Rapu',
    url: 'joku/jkiva',
    likes: 99
  }


  //Nappien painelu testi
  test('klikkaus näyttää myös authorin ja liket', async () => {
    /* const blog = {
    title: 'Paljon rahaa',
    author: 'Rapu',
    url: 'joku/jkiva',
    likes: 99
  } */

    //const mockHandler = jest.fn()

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togg')
    expect(div).not.toHaveStyle('display: none')

    const element = screen.getByText('Rapu')
    expect(element).toBeDefined()

    const element2 = screen.getByText('99')
    expect(element2).toBeDefined()

    const element3 = screen.getByText('joku/jkiva')
    expect(element3).toBeDefined()

  })})

//Testi joka testaa tapahtumakäsittelijä kutsujen oikean määrän
test('Like button is clicked two times' , async () => {
  const blog = {
    title: 'Paljon rahaa',
    author: 'Rapu',
    url: 'joku/jkiva',
    likes: 99
  }

  const mockHandler = jest.fn()

  render(
    <BlogDetailForm key={blog.id} url={blog.url} likes={blog.likes} author={blog.author} user={blog.user} currentUser='Einari Rapu' blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
