# Sensei

**Sensei** is a comprehensive online learning platform designed to provide an engaging and interactive learning experience. Built with modern technologies, Sensei allows students to explore courses, track progress, and engage with a vibrant learning community. The platform aims to make learning intuitive, accessible, and enjoyable for users of all levels.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

Sensei provides a variety of features to enhance the online learning experience:

- **User Authentication:** Secure login and registration system.
- **Course Exploration:** Browse courses by category and skill level.
- **Learning Dashboard:** Track your learning progress and continue courses where you left off.
- **Interactive Community:** Engage with other learners via posts, comments, and discussions.
- **Career and RoadMap:** A detailed gudide on various carrer with its roadmap.
- **Recommendations:** Personalized course suggestions based on interests and activity.
- **Responsive Design:** Fully responsive, works seamlessly on mobile, tablet, and desktop.
- **Dark/Light Mode:** Toggle between dark and light themes for comfortable viewing.
- **Seller Panel:** Manage courses, users, and content.
- **Admin Panel :** Manage blog and add new blogs.

---

## Screenshots

<img width="1892" height="914" alt="image" src="https://github.com/user-attachments/assets/dfaaa6c5-305b-4da4-92cf-0d8c8e4db8e2" />
<img width="1889" height="911" alt="image" src="https://github.com/user-attachments/assets/8c3e8816-a58d-4a01-af2f-ad837ed46761" />
<img width="1913" height="899" alt="image" src="https://github.com/user-attachments/assets/1e89741e-0786-4544-b95a-be75d5df7569" />
<img width="1893" height="902" alt="image" src="https://github.com/user-attachments/assets/37be3c5c-49a6-455a-bbd7-27cb544aa3a7" />
<img width="1885" height="907" alt="image" src="https://github.com/user-attachments/assets/75d18a06-ffc3-4830-a76f-912539106bff" />
<img width="1885" height="907" alt="image" src="https://github.com/user-attachments/assets/20f174b5-2148-4d4c-8c12-2b98384c1402" />
<img width="1897" height="904" alt="image" src="https://github.com/user-attachments/assets/b194ba01-d349-4462-b664-4ad1f7b70765" />









---

## Technology Stack

**Frontend:**
- React.js (with Vite)
- Tailwind CSS
- Framer Motion (for animations)
- React Router (for navigation)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (for image uploads)
- Bcrypt (for password hashing)

**Deployment:**
- Vercel (Frontend)
- Render(Backend)

---

## Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sensei.git
   cd sensei
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory:

   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start backend server:**
   ```bash
   npm run dev
   ```

5. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

6. **Set up frontend environment variables:**

   Create a `.env` file in the `client` directory:

   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

7. **Start frontend development server:**
   ```bash
   npm run dev
   ```

8. **Access the application:**

   Open your browser and navigate to `http://localhost:5173` (or as displayed in your terminal).

---

## Project Structure

```text
sensei/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Application pages
│   │   ├── assets/          # Images, icons, fonts
│   │   └── App.jsx
├── server/                  # Node.js backend
│   ├── controllers/         # API logic
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Authentication & error handling
│   └── server.js
├── README.md
└── package.json
```

---

## Usage

- Browse and enroll in courses.
- Track your progress through your personalized dashboard.
- Participate in the community by posting, commenting, and interacting with other learners.
- Admins can manage courses, users, and content via the admin panel.
- Toggle between dark/light mode for improved usability.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
5. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
6. Open a Pull Request.

Please ensure your code follows the existing project structure and naming conventions.

---


## Contact

**Author:** Miraj K.C.
**GitHub:** [https://github.com/yourusername](https://github.com/mirajkc)

