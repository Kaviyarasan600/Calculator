import { CiCalculator1 } from "react-icons/ci";
import './Navbar.css'
export const Navbar = () => {
    return (
        <header className="head">
            <div className="logo">
                <div className="icon"><CiCalculator1 /></div>
                <h3>Calculator</h3>
            </div>
            <div className="navbar">
                <nav className="nav">
                    <ul className="options">
                        <li>Stander Calculator</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
