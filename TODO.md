- [ ] Create comprehensive README.md for Tripzy-Ai app
+# Tripzy-Ai
 
+[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)](https://nextjs.org/)
\ No newline at end of file
+[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
+[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
+[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue)](https://tailwindcss.com/)
+[![MongoDB](https://img.shields.io/badge/MongoDB-8.18.0-green)](https://www.mongodb.com/)
+[![Clerk](https://img.shields.io/badge/Clerk-6.31.6-orange)](https://clerk.com/)
+[![LangChain](https://img.shields.io/badge/LangChain-0.3.73-red)](https://www.langchain.com/)
+[![Three.js](https://img.shields.io/badge/Three.js-0.180.0-lightgrey)](https://threejs.org/)
 
-https://tripzy-ai.vercel.app/
+Your personalized AI Trip Planner powered by Google Gemini.
+
+[Live Demo](https://tripzy-ai.vercel.app/)
+
+## Features
+
+- **AI-Powered Trip Planning**: Leverage Google Gemini to generate comprehensive trip plans including flights, hotels, itineraries, and more.
+- **Interactive Chatbot**: Engage with an AI chatbot for personalized trip recommendations and planning assistance.
+- **User Authentication**: Secure user authentication and management with Clerk.
+- **Trip Management**: Create, save, and manage your trips with MongoDB integration.
+- **3D Globe Visualization**: Explore destinations with an interactive 3D globe powered by Three.js.
+- **Dark Mode Support**: Toggle between light and dark themes for a comfortable viewing experience.
+- **Responsive Design**: Optimized for desktop and mobile devices.
+- **Rate Limiting**: Prevent abuse with Arcjet rate limiting.
+
+## Tech Stack
+
+- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
+- **Backend**: Next.js API Routes
+- **AI**: LangChain, Google Gemini (Gemini 2.0 Flash)
+- **Database**: MongoDB with Mongoose
+- **Authentication**: Clerk
+- **3D Graphics**: Three.js, React Three Fiber
+- **Rate Limiting**: Arcjet
+- **Deployment**: Vercel
+
+## Prerequisites
+
+- Node.js 18+
+- MongoDB database
+- Google Gemini API key
+- Clerk account for authentication
+
+## Installation
+
+1. Clone the repository:
+   ```bash
+   git clone https://github.com/your-username/tripzy-ai.git
+   cd tripzy-ai
+   ```
+
+2. Install dependencies:
+   ```bash
+   npm install
+   ```
+
+3. Set up environment variables:
+   Create a `.env.local` file in the root directory and add the following:
+   ```env
+   MONGODB_URI=your_mongodb_connection_string
+   GOOGLE_API_KEY=your_google_gemini_api_key
+   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
+   CLERK_SECRET_KEY=your_clerk_secret_key
+   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
+   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
+   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
+   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
+   ```
+
+4. Run the development server:
+   ```bash
+   npm run dev
+   ```
+
+5. Open [http://localhost:3000](http://localhost:3000) in your browser.
+
+## Usage
+
+1. Sign up or sign in using Clerk authentication.
+2. On the homepage, enter your trip preferences in the text area or select from suggested prompts.
+3. Click "Get Started" to begin planning your trip.
+4. Interact with the AI chatbot to refine your trip details.
+5. Once satisfied, the AI will generate a complete trip plan and save it to your account.
+6. View and manage your saved trips.
+
+## API
+
+### AI Trip Planning Endpoint
+
+- **URL**: `/api/ai`
+- **Method**: POST
+- **Body**:
+  ```json
+  {
+    "messages": ["Your trip planning message"],
+    "sessionId": "unique_session_id",
+    "isFinal": false
+  }
+  ```
+- **Response**: JSON object containing AI-generated trip planning response
+
+## Deployment
+
+### Vercel
+
+1. Connect your GitHub repository to Vercel.
+2. Add environment variables in Vercel dashboard.
+3. Deploy the application.
+
+## Contributing
+
+1. Fork the repository.
+2. Create a feature branch: `git checkout -b feature/your-feature-name`
+3. Commit your changes: `git commit -m 'Add some feature'`
+4. Push to the branch: `git push origin feature/your-feature-name`
+5. Open a pull request.
+
+## License
+
+This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
+
+## Acknowledgments
+
+- Google Gemini for AI capabilities
+- Clerk for authentication
+- Three.js community for 3D graphics
+- All contributors and open-source libraries used

 