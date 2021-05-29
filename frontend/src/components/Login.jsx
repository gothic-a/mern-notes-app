const Login = () => {
    return (
        <form className="form form-login">

            <div className="form__field">
                <label className="form__field-label" htmlFor="userEmail">email:</label>
                <input className="form__field-input" type="email" id="userEmail"/>
            </div>
            <div className="form__field">
                <label className="form__field-label" htmlFor="password">password:</label>
                <input className="form__field-input" type="password" id="password"/>
            </div>
            <button className="btn form__button" type="submit">
                sign in
            </button>
        </form>
    )
}

export default Login