import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../api/axios"

export const SingleProduct = () => {
    const { productID } = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImg, setActiveImg] = useState(0)
    const [activeColor, setActiveColor] = useState(0)
    const [qty, setQty] = useState(1)
    const [wished, setWished] = useState(false)
    const [activeTab, setActiveTab] = useState("Reviews")
    const [countdown, setCountdown] = useState(2 * 86400 + 12 * 3600 + 45 * 60)
    const [addedAlert, setAddedAlert] = useState(false)

    //  GET https://dummyjson.com/products/:id
    async function getData() {
        const response = await api.get(`products/${productID}`)
        setProduct(response.data)
        setLoading(false)
    }

    useEffect(() => {
        getData()
        setActiveImg(0)
        setQty(1)
        setWished(false)
        setActiveTab("Reviews")
        window.scrollTo(0, 0)
    }, [productID])

    useEffect(() => {
        const timer = setInterval(() => setCountdown(v => v > 0 ? v - 1 : 0), 1000)
        return () => clearInterval(timer)
    }, [])

    const pad = n => String(n).padStart(2, "0")
    const cd = {
        d: pad(Math.floor(countdown / 86400)),
        h: pad(Math.floor((countdown % 86400) / 3600)),
        m: pad(Math.floor((countdown % 3600) / 60)),
        s: pad(countdown % 60)
    }

    function handleAddToCart() {
        setAddedAlert(true)
        setTimeout(() => setAddedAlert(false), 2500)
    }

    const MOCK_REVIEWS = [
        { id: 1, author: "Sofia Harvetz",  img: 5,  rating: 5, text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium." },
        { id: 2, author: "Nicolas Jensen", img: 12, rating: 5, text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium." },
        { id: 3, author: "Lena Schmidt",   img: 15, rating: 4, text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium." },
    ]

    const colors = ["#2a2a2a", "#7a5230", "#c0392b", "#f0f0f0"]

    if (loading) return (
        <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "#3a7f8c" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    if (!product) return (
        <div className="container py-5 text-muted text-center">
            <i className="fa-solid fa-triangle-exclamation mb-3" style={{ fontSize: "2rem" }}></i>
            <p>Product not found.</p>
        </div>
    )

    const images = product.images?.length > 0 ? product.images : [product.thumbnail]

    return (
        <>
            {/* BREADCRUMB */}
            <div className="border-bottom py-2">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0" style={{ fontSize: ".78rem" }}>
                            <li className="breadcrumb-item">
                                <Link to="/" style={{ color: "#555", textDecoration: "none" }}>
                                    <i className="fa-solid fa-house me-1"></i>Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/products" style={{ color: "#555", textDecoration: "none" }}>Shop</Link>
                            </li>
                            <li className="breadcrumb-item active">{product.title}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container my-5">
                {addedAlert && (
                    <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                        <i className="fa-solid fa-circle-check"></i>
                        <span><strong>{product.title}</strong> added to cart!</span>
                    </div>
                )}

                <div className="row g-5">
                    {/* LEFT — Gallery */}
                    <div className="col-md-6">
                        <div className="position-relative rounded-3 overflow-hidden mb-3 d-flex align-items-center justify-content-center"
                            style={{ background: "#f7f6f3", height: 390 }}>
                            <span className="badge position-absolute top-0 start-0 m-3"
                                style={{ background: "#1a1a2e", fontSize: ".65rem" }}>NEW</span>
                            <span className="badge position-absolute start-0 m-3"
                                style={{ background: "#3a7f8c", fontSize: ".65rem", top: 38 }}>-50%</span>

                            <button className="btn btn-sm btn-white position-absolute start-0 ms-2 rounded-circle shadow-sm"
                                style={{ width: 34, height: 34, border: "1px solid #e5e5e5", background: "#fff" }}
                                onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}>
                                <i className="fa-solid fa-chevron-left" style={{ fontSize: ".75rem" }}></i>
                            </button>

                            <img src={images[activeImg]} alt={product.title}
                                key={activeImg}
                                style={{ maxHeight: 340, maxWidth: "90%", objectFit: "contain", animation: "fadeIn .2s" }} />

                            <button className="btn btn-sm position-absolute end-0 me-2 rounded-circle shadow-sm"
                                style={{ width: 34, height: 34, border: "1px solid #e5e5e5", background: "#fff" }}
                                onClick={() => setActiveImg(i => (i + 1) % images.length)}>
                                <i className="fa-solid fa-chevron-right" style={{ fontSize: ".75rem" }}></i>
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="d-flex gap-2">
                            {images.map((img, i) => (
                                <div key={i} onClick={() => setActiveImg(i)}
                                    className="rounded-2 overflow-hidden d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 80, height: 80, background: "#f7f6f3", cursor: "pointer", flexShrink: 0,
                                        border: activeImg === i ? "2px solid #3a7f8c" : "2px solid transparent"
                                    }}>
                                    <img src={img} alt="" style={{ maxWidth: "85%", maxHeight: 65, objectFit: "contain" }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Info */}
                    <div className="col-md-6">
                        {/* Rating */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span style={{ color: "#c9a84c", fontSize: ".9rem" }}>
                                {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
                            </span>
                            <span style={{ color: "#3a7f8c", fontSize: ".8rem", fontWeight: 600 }}>
                                {product.reviews?.length || 0} Reviews
                            </span>
                        </div>

                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: 14 }}>
                            {product.title}
                        </h1>

                        <p className="text-muted mb-4" style={{ fontSize: ".87rem", lineHeight: 1.65 }}>
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <span style={{ fontSize: "1.55rem", fontWeight: 700 }}>${product.price}</span>
                            {product.discountPercentage > 0 && (
                                <span className="text-muted text-decoration-line-through" style={{ fontSize: "1rem" }}>
                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(0)}
                                </span>
                            )}
                        </div>

                        {/* Countdown */}
                        <p className="fw-semibold mb-2" style={{ fontSize: ".82rem", color: "#555" }}>
                            <i className="fa-regular fa-clock me-1" style={{ color: "#3a7f8c" }}></i>
                            Offer expires in:
                        </p>
                        <div className="d-flex gap-2 mb-4">
                            {[[cd.d, "Days"], [cd.h, "Hours"], [cd.m, "Minutes"], [cd.s, "Seconds"]].map(([v, l]) => (
                                <div key={l} className="text-center rounded-2 border"
                                    style={{ background: "#f7f6f3", padding: "10px 14px", minWidth: 58 }}>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}>{v}</div>
                                    <div className="text-muted" style={{ fontSize: ".62rem", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 3 }}>{l}</div>
                                </div>
                            ))}
                        </div>

                        {/* Measurements */}
                        <p className="fw-semibold mb-1" style={{ fontSize: ".82rem" }}>
                            <i className="fa-solid fa-ruler-combined me-1" style={{ color: "#3a7f8c" }}></i>
                            Measurements
                        </p>
                        <p className="text-muted mb-4" style={{ fontSize: ".9rem" }}>
                            {product.dimensions
                                ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
                                : "17½ × 20 5/8"}
                        </p>

                        {/* Color picker */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="fw-semibold" style={{ fontSize: ".82rem" }}>
                                <i className="fa-solid fa-palette me-1" style={{ color: "#3a7f8c" }}></i>
                                Choose Color
                            </span>
                        </div>
                        <div className="d-flex gap-2 mb-4">
                            {colors.map((c, i) => (
                                <div key={i} onClick={() => setActiveColor(i)} style={{
                                    width: 36, height: 36, borderRadius: 8, background: c, cursor: "pointer",
                                    border: activeColor === i ? "3px solid #3a7f8c" : "2px solid #ddd"
                                }} />
                            ))}
                        </div>

                        {/* Qty + Wishlist */}
                        <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                            <div className="input-group" style={{ width: "auto" }}>
                                <button className="btn btn-outline-secondary btn-sm"
                                    onClick={() => setQty(q => Math.max(1, q - 1))}>
                                    <i className="fa-solid fa-minus" style={{ fontSize: ".7rem" }}></i>
                                </button>
                                <span className="input-group-text bg-white px-3 fw-semibold">{qty}</span>
                                <button className="btn btn-outline-secondary btn-sm"
                                    onClick={() => setQty(q => q + 1)}>
                                    <i className="fa-solid fa-plus" style={{ fontSize: ".7rem" }}></i>
                                </button>
                            </div>
                            <button
                                className={`btn btn-sm flex-fill ${wished ? "btn-danger" : "btn-outline-secondary"}`}
                                style={{ borderRadius: 8 }}
                                onClick={() => setWished(v => !v)}>
                                <i className={`fa-${wished ? "solid" : "regular"} fa-heart me-1`}></i>
                                Wishlist
                            </button>
                        </div>

                        {/* Add to Cart button — static, no cart page */}
                        <button className="btn w-100 text-white mb-4 py-3 fw-bold"
                            style={{ background: "#1a1a2e", borderRadius: 8, fontSize: ".9rem" }}
                            onClick={handleAddToCart}>
                            <i className="fa-solid fa-bag-shopping me-2"></i>
                            Add to Cart
                        </button>

                        {/* Meta */}
                        <div className="text-muted border-top pt-3" style={{ fontSize: ".78rem" }}>
                            <div className="mb-1">
                                <i className="fa-solid fa-barcode me-2" style={{ color: "#aaa" }}></i>
                                <strong className="text-dark me-2">SKU</strong>{product.sku || "N/A"}
                            </div>
                            <div>
                                <i className="fa-solid fa-tag me-2" style={{ color: "#aaa" }}></i>
                                <strong className="text-dark me-2">CATEGORY</strong>{product.category}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="border-bottom">
                <div className="container">
                    <ul className="nav nav-tabs border-0">
                        {["Additional Info", "Questions", "Reviews"].map(t => (
                            <li className="nav-item" key={t}>
                                <button
                                    className={`nav-link ${activeTab === t ? "active fw-bold text-dark border-bottom border-dark border-2" : "text-muted"}`}
                                    style={{ background: "none", border: "none", borderRadius: 0, fontSize: ".88rem" }}
                                    onClick={() => setActiveTab(t)}>
                                    {t === "Additional Info" && <i className="fa-solid fa-circle-info me-1"></i>}
                                    {t === "Questions"       && <i className="fa-regular fa-circle-question me-1"></i>}
                                    {t === "Reviews"         && <i className="fa-regular fa-star me-1"></i>}
                                    {t}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="container my-5">
                {/* Additional Info */}
                {activeTab === "Additional Info" && (
                    <table className="table table-bordered" style={{ fontSize: ".86rem" }}>
                        <tbody>
                            {[
                                ["SKU",           product.sku || "N/A"],
                                ["Category",      product.category],
                                ["Brand",         product.brand || "VisioCreate"],
                                ["Stock",         product.stock],
                                ["Warranty",      product.warrantyInformation || "1 year"],
                                ["Shipping",      product.shippingInformation || "Ships in 2–3 days"],
                                ["Return Policy", product.returnPolicy || "30-day returns"],
                            ].map(([k, v]) => (
                                <tr key={k}>
                                    <td className="fw-semibold text-muted" style={{ width: 200 }}>{k}</td>
                                    <td>{v}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Questions */}
                {activeTab === "Questions" && (
                    <div>
                        <p className="text-muted mb-3" style={{ fontSize: ".87rem" }}>
                            <i className="fa-regular fa-circle-question me-1"></i>
                            Have a question about this product? Ask our team.
                        </p>
                        <div className="row g-2">
                            <div className="col-md-9">
                                <input className="form-control" placeholder="Type your question here..." />
                            </div>
                            <div className="col-md-3">
                                <button className="btn w-100 text-white" style={{ background: "#3a7f8c" }}>
                                    <i className="fa-solid fa-paper-plane me-1"></i> Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews */}
                {activeTab === "Reviews" && (
                    <>
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <span style={{ color: "#c9a84c", fontSize: "1rem" }}>
                                {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
                            </span>
                            <span className="fw-bold">{product.rating}</span>
                            <span className="text-muted" style={{ fontSize: ".82rem" }}>{product.reviews?.length || 0} Reviews</span>
                        </div>

                        <div className="d-flex align-items-center gap-2 mb-4 flex-wrap">
                            <span style={{ fontSize: "1.2rem" }}>❤️ 🧡 😊 😍 😃</span>
                            <input className="form-control flex-fill" placeholder="Write your review..."
                                style={{ minWidth: 180 }} />
                            <button className="btn text-white fw-bold" style={{ background: "#1a1a2e", whiteSpace: "nowrap" }}>
                                <i className="fa-solid fa-pen me-1"></i> Write Review
                            </button>
                        </div>

                        {(product.reviews?.length > 0 ? product.reviews : MOCK_REVIEWS).map((r, i) => (
                            <div key={i} className="border-bottom py-4">
                                <div className="d-flex align-items-center gap-3 mb-2">
                                    <img src={`https://i.pravatar.cc/80?img=${r.img || i + 5}`}
                                        alt={r.reviewerName || r.author}
                                        className="rounded-circle"
                                        style={{ width: 42, height: 42, objectFit: "cover" }} />
                                    <div>
                                        <div className="fw-semibold" style={{ fontSize: ".88rem" }}>
                                            {r.reviewerName || r.author}
                                        </div>
                                        <span style={{ color: "#c9a84c", fontSize: ".78rem" }}>
                                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-muted mb-2" style={{ fontSize: ".84rem", lineHeight: 1.65 }}>
                                    {r.comment || r.text}
                                </p>
                                <div className="d-flex gap-3">
                                    <button className="btn btn-link btn-sm p-0 text-muted" style={{ fontSize: ".78rem" }}>
                                        <i className="fa-regular fa-thumbs-up me-1"></i>Like
                                    </button>
                                    <button className="btn btn-link btn-sm p-0 text-muted" style={{ fontSize: ".78rem" }}>
                                        <i className="fa-solid fa-reply me-1"></i>Reply
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="text-center mt-4">
                            <button className="btn btn-outline-secondary rounded-pill px-4">
                                <i className="fa-solid fa-chevron-down me-1"></i> Load more
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* NEWSLETTER */}
            <section style={{ background: "#f7f6f3", padding: "60px 0", textAlign: "center" }}>
                <div className="container">
                    <i className="fa-regular fa-envelope mb-3" style={{ fontSize: "1.8rem", color: "#3a7f8c" }}></i>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, marginBottom: 7 }}>Join Our Newsletter</h3>
                    <p className="text-muted mb-4" style={{ fontSize: ".88rem" }}>Sign up for deals, new products and promotions</p>
                    <div className="d-flex justify-content-center">
                        <div className="input-group" style={{ maxWidth: 420 }}>
                            <span className="input-group-text bg-white border-end-0">
                                <i className="fa-regular fa-envelope text-muted"></i>
                            </span>
                            <input type="email" className="form-control border-start-0" placeholder="Email address" />
                            <button className="btn text-white fw-bold" style={{ background: "#3a7f8c" }}>Signup</button>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`@keyframes fadeIn { from{opacity:0} to{opacity:1} }`}</style>
        </>
    )
}
