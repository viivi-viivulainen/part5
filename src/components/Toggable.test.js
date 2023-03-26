import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Toggalable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show">
        <div className="testuli" >
          jotain toggabelilla piilotettavaa
        </div>
      </Togglable>
    ).container
  })

  test('Rendering content of a toggable div', () => {
    screen.getByText('jotain toggabelilla piilotettavaa')
  })

  test('hiding toggable content at the begginin', () => {
    const div = container.querySelector('.togg')
    expect(div).toHaveStyle('display: none')
  })

  test('show content when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togg')
    expect(div).not.toHaveStyle('display: none')
  })
})