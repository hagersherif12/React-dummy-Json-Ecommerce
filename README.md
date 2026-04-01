# VisioCreate 🛋️

A modern **Gift & Decoration Store** web application built with React, Bootstrap 5, and the DummyJSON API.

---

## 🖥️ Live Demo

> Run locally with the steps below. Demo credentials:
> - **Username:** `emilys`
> - **Password:** `emilyspass`

---

## 📸 Pages Overview

| Page | Route | Protected |
|---|---|---|
| Home | `/` | ❌ |
| Shop | `/products` | ❌ |
| Product Detail | `/products/:id` | ✅ Login required |
| Login | `/login` | ❌ |
| Register | `/register` | ❌ |
| Profile | `/profile` | ✅ Login required |
| Contact | `/contact` | ❌ |
| 404 Not Found | `*` | ❌ |

---

## 🚀 Getting Started

### 1. Clone or unzip the project

```bash
unzip VisioCreate_Project.zip
cd visiocreate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in your browser

```
http://localhost:5173
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2.0 | UI Library |
| **Vite** | 5.1.0 | Build tool & dev server |
| **React Router DOM** | 6.22.1 | Client-side routing |
| **Bootstrap** | 5.3.2 | CSS framework & components |
| **Axios** | 1.6.7 | HTTP requests to API |
| **React Hook Form** | 7.50.1 | Form validation |
| **Font Awesome** | 6.5.1 | Icons (via CDN) |
| **DummyJSON** | — | Free REST API for products & auth |

---

## 📁 Project Structure

```
visiocreate/
├── index.html                  ← Entry HTML (Font Awesome CDN here)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                ← React root entry point
    ├── App.jsx                 ← RouterProvider + ProviderContext
    ├── App.css                 ← Global styles + Google Fonts
    │
    ├── api/
    │   └── axios.jsx           ← Axios instance + request interceptor (token)
    │
    ├── context/
    │   ├── context.jsx         ← createContext (DataContext)
    │   └── providerContext.jsx ← token, userData state shared globally
    │
    ├── Router/
    │   └── router.jsx          ← createBrowserRouter with all routes
    │
    ├── Layout/
    │   └── Layout.jsx          ← TopBanner + Navbar + <Outlet/> + Footer
    │
    ├── shared/
    │   ├── Navbar.jsx          ← Sticky navbar, auth state, active links
    │   ├── Footer.jsx          ← Footer with links, social icons, contact info
    │   ├── TopBanner.jsx       ← Dismissable promo banner
    │   └── ProtectedRoute.jsx  ← Redirects to /login if no token
    │
    └── pages/
        ├── Home.jsx            ← Hero, categories, new arrivals, trust bar, articles
        ├── Products.jsx        ← Shop grid with filter, search, sort, pagination
        ├── SingleProduct.jsx   ← Product detail, gallery, countdown, tabs, reviews
        ├── Login.jsx           ← Sign in form with useForm + API auth
        ├── Register.jsx        ← Register form with validation
        ├── Profile.jsx         ← User profile (protected)
        ├── Contact.jsx         ← Contact form with useForm
        └── NotFound.jsx        ← 404 page
```

---

## 🔌 API Integration

All API calls use **[DummyJSON](https://dummyjson.com/)** — a free fake REST API.

### Base URL
```
https://dummyjson.com/
```

### Endpoints Used

| Method | Endpoint | Used In | Description |
|---|---|---|---|
| `GET` | `/products?limit=5` | Home | New arrivals section |
| `GET` | `/products?limit=100` | Products | Full shop grid |
| `GET` | `/products/:id` | SingleProduct | Product detail page |
| `POST` | `/auth/login` | Login | Authenticate user, get token |
| `POST` | `/users/add` | Register | Create new user |

### Where to paste your own API URL

Open `src/api/axios.jsx`:

```jsx
const api = axios.create({
    baseURL: "https://dummyjson.com/"  // 📌 Replace with your API base URL
})
```

### Token Interceptor

The Axios interceptor automatically attaches the token to every request:

```jsx
api.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})
```

---

## 🔐 Authentication Flow

```
User fills Login form
        ↓
useForm validates fields
        ↓
POST /auth/login  →  token + user data returned
        ↓
token saved to localStorage + Context (setToken)
userData saved to localStorage + Context (setUserData)
        ↓
navigate("/products")
        ↓
ProtectedRoute checks Context token → allows access
```

**Logout** clears `localStorage` and resets Context state.

---

## 🗂️ State Management

Global state is managed with **React Context API** (no Redux needed).

```jsx
// Available everywhere via useContext(DataContext)
{
    token,       // JWT token string or null
    setToken,    // update token
    userData,    // { name, email, image }
    setUserData  // update user data
}
```

---

## 🛡️ Protected Routes

The `ProtectedRoute` component wraps any route that requires login:

```jsx
{
    path: "products/:productID",
    element: (
        <ProtectedRoute>
            <SingleProduct />
        </ProtectedRoute>
    )
}
```

If the user is **not logged in**, they are redirected to `/login` automatically.

---

## ✅ Form Validation (React Hook Form)

All forms use the **`useForm`** hook pattern from `react-hook-form`:

```jsx
const { register, handleSubmit, formState: { errors } } = useForm()

<input
    className="form-control"
    {...register("username", {
        required: "Username is required",
        minLength: { value: 3, message: "Min 3 characters" }
    })}
/>
<p className="text-danger">{errors.username?.message}</p>
```

### Validation Rules Used

| Rule | Example |
|---|---|
| `required` | All fields |
| `minLength` | Name ≥ 3, Password ≥ 6 |
| `maxLength` | Username ≤ 20 |
| `pattern` | Email format `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| `validate` | Confirm password must match password |

---

## 🎨 Styling

- **Bootstrap 5** — grid system, cards, buttons, forms, badges, alerts, spinners
- **Font Awesome 6** — all icons via CDN in `index.html`
- **Google Fonts** — `Playfair Display` (headings) + `DM Sans` (body)
- Custom inline styles for brand colors and unique UI details

### Brand Colors

```css
--teal:      #3a7f8c   /* Primary */
--teal-dark: #2d6570   /* Hover state */
--gold:      #c9a84c   /* Accents & stars */
--text-dark: #1a1a2e   /* Headings */
--bg-light:  #f7f6f3   /* Card backgrounds */
```

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production (output in /dist)
npm run preview  # Preview production build locally
```

---

## 👨‍💻 Development Notes

- Products on the **Home** page are limited to 5 (`?limit=5`)
- Products on the **Shop** page load up to 100 and support client-side filter + sort
- **Show more** button on the Shop page reveals 8 additional products per click
- The **countdown timer** on the Product Detail page ticks live in real time
- The **Add to Cart** button on the Product Detail page shows a success alert (cart page not implemented by design)
- All forms clear the error message on new input (`onInput={handleInput}`)

---

## 🔗 Useful Links

- [DummyJSON Docs](https://dummyjson.com/docs)
- [React Router DOM Docs](https://reactrouter.com/en/main)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Axios Docs](https://axios-http.com/docs/intro)

---

## 🙌 Credits

- Product data & authentication — [DummyJSON](https://dummyjson.com/)
- Product images — [Unsplash](https://unsplash.com/)
- Icons — [Font Awesome](https://fontawesome.com/)
- Fonts — [Google Fonts](https://fonts.google.com/)
