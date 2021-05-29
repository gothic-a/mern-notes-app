const Register = () => {
    return (
        <>
            <form className="form form-register">

                <div className="form__field">
                    <label className="form__field-label" >email:</label>
                    <input className="form__field-input" type="text"/>
                </div>
                <div className="form__field">
                    <label className="form__field-label" htmlFor="password">password:</label>
                    <input className="form__field-input" type="password" id="password"/>
                </div>
                <div className="form__field">
                    <label className="form__field-label" htmlFor="confirmPassword">confirm password:</label>
                    <input className="form__field-input" type="password" id="confirmPassword"/>
                </div>
                <button className="btn form__button" type="submit">
                    join
                </button>
            </form>
        </>
    )
}

export default Register