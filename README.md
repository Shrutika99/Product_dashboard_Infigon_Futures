🛍️ Product Explorer Dashboard

A production-style Product Explorer Dashboard built using Next.js (App Router), TypeScript, and Tailwind CSS.
This project demonstrates clean component architecture, server-client data handling, filtering, dynamic routing, state persistence, and a fully responsive UI.
🚀 Live Demo

🔗 Live URL:
https://infigonproject.netlify.app/

📌 Tech Stack

Next.js

React

TypeScript

Tailwind CSS

Fake Store API
https://fakestoreapi.com

Netlify (Deployment)

🎯 Features Implemented
1️⃣ Product Listing Page

Fetches product data from a public API

Displays products in a responsive grid layout

Each product card includes:

Product image

Title

Category

Price

Favorite (❤️) toggle

Proper handling of:

Loading states

2️⃣ Search & Filtering

Client-side search by product title

Category filtering using chip-style buttons

Favorites-only filter

Case-insensitive filtering

Clean, intuitive user experience
3️⃣ Product Details Page

Dynamic route: /products/[id]

Displays:

Large optimized product image

Title

Description

Price

Category

Built using Next.js dynamic routing

Includes a Back button for easy navigation

Graceful handling of:

Invalid product IDs

Missing data (404 fallback)
Favorites Feature

Users can mark / unmark products as favorites

Favorites:

Persist using localStorage

Update instantly in the UI

State handling avoids hydration issues between server and client

5️⃣ Dark Mode

Light / Dark theme toggle

Theme preference persisted in localStorage

Applies globally across the app

Smooth transitions with proper contrast

Enhanced card styling in dark mode
6️⃣ Responsive Design

Mobile-first approach

Fully responsive across:

Mobile

Tablet

Desktop

Built using Tailwind Grid & Flex utilities

Empty states

API errors
