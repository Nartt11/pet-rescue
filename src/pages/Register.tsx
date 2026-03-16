export default function Register() {
  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label htmlFor="html">HTML</label>
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label htmlFor="html">HTML</label>

        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <input type="submit" />
      </form>
      <div>
        <i>hhhh</i>
        <em>hhhh</em>
      </div>
    </div>
  );
}
