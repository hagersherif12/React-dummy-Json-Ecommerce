import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="container text-center py-5" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "6rem", fontWeight: 700, color: "#e5e5e5", lineHeight: 1 }}>
                404
            </h1>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, marginBottom: 12 }}>
                Page Not Found
            </h2>
            <p className="text-muted mb-4" style={{ maxWidth: 400, fontSize: ".9rem" }}>
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn text-white px-4 py-2 fw-bold"
                style={{ background: "#3a7f8c", borderRadius: 8 }}>
                <i className="fa-solid fa-arrow-left me-2"></i>Back to Home
            </Link>
        </div>
    )
}
