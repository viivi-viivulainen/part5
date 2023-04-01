const BlogDetailForm = ({ author, url, likes, addLike, id, removeBlog, currentUser, user, blog }) => {
  //console.log(currentUser.name)
  //console.log(user)

  //Jos blogin luoja ja nykyinen käyttäjä ovat saman niin poistomahdollisuus on olemassa
  if (currentUser.name === user.name) {

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

  //Jos blogin lisäänyt käyttäjä ei ole sama kuin nykyinen käyttäjä, ei blogia voi poistaa
  if (currentUser.name !== user.name) {

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