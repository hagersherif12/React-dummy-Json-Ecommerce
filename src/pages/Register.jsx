import { useForm } from "react-hook-form"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"

export const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [error, setError]     = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPw, setShowPw]   = useState(false)
    const [showCp, setShowCp]   = useState(false)
    const navigate              = useNavigate()

    const password = watch("password")

    // POST https://dummyjson.com/users/add
    async function sendData(data) {
        setLoading(true)
        try {
            await api.post("users/add", {
                firstName: data.firstName,
                lastName:  data.lastName,
                email:     data.email,
                username:  data.username,
                password:  data.password,
            })
            navigate("/login")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.")
        } 
    }

    function handleInput() { setError(null) }

    return (
        <div className="container my-5" style={{ maxWidth: 920 }}>
            <div className="row g-0 rounded-4 overflow-hidden shadow-sm border">

                {/*  LEFT image  */}
                <div className="col-md-5 d-none d-md-block position-relative"
                    style={{ background:"url('images/sofaimage.jpg') center/cover", minHeight:560 }}>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(0,0,0,.45),rgba(0,0,0,.1))" }} />
                    <div className="position-absolute top-0 start-0 p-4">
                        <span style={{ fontFamily:"'Playfair Display',serif", color:"#fff", fontSize:"1.2rem", fontWeight:700 }}>
                            VisioCreate
                        </span>
                    </div>
                    <div className="position-absolute bottom-0 start-0 p-4">
                        <p style={{ color:"rgba(255,255,255,.7)", fontSize:".82rem", fontStyle:"italic" }}>
                            "Join thousands of happy customers transforming their homes."
                        </p>
                    </div>
                </div>

                {/*  RIGHT form  */}
                <div className="col-md-7 bg-white p-5 d-flex flex-column justify-content-center">
                    <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.8rem", marginBottom:6 }}>
                        Create Account
                    </h2>
                    <p className="text-muted mb-4" style={{ fontSize:".83rem" }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color:"#3a7f8c", fontWeight:600, textDecoration:"none" }}>Sign In</Link>
                    </p>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center gap-2 mb-3">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    {/*Form  */}
                    <form onSubmit={handleSubmit(sendData)} className="row gy-3">

                        {/* First + Last name */}
                        <div className="col-6">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-regular fa-user me-1 text-muted"></i> First Name
                            </label>
                            <input type="text" className={`form-control ${errors.firstName ? "is-invalid":""}`}
                                placeholder="First name" onInput={handleInput}
                                {...register("firstName", {
                                    required:  "First name is required",
                                    minLength: { value:2, message:"Min 2 characters" }
                                })} />
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.firstName?.message}</p>
                        </div>

                        <div className="col-6">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-regular fa-user me-1 text-muted"></i> Last Name
                            </label>
                            <input type="text" className={`form-control ${errors.lastName ? "is-invalid":""}`}
                                placeholder="Last name" onInput={handleInput}
                                {...register("lastName", {
                                    required:  "Last name is required",
                                    minLength: { value:2, message:"Min 2 characters" }
                                })} />
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.lastName?.message}</p>
                        </div>

                        {/* Username */}
                        <div className="col-12">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-solid fa-at me-1 text-muted"></i> Username
                            </label>
                            <input type="text" className={`form-control ${errors.username ? "is-invalid":""}`}
                                placeholder="Choose a username" onInput={handleInput}
                                {...register("username", {
                                    required:  "Username is required",
                                    minLength: { value:3,  message:"Min 3 characters"  },
                                    maxLength: { value:20, message:"Max 20 characters" }
                                })} />
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.username?.message}</p>
                        </div>

                        {/* Email */}
                        <div className="col-12">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-regular fa-envelope me-1 text-muted"></i> Email
                            </label>
                            <input type="email" className={`form-control ${errors.userEmail ? "is-invalid":""}`}
                                placeholder="your@email.com" onInput={handleInput}
                                {...register("userEmail", {
                                    required: "Email is required",
                                    pattern:  { value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Invalid email address" }
                                })} />
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.userEmail?.message}</p>
                        </div>

                        {/* Password */}
                        <div className="col-6">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-solid fa-lock me-1 text-muted"></i> Password
                            </label>
                            <div className="input-group">
                                <input type={showPw ? "text":"password"}
                                    className={`form-control ${errors.password ? "is-invalid":""}`}
                                    placeholder="Min 6 characters" onInput={handleInput}
                                    {...register("password", {
                                        required:  "Password is required",
                                        minLength: { value:6, message:"Min 6 characters" }
                                    })} />

                                <button type="button" className="btn btn-outline-secondary"
                                    onClick={() => setShowPw(v => !v)}>
                                    <i className={`fa-regular ${showPw ? "fa-eye-slash":"fa-eye"}`}></i>
                                </button>
                            </div>
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.password?.message}</p>
                        </div>

                        {/* Confirm Password */}
                        <div className="col-6">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-solid fa-lock me-1 text-muted"></i> Confirm Password
                            </label>
                            <div className="input-group">
                                <input type={showCp ? "text":"password"}
                                    className={`form-control ${errors.confirmPassword ? "is-invalid":""}`}
                                    placeholder="Repeat password" onInput={handleInput}
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === password || "Passwords do not match"
                                    })} />
                                <button type="button" className="btn btn-outline-secondary"
                                    onClick={() => setShowCp(v => !v)}>
                                    <i className={`fa-regular ${showCp ? "fa-eye-slash":"fa-eye"}`}></i>
                                </button>
                            </div>
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>{errors.confirmPassword?.message}</p>
                        </div>

                        {/* Terms */}
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="agreeTerms"
                                    {...register("terms", { required:"You must accept the terms" })} />
                                <label className="form-check-label text-muted" htmlFor="agreeTerms"
                                    style={{ fontSize:".82rem" }}>
                                    I agree to the{" "}
                                    <a href="#!" style={{ color:"#3a7f8c", textDecoration:"none" }}>Terms of Use</a>
                                    {" "}and{" "}
                                    <a href="#!" style={{ color:"#3a7f8c", textDecoration:"none" }}>Privacy Policy</a>
                                </label>
                                <p className="text-danger mb-0" style={{ fontSize:".78rem" }}>{errors.terms?.message}</p>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="col-12">
                            <button className="btn w-100 text-white py-2 fw-bold"
                                style={{ background:"#3a7f8c", borderRadius:8, fontSize:".9rem" }}
                                disabled={loading}>
                                {loading ? (
                                    <><span className="spinner-border spinner-border-sm me-2" role="status" />Creating account...</>
                                ) : (
                                    <><i className="fa-solid fa-user-plus me-2"></i>Create Account</>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
