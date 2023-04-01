const LoginForm = ({
  handleSubmit,
  handleUserChange,
  handlePasswordChange,
  username, password
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
      username
          <input
            id='username'
            type="text"
            value={username}
            name="username"
            onChange={handleUserChange}
          />
        </div>
        <div>
      password
          <input
            id='password'
            type="text"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm