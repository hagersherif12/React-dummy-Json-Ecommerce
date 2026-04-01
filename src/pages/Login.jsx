import { useForm } from "react-hook-form"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../context/context"
import api from "../api/axios"

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError]       = useState(null)
    const [loading, setLoading]   = useState(false)
    const [showPw, setShowPw]     = useState(false)
    const navigate                = useNavigate()
    const { setToken, setUserData } = useContext(DataContext)

    // API: POST https://dummyjson.com/auth/login
    async function sendData(data) {
        setLoading(true)
        try {
            const response = await api.post("auth/login", {
                username: data.username,
                password: data.password,
                expiresInMins: 30
            })

            console.log(response)


            const token = response.data.accessToken;
            const user = {
                name:  response.data.firstName + " " + response.data.lastName,
                email: response.data.email,
                image: response.data.image
            }

            localStorage.setItem('token',    token)
            localStorage.setItem('userData', JSON.stringify(user))
            setToken(token)
            setUserData(user)
            navigate("/")

        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    function handleInput() { setError(null) }

    return (
        <div className="container my-5" style={{ maxWidth: 900 }}>
            <div className="row g-0 rounded-4 overflow-hidden shadow-sm border">

                {/*  LEFT image panel  */}
                <div className="col-md-6 d-none d-md-block position-relative"
                    style={{ background: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80') center/cover", minHeight: 500 }}>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(0,0,0,.45),rgba(0,0,0,.1))" }} />
                    <div className="position-absolute top-0 start-0 p-4">
                        <span style={{ fontFamily:"'Playfair Display',serif", color:"#fff", fontSize:"1.2rem", fontWeight:700 }}>
                            VisioCreate
                        </span>
                    </div>
                    <div className="position-absolute bottom-0 start-0 p-4">
                        <p style={{ color:"rgba(255,255,255,.7)", fontSize:".82rem", fontStyle:"italic" }}>
                            "Transform every space into something beautiful."
                        </p>
                    </div>
                </div>

                {/*  RIGHT form  */}
                <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
                    <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.9rem", marginBottom:6 }}>
                        Sign In
                    </h2>
                    <p className="text-muted mb-4" style={{ fontSize:".83rem" }}>
                        Don't have an account yet?{" "}
                        <Link to="/register" style={{ color:"#3a7f8c", fontWeight:600, textDecoration:"none" }}>Sign Up</Link>
                    </p>

                    {/* Error — instructor pattern */}
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center gap-2 mb-3">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form — instructor useForm pattern */}
                    <form onSubmit={handleSubmit(sendData)} className="row gy-3">

                        {/* Username */}
                        <div className="col-12">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-regular fa-user me-1 text-muted"></i> Username
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                placeholder="Enter your username"
                                onInput={handleInput}
                                {...register("username", { required: "Username is required" })}
                            />
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>
                                {errors.username?.message}
                            </p>
                        </div>

                        {/* Password */}
                        <div className="col-12">
                            <label className="form-label fw-semibold" style={{ fontSize:".82rem" }}>
                                <i className="fa-solid fa-lock me-1 text-muted"></i> Password
                            </label>
                            <div className="input-group">
                                <input
                                    type={showPw ? "text" : "password"}
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    placeholder="Enter your password"
                                    onInput={handleInput}
                                    {...register("password", { required: "Password is required" })}
                                />
                                <button type="button" className="btn btn-outline-secondary"
                                    onClick={() => setShowPw(v => !v)}>
                                    <i className={`fa-regular ${showPw ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                            <p className="text-danger mt-1 mb-0" style={{ fontSize:".78rem" }}>
                                {errors.password?.message}
                            </p>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe" />
                                <label className="form-check-label text-muted" htmlFor="rememberMe"
                                    style={{ fontSize:".82rem" }}>Remember me</label>
                            </div>
                            <a href="#!" style={{ fontSize:".82rem", fontWeight:700, color:"#1a1a2e", textDecoration:"none" }}>
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <div className="col-12">
                            <button className="btn w-100 text-white py-2 fw-bold"
                                style={{ background:"#3a7f8c", borderRadius:8, fontSize:".9rem" }}
                                disabled={loading}>
                                {loading ? (
                                    <><span className="spinner-border spinner-border-sm me-2" role="status" />Signing in...</>
                                ) : (
                                    <><i className="fa-solid fa-right-to-bracket me-2"></i>Sign In</>
                                )}
                            </button>
                        </div>

                        {/*hint */}
                        <div className="col-12">
                            <div className="alert alert-info d-flex align-items-center gap-2 mb-0 py-2"
                                style={{ fontSize:".77rem" }}>
                                <i className="fa-solid fa-circle-info"></i>
                                <span> username <strong>emilys</strong> / password <strong>emilyspass</strong></span>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
