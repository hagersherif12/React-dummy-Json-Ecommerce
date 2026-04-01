import { useForm } from "react-hook-form"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading]     = useState(false)

    function sendMessage(data) {
        setLoading(true)
        console.log("Contact form data:", data)
        // API: POST /api/contact  body: { name, email, subject, message }
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
            reset()
            setTimeout(() => setSubmitted(false), 5000)
        }, 800)
    }

    return (
        <>
            {/* HERO*/}
            <section style={{
                background: "linear-gradient(135deg,#2d5f6b 0%,#3a7f8c 55%,#4a9aab 100%)",
                padding: "60px 0", textAlign: "center"
            }}>
                <div className="container">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb justify-content-center mb-0" style={{ fontSize:".78rem" }}>
                            <li className="breadcrumb-item">
                                <Link to="/" style={{ color:"rgba(255,255,255,.7)", textDecoration:"none" }}>
                                    <i className="fa-solid fa-house me-1"></i>Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" style={{ color:"#fff" }}>Contact Us</li>
                        </ol>
                    </nav>
                    <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, color:"#fff" }}>Contact Us</h1>
                    <p style={{ color:"rgba(255,255,255,.75)", fontSize:".9rem" }}>
                        We'd love to hear from you. Send us a message!
                    </p>
                </div>
            </section>

            <div className="container my-5">
                <div className="row g-5">

                    {/*Info side*/}
                    <div className="col-md-4">
                        <h4 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, marginBottom:20 }}>
                            Get In Touch
                        </h4>

                        {[
                            { icon:"fa-solid fa-location-dot",  title:"Address",       text:"123 Design Street, HCMC, Vietnam" },
                            { icon:"fa-solid fa-phone",         title:"Phone",         text:"+84 123 456 789" },
                            { icon:"fa-regular fa-envelope",    title:"Email",         text:"hello@visiocreate.com" },
                            { icon:"fa-solid fa-clock",         title:"Working Hours", text:"Mon–Fri: 9am – 6pm" },
                        ].map((info, i) => (
                            <div key={i} className="d-flex gap-3 mb-4">
                                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{ width:40, height:40, background:"#e8f4f6" }}>
                                    <i className={`${info.icon}`} style={{ color:"#3a7f8c", fontSize:".85rem" }}></i>
                                </div>
                                <div>
                                    <p className="fw-semibold mb-0" style={{ fontSize:".88rem" }}>{info.title}</p>
                                    <p className="text-muted mb-0" style={{ fontSize:".83rem" }}>{info.text}</p>
                                </div>
                            </div>
                        ))}

                        {/* Social */}
                        <div className="mt-4">
                            <p className="fw-semibold mb-3" style={{ fontSize:".88rem" }}>Follow Us</p>
                            <div className="d-flex gap-2">
                                {[
                                    { icon:"fa-brands fa-instagram", color:"#e1306c" },
                                    { icon:"fa-brands fa-facebook",  color:"#1877f2" },
                                    { icon:"fa-brands fa-youtube",   color:"#ff0000" },
                                    { icon:"fa-brands fa-pinterest", color:"#e60023" },
                                ].map((s, i) => (
                                    <a key={i} href="#!" style={{
                                        width:38, height:38, background:"#f7f6f3", borderRadius:"50%",
                                        display:"flex", alignItems:"center", justifyContent:"center",
                                        border:"1px solid #e5e5e5", textDecoration:"none", color:s.color,
                                        transition:"transform .2s"
                                    }}
                                        onMouseOver={e => e.currentTarget.style.transform = "scale(1.15)"}
                                        onMouseOut={e  => e.currentTarget.style.transform = ""}>
                                        <i className={s.icon} style={{ fontSize:".95rem" }}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form side  */}
                    <div className="col-md-8">
                        <div className="card border rounded-3 p-4 p-md-5">
                            <h5 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, marginBottom:24 }}>
                                <i className="fa-regular fa-paper-plane me-2" style={{ color:"#3a7f8c" }}></i>
                                Send a Message
                            </h5>

                            {submitted && (
                                <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Your message was sent! We'll get back to you within 24 hours.</span>
                                </div>
                            )}

                            {/*  useForm  */}
                            <form onSubmit={handleSubmit(sendMessage)} className="row gy-3">

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                        <i className="fa-regular fa-user me-1 text-muted"></i> Full Name
                                    </label>
                                    <input type="text" className={`form-control ${errors.name ? "is-invalid":""}`}
                                        placeholder="Your full name"
                                        {...register("name", {
                                            required:  "Name is required",
                                            minLength: { value:3, message:"Min 3 characters" }
                                        })} />
                                    <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.name?.message}</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                        <i className="fa-regular fa-envelope me-1 text-muted"></i> Email
                                    </label>
                                    <input type="email" className={`form-control ${errors.email ? "is-invalid":""}`}
                                        placeholder="your@email.com"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern:  { value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Invalid email" }
                                        })} />
                                    <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.email?.message}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                        <i className="fa-solid fa-tag me-1 text-muted"></i> Subject
                                    </label>
                                    <input type="text" className={`form-control ${errors.subject ? "is-invalid":""}`}
                                        placeholder="What is this about?"
                                        {...register("subject", { required:"Subject is required" })} />
                                    <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.subject?.message}</p>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                        <i className="fa-regular fa-message me-1 text-muted"></i> Message
                                    </label>
                                    <textarea className={`form-control ${errors.message ? "is-invalid":""}`}
                                        rows={5} placeholder="Write your message here..."
                                        {...register("message", {
                                            required:  "Message is required",
                                            minLength: { value:10, message:"Min 10 characters" }
                                        })} />
                                    <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.message?.message}</p>
                                </div>

                                <div className="col-12">
                                    <button type="submit"
                                        className="btn text-white px-5 py-2 fw-bold"
                                        style={{ background:"#3a7f8c", borderRadius:8 }}
                                        disabled={loading}>
                                        {loading ? (
                                            <><span className="spinner-border spinner-border-sm me-2" />Sending...</>
                                        ) : (
                                            <><i className="fa-solid fa-paper-plane me-2"></i>Send Message</>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
