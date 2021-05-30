import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form className="form form-login">

            <div className="form__field">
                <label className="form__field-label" htmlFor="email">email:</label>
                <input 
                    className="form__field-input" 
                    type="email" 
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form__field">
                <label className="form__field-label" htmlFor="password">password:</label>
                <input 
                    className="form__field-input" 
                    type="password" 
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className="btn form__button" type="submit">
                sign in
            </button>
        </form>
    )
}

export default Login