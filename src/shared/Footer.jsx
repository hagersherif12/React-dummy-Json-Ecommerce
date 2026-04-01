import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <footer style={{ background: "#1a1a2e", color: "#888", padding: "40px 0 18px" }}>
            <div className="container">
                <div className="row align-items-start mb-4 g-4">

                    {/* Brand col */}
                    <div className="col-md-4">
                        <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "1.15rem", fontWeight: 700, marginBottom: 8 }}>
                            VisioCreate
                        </div>
                        <p style={{ color: "#666", fontSize: ".78rem", lineHeight: 1.7, maxWidth: 260 }}>
                            A gift & decoration store based in HCMC, Vietnam. Bringing style to every room since 2018.
                        </p>
                        {/* Social icons */}
                        <div className="d-flex gap-3 mt-3">
                            <a href="#!" style={{ color: "#555", fontSize: "1rem" }}>
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#!" style={{ color: "#555", fontSize: "1rem" }}>
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="#!" style={{ color: "#555", fontSize: "1rem" }}>
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                            <a href="#!" style={{ color: "#555", fontSize: "1rem" }}>
                                <i className="fa-brands fa-pinterest"></i>
                            </a>
                        </div>
                    </div>

                    {/* Links col */}
                    <div className="col-md-2">
                        <p style={{ color: "#fff", fontSize: ".82rem", fontWeight: 700, marginBottom: 14 }}>Navigation</p>
                        {[["Home", "/"], ["Shop", "/products"], ["Contact Us", "/contact"]].map(([l, path]) => (
                            <div key={l} className="mb-2">
                                <Link to={path} style={{ color: "#666", fontSize: ".8rem", textDecoration: "none" }}
                                    onMouseOver={e => e.target.style.color = "#fff"}
                                    onMouseOut={e => e.target.style.color = "#666"}>
                                    <i className="fa-solid fa-chevron-right me-1" style={{ fontSize: ".6rem" }}></i>
                                    {l}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Account col */}
                    <div className="col-md-2">
                        <p style={{ color: "#fff", fontSize: ".82rem", fontWeight: 700, marginBottom: 14 }}>Account</p>
                        {[["Sign In", "/login"], ["Register", "/register"]].map(([l, path]) => (
                            <div key={l} className="mb-2">
                                <Link to={path} style={{ color: "#666", fontSize: ".8rem", textDecoration: "none" }}
                                    onMouseOver={e => e.target.style.color = "#fff"}
                                    onMouseOut={e => e.target.style.color = "#666"}>
                                    <i className="fa-solid fa-chevron-right me-1" style={{ fontSize: ".6rem" }}></i>
                                    {l}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Contact col */}
                    <div className="col-md-4">
                        <p style={{ color: "#fff", fontSize: ".82rem", fontWeight: 700, marginBottom: 14 }}>Contact</p>
                        <div className="d-flex gap-2 mb-2 align-items-start">
                            <i className="fa-solid fa-location-dot mt-1" style={{ color: "#3a7f8c", fontSize: ".8rem", minWidth: 14 }}></i>
                            <span style={{ color: "#666", fontSize: ".78rem" }}>123 Design Street, HCMC, Vietnam</span>
                        </div>
                        <div className="d-flex gap-2 mb-2 align-items-center">
                            <i className="fa-solid fa-phone" style={{ color: "#3a7f8c", fontSize: ".8rem", minWidth: 14 }}></i>
                            <span style={{ color: "#666", fontSize: ".78rem" }}>+84 123 456 789</span>
                        </div>
                        <div className="d-flex gap-2 mb-2 align-items-center">
                            <i className="fa-solid fa-envelope" style={{ color: "#3a7f8c", fontSize: ".8rem", minWidth: 14 }}></i>
                            <span style={{ color: "#666", fontSize: ".78rem" }}>hello@visiocreate.com</span>
                        </div>
                        <div className="d-flex gap-2 mb-2 align-items-center">
                            <i className="fa-solid fa-clock" style={{ color: "#3a7f8c", fontSize: ".8rem", minWidth: 14 }}></i>
                            <span style={{ color: "#666", fontSize: ".78rem" }}>Mon–Fri: 9am – 6pm</span>
                        </div>
                    </div>
                </div>

                <hr style={{ borderColor: "#2a2a2a" }} />

                <div className="d-flex justify-content-between flex-wrap gap-2"
                    style={{ fontSize: ".73rem", color: "#444" }}>
                    <span>
                        <i className="fa-regular fa-copyright me-1"></i>
                        2024 VisioCreate. All rights reserved
                    </span>
                    <div>
                        <a href="#!" style={{ color: "#555", marginRight: 12, textDecoration: "none" }}>Privacy Policy</a>
                        <a href="#!" style={{ color: "#555", textDecoration: "none" }}>Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
