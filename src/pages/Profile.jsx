import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../context/context"

export const Profile = () => {
    const { userData, token, setToken, setUserData } = useContext(DataContext)
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        setToken(null)
        setUserData({})
        navigate("/login")
    }

    if (!token) {
        return (
            <div className="container text-center py-5">
                <i className="fa-regular fa-circle-user mb-3" style={{ fontSize:"3rem", color:"#ccc" }}></i>
                <h4 style={{ fontFamily:"'Playfair Display',serif" }}>You are not signed in</h4>
                <p className="text-muted mt-2 mb-4">Please sign in to view your profile.</p>
                <Link to="/login" className="btn text-white px-4" style={{ background:"#3a7f8c", borderRadius:8 }}>
                    <i className="fa-solid fa-right-to-bracket me-2"></i>Sign In
                </Link>
            </div>
        )
    }

    return (
        <div className="container my-5" style={{ maxWidth: 800 }}>

            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb" style={{ fontSize:".78rem" }}>
                    <li className="breadcrumb-item">
                        <Link to="/" style={{ color:"#555", textDecoration:"none" }}>
                            <i className="fa-solid fa-house me-1"></i>Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Profile</li>
                </ol>
            </nav>

            <div className="row g-4">
                {/*   card  */}
                <div className="col-md-4">
                    <div className="card border rounded-3 text-center p-4">
                        {userData.image ? (
                            <img src={userData.image} alt={userData.name}
                                className="rounded-circle mx-auto mb-3"
                                style={{ width:90, height:90, objectFit:"cover", border:"3px solid #e8f4f6" }} />
                        ) : (
                            <div className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width:90, height:90, background:"#e8f4f6" }}>
                                <i className="fa-regular fa-circle-user" style={{ fontSize:"2.8rem", color:"#3a7f8c" }}></i>
                            </div>
                        )}
                        <h5 className="fw-bold mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>
                            {userData.name }
                        </h5>
                        <p className="text-muted mb-3" style={{ fontSize:".82rem" }}>
                            {userData.email }
                        </p>
                        <span className="badge rounded-pill px-3 py-2"
                            style={{ background:"#e8f4f6", color:"#3a7f8c", fontSize:".75rem" }}>
                            <i className="fa-solid fa-circle-check me-1"></i> Active Member
                        </span>
                    </div>
                </div>

                {/*  Info + actions  */}
                <div className="col-md-8 d-flex flex-column gap-3">

                    {/* Account info */}
                    <div className="card border rounded-3 p-4">
                        <h6 className="fw-bold mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>
                            <i className="fa-regular fa-id-card me-2" style={{ color:"#3a7f8c" }}></i>
                            Account Information
                        </h6>
                        <div className="row g-3">
                            {[
                                { icon:"fa-regular fa-user",    label:"Full Name", value: userData.name   },
                                { icon:"fa-regular fa-envelope",label:"Email",     value: userData.email  },
                            ].map((row, i) => (
                                <div className="col-12" key={i}>
                                    <div className="d-flex align-items-center gap-3 p-3 rounded-2"
                                        style={{ background:"#f7f6f3" }}>
                                        <i className={`${row.icon}`} style={{ color:"#3a7f8c", width:16 }}></i>
                                        <div>
                                            <p className="mb-0 text-muted" style={{ fontSize:".72rem" }}>{row.label}</p>
                                            <p className="mb-0 fw-semibold" style={{ fontSize:".88rem" }}>{row.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card border rounded-3 p-4">
                        <h6 className="fw-bold mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>
                            <i className="fa-solid fa-bolt me-2" style={{ color:"#3a7f8c" }}></i>
                            Quick Actions
                        </h6>
                        <div className="d-flex gap-2 flex-wrap">
                            <Link to="/products" className="btn btn-sm btn-outline-secondary">
                                <i className="fa-solid fa-shop me-1"></i> Browse Shop
                            </Link>
                            <Link to="/contact" className="btn btn-sm btn-outline-secondary">
                                <i className="fa-regular fa-envelope me-1"></i> Contact Us
                            </Link>
                            <button className="btn btn-sm btn-outline-danger ms-auto" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
