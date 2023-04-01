const BlogForm = ({
  handleSubmit,
  handleBlogChange,
  handleAuthorChange,
  handleURLChange,
  blog, author, url
}) => {
  return (
    <div>
      <h2>Create new blogs</h2>
      <form onSubmit={handleSubmit}>
        <div>
                Title:
          <input
            id="title"
            type="text"
            value={blog}
            name="Title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
                Author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
                Url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleURLChange}
          />
        </div>
        <button type="submit">save post</button>
      </form>
    </div>
  )
}


export default BlogForm