import { useState } from "react"
import { Link } from "react-router-dom"

export const TopBanner = () => {
    const [visible, setVisible] = useState(true)

    if (!visible) return null

    return (
        <div className="text-center py-2 position-relative"
            style={{ background: "#1a1a2e", color: "#bbb", fontSize: ".76rem", letterSpacing: ".03em" }}>
            <i className="fa-solid fa-tag me-1" style={{ color: "#c9a84c" }}></i>
            30% off storewide — Limited time!{" "}
            <Link to="/products" style={{ color: "#c9a84c", fontWeight: 600, textDecoration: "none" }}>
                Shop Now <i className="fa-solid fa-arrow-right ms-1"></i>
            </Link>
            <button
                onClick={() => setVisible(false)}
                className="btn btn-sm position-absolute end-0 top-50 translate-middle-y me-3"
                style={{ background: "none", border: "none", color: "#666", lineHeight: 1 }}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    )
}
