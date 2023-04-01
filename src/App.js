import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggalable'
import BlogForm from './components/blogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  // const [loginVisible, setLoginVisible] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [info, setInfo] = useState({ message: null })


  const blogit = blogs.sort(((a, b) => b.likes - a.likes))
  //console.log(blogit)
  console.log(errorMessage)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null } )
    }, 3000)
  }

  //effect hook joka tarkistaa uudelleen ladatessa löytyykö käyttäjä
  //local storagesta ja asettaa tilan sen mukaan
  useEffect(() => {
    const LoggedBloggerJSON = window.localStorage.getItem('loggedBlogger')
    if (LoggedBloggerJSON) {
      const user = JSON.parse(LoggedBloggerJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Kirjautumisen käsittelijä
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      //Token tallennettaan local storageen jotte ei tarvitse kirjautua
      //joka kerta sivun lataamisen jälkeen
      console.log('tallentaa...')
      console.log(window.localStorage.getItem('loggedBlogger'))
      window.localStorage.setItem(
        'LoggedBlogger', JSON.stringify(user)
      )
      //console.log( window.localStorage.getItem('LoggedBlogger'))
      blogService.setToken(user.token) //blogServiceä kutsutaan kirjautumisen yhteydessä
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (
      exception) {
      setErrorMessage('Wrong username or password', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
      notifyWith('Wrong username/password')
    }
    console.log('Log in using', username, password)
  }

  //Käsitellään uloskirjautuminen
  const handleLogout = () => {
    //event.preventDefault()
    window.localStorage.removeItem(
      'LoggedBlogger', JSON.stringify(user)
    )
    //console.log(window.localStorage.getItem('loggedBlogger'))
    console.log('loggin out', username)
  }

  //blogien lisäys funktio
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
        notifyWith(`Added ${blogObject.title}` )
      })
  }

  //Lisätään tykkäys
  const updateLike = (blog) => {
  //console.log(id)
  //const blog = blogs.find(b => b.id === id)
    const id = blog.id
    const addLike = { ...blog, likes: +1 }
    console.log(blog)
    blogService.update(id, addLike).then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog: returnedBlog))
    })
      .catch(error => {
        console.log(`Blog not found ${error}`)
      })
  }

  //Poistetaan blogi
  const removeBlog = (blog) => {
    const ok = window.confirm(`remove ${blog.title}?`)
    if ( ok ) {
      blogService.remove(blog.id).then( () => {
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notifyWith(`${blog.title} deleted!`)
      })
    }
  }


  //Jos käyttäjä ei ole kirjautunut niin näytetään vain login
  if (user === null) {
    return (
      <div>
        <Notification info={info} />
        <Togglable buttonLabel="Log in">
          <LoginForm
            username={username}
            password={password}
            handleUserChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification info={info} />
      <form onSubmit={handleLogout}>
        <p>{user.name} logged in
          <button type='submit'>Log out</button></p>
      </form>
      <Togglable buttonLabel="New blog">
        <BlogForm
          blog={newBlog}
          author={newAuthor}
          url={newUrl}
          handleSubmit={addBlog}
          handleBlogChange={({ target }) => setNewBlog(target.value)}
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          handleURLChange={({ target }) => setNewUrl(target.value)}
        />
      </Togglable>
      <p></p>
      {blogit.map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={updateLike} removeBlog={removeBlog} currentUser={user}/>
      )}
    </div>
  )
}

export default App