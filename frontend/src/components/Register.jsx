import { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <>
            <form className="form form-register">

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
                    <label className="form__field-label" htmlFor="name">name:</label>
                    <input 
                        className="form__field-input" 
                        type="text"
                        id="name"
                        autoComplete="off"
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                <div className="form__field">
                    <label className="form__field-label" htmlFor="confirmPassword">confirm password:</label>
                    <input 
                        className="form__field-input" 
                        type="password" 
                        id="confirmPassword"
                        autoComplete="off"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="btn form__button" type="submit">
                    join
                </button>
            </form>
        </>
    )
}

export default Register