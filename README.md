# QuickShare - PIN Directed Sharing

QuickShare is a premium, full-stack web application designed for secure, temporary, and seamless sharing of files and text. Built with a modern, dark-themed glassmorphism UI, it enables users to share content using a simple, automatically generated 6-digit PIN.

## 🚀 Key Features

-   **PIN-Based Sharing**: Generate a unique 6-digit PIN for every share. No account required.
-   **Temporary Storage**: Shared content (files and text) automatically expires after 10 minutes.
-   **File Support**: Securely share images, documents, and other file types.
-   **Modern UI**: Sleek, responsive, and interactive interface using React, Tailwind CSS, and Framer Motion.
-   **Security**: Minimal data retention - content is purged after its lifespan.

## 🛠️ Technology Stack

**Frontend:**
-   **React 19**
-   **Vite** (Build Tool)
-   **Tailwind CSS 4** (Styling)
-   **Framer Motion** (Animations)
-   **Lucide React** (Icons)
-   **Axios** (API Requests)

**Backend:**
-   **Node.js & Express**
-   **MongoDB** (via Mongoose)
-   **Multer** (File Handling)
-   **Dotenv** (Environment Management)
-   **CORS** (Cross-Origin Resource Sharing)

## 📦 Installation

To run this project locally, follow these steps:

### Prerequisites
-   Node.js installed
-   MongoDB instance (local or Atlas)

### 1. Clone the repository:
```bash
git clone <your-repository-url>
cd QuickShareWebsite
```

### 2. Backend Setup:
```bash
cd backend
npm install
```
-   Create a `.env` file in the `backend` directory.
-   Add your MongoDB URI:
    ```env
    MONGO_URL=your_mongodb_connection_string
    PORT=5000
    ```
-   Start the server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup:
```bash
cd ../frontend
npm install
npm run dev
```
-   The frontend will be available at `http://localhost:5173`.

## 🛠️ Usage

1.  **To Send**: Upload a file or enter text on the "Send" page.
2.  **Get PIN**: Receive a unique 6-digit PIN.
3.  **To Receive**: Enter the PIN on the "Receive" page on another device.
4.  **Download**: Access the shared content instantly.

## 📄 License
This project is licensed under the ISC License.
