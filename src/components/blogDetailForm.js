const BlogDetailForm = ({ author, url, likes, addLike, id, removeBlog, currentUser, user, blog }) => {

  if (currentUser.name === user) {

    return (
      <div>
        <ul>
          <li>{author}</li>
          <li>{url}</li>
          <li>{likes}<button onClick={() => addLike(id)}>like</button></li>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </ul>
      </div>
    )
  }

  if (currentUser !== user) {

    return (
      <div>
        <ul>
          <li>{author}</li>
          <li>{url}</li>
          <li>{likes}<button onClick={() => addLike(id)}>like</button></li>
        </ul>
      </div>
    )
  }
}

export default BlogDetailForm