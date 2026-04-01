import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { DataContext } from "../context/context"

export const Navbar = () => {
    const { token, setToken, userData, setUserData } = useContext(DataContext)

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        setToken(null)
        setUserData({})
    }

    const activeStyle = { color: "#3a7f8c", fontWeight: 600 }
    const normalStyle = { color: "#555" }

    return (
        <nav className="navbar navbar-expand-lg bg-white"
            style={{ borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 999 }}>
            <div className="container">

                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/"
                    style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: "#1a1a2e" }}>
                    VisioCreate
                </Link>

                {/* Toggler */}
                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* Center links */}
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink to="/" end className="nav-link"
                                style={({ isActive }) => isActive ? activeStyle : normalStyle}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products" className="nav-link"
                                style={({ isActive }) => isActive ? activeStyle : normalStyle}>
                                Shop
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link"
                                style={({ isActive }) => isActive ? activeStyle : normalStyle}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>

                    {/* Right icons */}
                    <ul className="navbar-nav ms-auto align-items-center gap-2">

                        {/* Search — static icon */}
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: "#555", cursor: "pointer" }}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </li>

                        {/* Wishlist — static icon */}
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: "#555", cursor: "pointer" }}>
                                <i className="fa-regular fa-heart"></i>
                            </span>
                        </li>

                        {/* Cart — static icon, no page */}
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: "#555", cursor: "pointer" }}>
                                <i className="fa-solid fa-bag-shopping"></i>
                            </span>
                        </li>

                        <li className="nav-item">
                            <span style={{ color: "#e5e5e5" }}>|</span>
                        </li>

                        {/* Auth section */}
                        {token ? (
                            <>
                                {/* Profile link */}
                                <li className="nav-item">
                                    <NavLink to="/profile" className="nav-link d-flex align-items-center gap-1"
                                        style={({ isActive }) => isActive ? activeStyle : normalStyle}>
                                        {userData?.image ? (
                                            <img src={userData.image} alt="avatar"
                                                className="rounded-circle"
                                                style={{ width: 24, height: 24, objectFit: "cover" }} />
                                        ) : (
                                            <i className="fa-regular fa-circle-user"></i>
                                        )}
                                        <span style={{ fontSize: ".84rem" }}>
                                            {userData?.name?.split(' ')[0] || 'Profile'}
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                        onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/register"
                                        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                                        <i className="fa-solid fa-user-plus"></i> Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login"
                                        className="btn btn-sm text-white d-flex align-items-center gap-1"
                                        style={{ background: "#3a7f8c", borderRadius: 6 }}>
                                        <i className="fa-solid fa-right-to-bracket"></i> Sign In
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
