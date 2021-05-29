
const IdentityToggle = ({ onToggleHandler, active }) => {
    
    return (
        <div 
            className="toggle-bar"
            onClick={(e) => onToggleHandler(e.target.dataset.type)}
        >
            <div 
                className={
                    `toggle-bar__register 
                    ${active === 'register' 
                        ? 'toggle-bar__register_active' 
                        : ''}`
                } 
                data-type="register"
            >
                join
            </div>
            <div 
                className={
                    `toggle-bar__login 
                    ${active === 'login' 
                        ? 'toggle-bar__login_active' 
                        : ''} `
                } 
                data-type="login"
            >
                sign in
            </div>
        </div>
    )
}

export default IdentityToggle