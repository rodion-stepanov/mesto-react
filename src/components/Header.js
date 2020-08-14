import React from 'react';
import headerLogo from '../images/logo.svg'

function Header() {
    return (
        <header className="header">
            <img src={headerLogo} alt="Лого Место" className="header__logo" />
        </header>
    )
}

export default Header