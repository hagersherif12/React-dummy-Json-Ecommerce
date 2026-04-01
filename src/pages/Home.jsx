import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"

export const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    async function getData() {
        // API: GET https://dummyjson.com/products
        const response = await api.get("products?limit=5")
        setProducts(response.data.products)
        setLoading(false)
    }

    useEffect(() => { getData() }, [])

    return (
        <>
            {/*  HERO  */}
            <section style={{
                background: "linear-gradient(135deg,#2d5f6b 0%,#3a7f8c 55%,#4a9aab 100%)",
                minHeight: 420, display: "flex", alignItems: "center",
                position: "relative", overflow: "hidden"
            }}>
                <div style={{
                    position: "absolute", right: 0, top: 0, bottom: 0, width: "50%",
                    background: "url('images/heroImage.jpg') center/cover",
                    opacity: .3
                }} />
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="col-md-6">
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.6rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 14 }}>
                            Transform Your Space,<br />Elevate Your Life
                        </h1>
                        <p style={{ color: "rgba(255,255,255,.78)", fontSize: ".9rem", marginBottom: 28 }}>
                            VisioCreate is a gift &amp; decorations store based in HCMC, Vietnam. Est since 2018.
                        </p>
                        <Link to="/products" className="btn text-white fw-bold px-4 py-2"
                            style={{ background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.4)", borderRadius: 8 }}>
                            Shop Now <i className="fa-solid fa-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/*  CATEGORIES  */}
            <section className="container my-5">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="card border-0 h-100 overflow-hidden position-relative"
                            style={{ background: "#f7f6f3", minHeight: 300 }}>
                            <div className="card-body p-4">
                                <h3 style={{ fontFamily: "'Playfair Display',serif" }}>Living Room</h3>
                                <Link to="/products" className="fw-semibold" style={{ color: "#3a7f8c", fontSize: ".85rem", textDecoration: "none" }}>
                                    Shop Now <i className="fa-solid fa-arrow-right ms-1"></i>
                                </Link>
                            </div>
                            <img src="images\livingroom.jpg"
                                alt="Living Room"
                                style={{ position: "absolute", bottom: 0, right: 0, maxHeight: "75%", objectFit: "contain" }} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row g-3 h-100">
                            <div className="col-12">
                                <div className="card border-0 overflow-hidden position-relative" style={{ background: "#f7f6f3", minHeight: 145 }}>
                                    <div className="card-body p-4">
                                        <h5 style={{ fontFamily: "'Playfair Display',serif" }}>Bedroom</h5>
                                        <Link to="/products" style={{ color: "#3a7f8c", fontSize: ".82rem", fontWeight: 600, textDecoration: "none" }}>
                                            Shop Now <i className="fa-solid fa-arrow-right ms-1"></i>
                                        </Link>
                                    </div>
                                    <img src="images\bedroom.jpg"
                                        alt="Bedroom"
                                        style={{ position: "absolute", bottom: 0, right: 8, maxHeight: "80%", objectFit: "contain" }} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card border-0 overflow-hidden position-relative" style={{ background: "#f7f6f3", minHeight: 145 }}>
                                    <div className="card-body p-4">
                                        <h5 style={{ fontFamily: "'Playfair Display',serif" }}>Kitchen</h5>
                                        <Link to="/products" style={{ color: "#3a7f8c", fontSize: ".82rem", fontWeight: 600, textDecoration: "none" }}>
                                            Shop Now <i className="fa-solid fa-arrow-right ms-1"></i>
                                        </Link>
                                    </div>
                                    <img src="images\kitchen.jpg"
                                        alt="Kitchen"
                                        style={{ position: "absolute", bottom: 0, right: 8, maxHeight: "80%", objectFit: "contain" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  NEW ARRIVALS  */}
            <section className="container my-5">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700 }}>New Arrivals</h2>
                    <Link to="/products" style={{ color: "#555", fontSize: ".82rem", fontWeight: 600, textDecoration: "none" }}>
                        More Products <i className="fa-solid fa-arrow-right ms-1"></i>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" style={{ color: "#3a7f8c" }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row row-cols-2 row-cols-md-5 g-3">
                        {products.map((item) => (
                            <div className="col" key={item.id}>
                                <div className="card h-100 border" style={{ borderRadius: 10 }}>
                                    <div className="position-relative"
                                        style={{ background: "#f0efec", borderRadius: "10px 10px 0 0", overflow: "hidden", height: 160 }}>
                                        <span className="badge position-absolute top-0 start-0 m-2"
                                            style={{ background: "#1a1a2e", fontSize: ".6rem" }}>NEW</span>
                                        <span className="badge position-absolute start-0 m-2"
                                            style={{ background: "#3a7f8c", fontSize: ".6rem", top: 28 }}>-50%</span>
                                        <button className="btn position-absolute top-0 end-0 p-2"
                                            style={{ background: "none", border: "none", color: "#aaa" }}>
                                            <i className="fa-regular fa-heart"></i>
                                        </button>
                                        <img src={item.thumbnail} alt={item.title}
                                            className="w-100 h-100" style={{ objectFit: "contain", padding: 10 }} />
                                    </div>
                                    <div className="card-body p-2">
                                        <div style={{ color: "#c9a84c", fontSize: ".72rem" }}>
                                            {"★".repeat(Math.round(item.rating))}{"☆".repeat(5 - Math.round(item.rating))}
                                        </div>
                                        <p className="mb-1" style={{ fontSize: ".8rem", fontWeight: 500 }}>{item.title}</p>
                                        <span className="fw-bold" style={{ fontSize: ".88rem" }}>${item.price}</span>
                                    </div>
                                    <div className="card-footer p-2 bg-white border-0">
                                        <Link to={`/products/${item.id}`}
                                            className="btn btn-sm w-100 text-white"
                                            style={{ background: "#3a7f8c", fontSize: ".78rem" }}>
                                            <i className="fa-solid fa-eye me-1"></i> View Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/*  TRUST BAR  */}
            <section style={{ background: "#f7f6f3", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
                <div className="container">
                    <div className="row text-center g-0">
                        {[
                            { icon: "fa-solid fa-truck-fast",      title: "Free Shipping",   sub: "Order above $200" },
                            { icon: "fa-solid fa-rotate-left",      title: "Money-back",      sub: "30 days guarantee" },
                            { icon: "fa-solid fa-shield-halved",    title: "Secure Payments", sub: "Secured by Stripe" },
                            { icon: "fa-solid fa-headset",          title: "24/7 Support",    sub: "Phone and email support" },
                        ].map((t, i) => (
                            <div key={i} className={`col-6 col-md-3 py-4 ${i < 3 ? "border-end" : ""}`}>
                                <i className={`${t.icon} mb-3`} style={{ fontSize: "1.6rem", color: "#3a7f8c" }}></i>
                                <h6 className="fw-bold mb-1" style={{ fontSize: ".86rem" }}>{t.title}</h6>
                                <p className="mb-0 text-muted" style={{ fontSize: ".74rem" }}>{t.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*  PROMO BANNER  */}
            <section>
                <div className="row g-0">
                    <div className="col-md-6 d-none d-md-block"
                        style={{ background: "url('images/sofaimage.jpg') center/cover", minHeight: 300 }} />
                    <div className="col-md-6 d-flex flex-column justify-content-center p-5">
                        <span style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", color: "#3a7f8c", textTransform: "uppercase" }}>
                            <i className="fa-solid fa-tag me-1"></i> Sale up to 35% off
                        </span>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.1rem", fontWeight: 700, lineHeight: 1.15, margin: "10px 0 12px" }}>
                            HUNDREDS of<br />New lower prices!
                        </h2>
                        <p className="text-muted mb-4" style={{ fontSize: ".88rem" }}>
                            It's more affordable than ever to give every room in your home a stylish makeover
                        </p>
                        <div>
                            <Link to="/products" style={{ color: "#3a7f8c", fontWeight: 700, textDecoration: "none" }}>
                                Shop Now <i className="fa-solid fa-arrow-right ms-1"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/*  ARTICLES  */}
            <section className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700 }}>Articles</h2>
                    <a href="#!" style={{ color: "#555", fontSize: ".82rem", fontWeight: 600, textDecoration: "none" }}>
                        More Articles <i className="fa-solid fa-arrow-right ms-1"></i>
                    </a>
                </div>
                <div className="row g-3">
                    {[
                        { title: "7 ways to decor your home", img: "images/sofaimage.jpg" },
                        { title: "Kitchen organization",       img: "images/kitchen.jpg" },
                        { title: "Decor your bedroom",         img: "images/bedroom.jpg" },
                    ].map((a, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="card border" style={{ borderRadius: 10, overflow: "hidden" }}>
                                <img src={a.img} className="card-img-top" alt={a.title} style={{ height: 180, objectFit: "cover" }} />
                                <div className="card-body">
                                    <h6 className="fw-semibold">{a.title}</h6>
                                    <a href="#!" style={{ color: "#3a7f8c", fontSize: ".8rem", fontWeight: 600, textDecoration: "none" }}>
                                        Read More <i className="fa-solid fa-arrow-right ms-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/*  NEWSLETTER  */}
            <section style={{ background: "#f7f6f3", padding: "60px 0", textAlign: "center" }}>
                <div className="container">
                    <i className="fa-regular fa-envelope mb-3" style={{ fontSize: "1.8rem", color: "#3a7f8c" }}></i>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 700, marginBottom: 7 }}>
                        Join Our Newsletter
                    </h3>
                    <p className="text-muted mb-4" style={{ fontSize: ".88rem" }}>
                        Sign up for deals, new products and promotions
                    </p>
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
        </>
    )
}
