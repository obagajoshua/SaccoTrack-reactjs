import { Link } from "react-router-dom";



export default function Header () {
    return (
        <header className="landing-header">
                <h2>Sacco Track</h2>
                <nav>
                    <a href="/#home">Home</a>
                    <a href="/#about">About</a>
                    <Link to="/vehicles">Sacco & Vehicle Registration</Link>
        
                </nav>
                 
                <a href="/#features" className="header-button">Explore</a>
            </header>
    )
}