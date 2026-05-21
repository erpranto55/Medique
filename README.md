# MediQueue – Tutor Booking System

MediQueue is a modern Tutor Booking Platform where students can easily browse tutors, book learning sessions, and manage their booked classes efficiently. <br>
The platform simplifies tutor scheduling with secure authentication, smart booking management, and responsive modern UI.<br>

---

## Live Website

🔗 Live Site: https://medique-ashy.vercel.app

---

## Features

- JWT Authentication with Firebase Login & Google Login<br>
- Add, Update, and Delete Tutor Functionality<br>
- Tutor Booking System with Slot Management<br>
- Cancel Booking Feature with Status Update<br>
- Dark & Light Theme Toggle<br>
- Search Tutors by Name with Case-Insensitive Search<br>
- Filter Tutors by Session Date Range<br>
- User Profile Section with Edit Profile Feature<br>
- Loading Spinner & Toast Notifications for Better UX<br>
- Fully Responsive Design for Mobile, Tablet & Desktop<br>

---

## Technologies Used

### Frontend

<br>
- Next.js<br>
- React.js<br>
- Tailwind CSS<br>
- DaisyUI<br>
- HeroUI<br>
- Firebase Authentication<br>
- React Toastify<br>
- SweetAlert2<br>

### Backend

- Node.js<br>
- Express.js<br>
- MongoDB<br>
- JWT Authentication<br>
- CORS<br>
- dotenv<br>

---

## Main Functionalities

### Authentication

- Email & Password Login/Register<br>
- Google Authentication<br>
- JWT Token Based Authorization<br>
- Protected Private Routes<br>

### Tutor Management

- Add Tutor<br>
- Update Tutor<br>
- Delete Tutor<br>
- View Personal Tutors<br>

### Booking System

- Book Tutor Sessions<br>
- Auto Slot Decrease After Booking<br>
- Booking Status Management<br>
- Cancel Booking Feature<br>
- Booking Restrictions Based on Slot & Date<br>

### UI/UX Features

- Dynamic Page Titles<br>
- Active Navbar Route<br>
- Profile Dropdown<br>
- Responsive Layout<br>
- Toast & Sweet Alerts<br>
- Loading Spinner<br>
- 404 Page<br>

---

### Client Side Repository

🔗 https://github.com/erpranto55/Medique

### Server Side Repository

🔗 https://github.com/erpranto55/medique-server

---

## Environment Variables

### Client `.env.local`

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Server `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## Run Locally

### Client

```bash
npm install
npm run dev
```

### Server

```bash
npm install
nodemon index.js
```

---

## Developer

### ER Pranto

Frontend & Backend Developer

[Portfolio](https://erpranto.vercel.app/)<br>
[LinkedIn](https://www.linkedin.com/in/erpranto55/)<br>

---

## License

This project is created for educational purposes only.
