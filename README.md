# 📘 LMS - React Based E-Learning App

This is a **React** frontend for an educational web platform that supports **user authentication, course management, admin dashboard, payment integration**, and **role-based route protection**.

## 🚀 Features

- 🌐 Public pages: Home, About, Contact, Course Listings
- 🔐 Authentication: Login & Sign-Up
- 👤 User Profile: View and edit profile
- 🧑‍🏫 Admin Features:
  - Create courses
  - Add lectures
  - Access to admin dashboard
- 📺 Lecture Display
- 💳 Payment flow:
  - Checkout
  - Success & Failure handling
- 🔒 Role-based routing using `RequireAuth`
- 🔄 Fallback `404 Not Found` route
- ✅ React Router v6

---

## 🗂️ Project Structure
src/

├── Components/

 └── Auth/
│ 
└── AuthFile.jsx # Role-based route guard (RequireAuth)

├── Pages/
 
├── Course/

 ├── CourseList.jsx

 ├── CreateCrourse.jsx
  
  └── CourseDescription.jsx

 ├── DashBoard/

 ├── AdminDashboard.jsx

 ├── AddLectures.jsx
  
  └── Displaylectures.jsx

 ├── Payment/
  
  ├── Checkout.jsx

   ├── CheckoutSuccess.jsx
     └── CheckoutFailure.jsx
  
  ├── User/
  
  ├── Profile.jsx
  
   └── EditProfile.jsx

├── HomePage.jsx

├── AboutUs.jsx

├── ContactUs.jsx

├── Login.jsx

├── SignUp.jsx

├── DeniedPage.jsx

 └── NotFound.jsx

├── App.jsx # Route configuration

└── App.css



---

## 🔐 Role-Based Routes

### Protected by `RequireAuth`:

| Role(s)         | Protected Routes                                  |
|----------------|---------------------------------------------------|
| `ADMIN`        | `/course/create`, `/course/addlecture`, `/admin/dashboard` |
| `USER`, `ADMIN`| `/user/profile`, `/user/editprofile`, `/checkout`, `/checkout/success`, `/checkout/fail`, `/course/displaylecture` |

---

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Mayanks08/LMS-Project
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

🔗 Dependencies
react-router-dom

vite

react

tailwindcss (if styling is applied)
