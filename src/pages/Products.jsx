import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"

export const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState("all")
    const [sort, setSort] = useState("default")
    const [search, setSearch] = useState("")
    const [visibleCount, setVisibleCount] = useState(8)

    async function getData() {
        //  API: GET https://dummyjson.com/products
        const response = await api.get("products?limit=100")
        setProducts(response.data.products)
        setLoading(false)
    }

    useEffect(() => { getData() }, [])

    const categories = ["all", ...new Set(products.map(p => p.category))]

    const filtered = products
        .filter(p => category === "all" || p.category === category)
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "price-asc") return a.price - b.price
            if (sort === "price-desc") return b.price - a.price
            if (sort === "rating") return b.rating - a.rating
            return 0
        })

    const shown = filtered.slice(0, visibleCount)

    return (
        <>
            {/*  HERO  */}
            <section style={{
                background: "url('images/productsimage.jpg') center/cover",
                padding: "60px 0", textAlign: "center", position: "relative"
            }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.72)" }} />
                <div className="container position-relative">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center mb-2" style={{ fontSize: ".78rem" }}>
                            <li className="breadcrumb-item">
                                <Link to="/" style={{ color: "#555", textDecoration: "none" }}>
                                    <i className="fa-solid fa-house me-1"></i>Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">Shop</li>
                        </ol>
                    </nav>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "2.4rem" }}>Shop Page</h1>
                    <p className="text-muted">Let's design the place you always imagined.</p>
                </div>
            </section>

            {/*  FILTER BAR  */}
            <div className="border-bottom py-3">
                <div className="container d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex gap-2 flex-wrap align-items-center">
                        <i className="fa-solid fa-filter text-muted" style={{ fontSize: ".85rem" }}></i>
                        <select className="form-select form-select-sm" style={{ minWidth: 160 }}
                            value={category} onChange={e => { setCategory(e.target.value); setVisibleCount(8) }}>
                            {categories.map(c => (
                                <option key={c} value={c}>
                                    {c === "all" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)}
                                </option>
                            ))}
                        </select>
                        <div className="input-group input-group-sm" style={{ minWidth: 190 }}>
                            <span className="input-group-text bg-white">
                                <i className="fa-solid fa-magnifying-glass text-muted"></i>
                            </span>
                            <input className="form-control border-start-0" placeholder="Search products..."
                                value={search} onChange={e => { setSearch(e.target.value); setVisibleCount(8) }} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <i className="fa-solid fa-arrow-up-wide-short text-muted" style={{ fontSize: ".85rem" }}></i>
                        <select className="form-select form-select-sm" style={{ maxWidth: 190 }}
                            value={sort} onChange={e => setSort(e.target.value)}>
                            <option value="default">Sort by: Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            {/*  GRID  */}
            <div className="container my-5">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" style={{ color: "#3a7f8c" }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-muted mb-4" style={{ fontSize: ".82rem" }}>
                            <i className="fa-solid fa-box-open me-1"></i>
                            Showing <strong>{shown.length}</strong> of <strong>{filtered.length}</strong> products
                        </p>
                        <div className="row row-cols-2 row-cols-md-4 g-4">
                            {shown.map((item) => (
                                <div className="col" key={item.id}>
                                    <div className="card h-100 border"
                                        style={{ borderRadius: 10, cursor: "pointer", transition: "transform .22s, box-shadow .22s" }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 38px rgba(0,0,0,.09)" }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}>

                                        <div className="position-relative"
                                            style={{ background: "#f0efec", height: 220, borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
                                            <span className="badge position-absolute top-0 start-0 m-2"
                                                style={{ background: "#1a1a2e", fontSize: ".6rem" }}>NEW</span>
                                            <span className="badge position-absolute start-0 m-2"
                                                style={{ background: "#3a7f8c", fontSize: ".6rem", top: 28 }}>-50%</span>
                                            <button className="btn position-absolute top-0 end-0 p-2"
                                                style={{ background: "none", border: "none", color: "#aaa" }}
                                                onClick={e => e.stopPropagation()}>
                                                <i className="fa-regular fa-heart"></i>
                                            </button>
                                            <img src={item.thumbnail} alt={item.title}
                                                className="w-100 h-100" style={{ objectFit: "contain", padding: 12 }} />
                                        </div>

                                        <div className="card-body pb-1">
                                            <div style={{ color: "#c9a84c", fontSize: ".74rem" }}>
                                                {"★".repeat(Math.round(item.rating))}{"☆".repeat(5 - Math.round(item.rating))}
                                            </div>
                                            <h6 className="mb-1 mt-1" style={{ fontSize: ".85rem", fontWeight: 500 }}>
                                                {item.title}
                                            </h6>
                                            <div>
                                                <span className="fw-bold" style={{ fontSize: ".9rem" }}>${item.price}</span>
                                                {item.discountPercentage > 0 && (
                                                    <span className="text-muted text-decoration-line-through ms-2" style={{ fontSize: ".75rem" }}>
                                                        ${(item.price / (1 - item.discountPercentage / 100)).toFixed(0)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
                                            <Link to={`/products/${item.id}`}
                                                className="btn btn-sm w-100 text-white"
                                                style={{ background: "#3a7f8c", borderRadius: 6 }}>
                                                <i className="fa-solid fa-eye me-1"></i> View Product
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {visibleCount < filtered.length && (
                            <div className="text-center mt-5">
                                <button className="btn btn-outline-secondary rounded-pill px-5"
                                    onClick={() => setVisibleCount(v => v + 8)}>
                                    <i className="fa-solid fa-chevron-down me-2"></i> Show more
                                </button>
                            </div>
                        )}

                        {filtered.length === 0 && (
                            <div className="text-center py-5 text-muted">
                                <i className="fa-solid fa-box-open mb-3" style={{ fontSize: "2.5rem", opacity: .3 }}></i>
                                <p>No products found.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/*  NEWSLETTER  */}
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
        </>
    )
}
