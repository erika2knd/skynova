# Skynova

Skynova is a **demo marketplace for Counter-Strike skins**, created as a **portfolio pet project** to showcase frontend architecture, UI/UX design, and modern authentication flows.

The project focuses on realistic product behavior while clearly remaining a demo (no real payments or trading).

## Live Demo

https://skynova-dusky.vercel.app/

---

## Features

- Marketplace with dynamic product pages
- Product details with similar items
- Wishlist functionality (auth-protected)
- Cart functionality (auth-protected)
- User authentication (Supabase Auth)
- Login / Sign up flows with redirects
- Clean 404 page and legal pages (Terms, Privacy, Cookies)
- Responsive design (desktop & mobile)

---

## Authentication

Authentication is implemented using **Supabase Auth**:

- Email & password sign up
- Email & password login
- Protected actions (wishlist, cart)
- Redirect to login when user is not authenticated
- Session handling on client side

⚠️ This is a demo project — no real user data, payments, or orders are processed.

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + database)
- **Vercel** (deployment)

---

## Project Status

This project is considered **feature-complete as a portfolio demo**.

Possible future improvements:

- Checkout flow (demo)
- User profile page
- Order history (mock data)
- Cookie consent banner (if analytics added)

---

## Disclaimer

Skynova is a **pet / portfolio project** created for learning and demonstration purposes only.

- No real payments
- No real marketplace trading
- No commercial use

---

## Author

Built by **[Erika Kondratjeva / GitHub username: erika2knd]**
