import Togglable from './Toggalable'
import BlogDetailForm from './blogDetailForm'

const Blog = ({ blog, updateLike, removeBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log(blog)
  //console.log(currentUser._id)

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        <Togglable buttonLabel="View">
          <BlogDetailForm key={blog.id} author={blog.author} url={blog.url} likes={blog.likes} user={blog.user} addLike={updateLike} id={blog} removeBlog={removeBlog} currentUser={currentUser} blog={blog}/>
        </Togglable>
      </div>
    </div>
  )}

export default Blog