# SkillBridge 🎓

SkillBridge is a full-stack web application that connects learners with expert tutors. Students can browse tutor profiles, view availability, and book sessions instantly. Tutors can manage their profiles, set availability, and track their teaching sessions. Admins oversee the platform and manage users.
**Connect with Expert Tutors, Learn Anything**

---

## 🌐 Live Website

- https://skill-bridge-client-olive.vercel.app/

## 🗂 Frontend Repository

- https://github.com/abdulbariks/SkillBridge-Client

## 🔗 Backend API

- https://skill-bridge-server-mu.vercel.app

## 🗂 Backend Repository

- https://github.com/abdulbariks/SkillBridge-Server

---

## 📌 Project Overview

SkillBridge is a full-stack tutoring platform that connects learners with expert tutors.  
This repository contains the **frontend application**, built with **Next.js**, delivering a fast, responsive, and user-friendly experience for students, tutors, and admins.

---

## 👥 Roles & Permissions

| Role | Description | Key Permissions |
|------|-------------|----------------|
| **Student** | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews, manage profile |
| **Tutor** | Experts offering tutoring services | Create profile, set availability, view bookings |
| **Admin** | Platform managers | Manage users, categories, and bookings |

> 💡 Users choose their role during registration. Admin accounts are managed from the backend.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI**
- **TanStack Form**
- **Zod** (validation)
- **Better Auth (Client)**
- **Redux Toolkit**
- **Fetch API**

---

## ✨ Features

### 🌍 Public Features

- Browse tutors with filters
- View tutor profiles with reviews
- Search by category, rating, and price
- Landing page with featured tutors

### 👨‍🎓 Student Features

- Register & login
- Book tutoring sessions
- View upcoming & past bookings
- Leave reviews
- Manage profile

### 👨‍🏫 Tutor Features

- Register & login
- Create & update tutor profile
- Set availability slots
- View teaching sessions
- See ratings & reviews

### 🛡 Admin Features

- View all users
- Ban / unban users
- Manage categories
- View all bookings

---

## 🧭 Pages & Routes

> ⚠️ Routes may change based on implementation.

### Public Routes

| Route | Description |
|------|-------------|
| `/` | Home |
| `/tutors` | Browse tutors |
| `/tutors/[id]` | Tutor profile |
| `/login` | Login |
| `/register` | Register |

### Student Routes (Protected)

| Route | Description |
|------|-------------|
| `/dashboard` | Student dashboard |
| `/dashboard/bookings` | My bookings |
| `/dashboard/profile` | Profile settings |

### Tutor Routes (Protected)

| Route | Description |
|------|-------------|
| `/tutor/dashboard` | Tutor dashboard |
| `/tutor/profile` | Tutor profile |
| `/tutor/availability` | Availability management |

### Admin Routes (Protected)

| Route | Description |
|------|-------------|
| `/admin` | Admin dashboard |
| `/admin/users` | Manage users |
| `/admin/bookings` | View bookings |
| `/admin/categories` | Manage categories |

---

## 📁 Project Structure

```ts
app/
├── (auth)/
│   ├── login/
│   ├── register/
├── (public)/
│   ├── tutors/
│   ├── tutors/[id]/
├── dashboard/
├── tutor/
├── admin/
├── layout.tsx
├── page.tsx
components/
├── ui/
├── common/
├── forms/
lib/
├── auth-client.ts
├── api.ts
redux/
├── store.ts
├── features/
styles/
```

```ts
git clone https://github.com/abdulbariks/SkillBridge-Client
cd SkillBridge-Client
pnpm install
```

## Environment Variables

```ts
BACKEND_URL="BACKEND_URL"
FRONTEND_URL="FRONTEND_URL"
```

```ts
pnpm run dev
```

