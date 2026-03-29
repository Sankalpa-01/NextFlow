# NextFlow AI 
**An AI-Powered Visual Workflow Builder**

NextFlow is a full-stack SaaS application that allows users to design, save, and automate AI workflows using a drag-and-drop canvas. It bridges the gap between complex AI prompting and visual logic.

## Key Features

- **Visual Logic Canvas:** Built with `@xyflow/react` (React Flow) for professional-grade node manipulation.
- **AI-Powered Nodes:** Custom Gemini AI nodes with configurable system prompts.
- **Full-Stack Persistence:** Real-time saving and loading of node positions and data via **MongoDB Atlas**.
- **Secure Authentication:** User management and protected routes powered by **Clerk**.
- **Modern UI/UX:** Dark mode support, professional toast notifications (Sonner), and a clean sidebar interface.
- **Server-Side Rendering:** Optimized performance using **Next.js 16** App Router and Server Actions.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ORM)
- **Frontend Canvas:** [React Flow](https://reactflow.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.stevenly.me/)

## Getting Started

### 1. Prerequisites
- Node.js 20+ 
- A MongoDB Atlas account
- A Clerk developer account

### 2. Installation
Clone the repository:
```bash
git clone [https://github.com/your-username/nextflow.git](https://github.com/your-username/nextflow.git)
cd nextflow
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Environment Variables
```Code Snippet
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
MONGODB_URI=mongodb+srv://...

# AI & Automation
GEMINI_API_KEY=...
TRIGGER_SECRET_KEY=tr_dev_...
```

### 5. Run the Development Server
```bash
npm run dev
```

## Project Structure
```
app/ - Next.js App Router (Pages, API routes, and Server Actions).
components/ - React components including the WorkflowCanvas and EditorSidebar.
lib/ - Shared utilities like dbConnect.
models/ - Mongoose schemas for MongoDB.
public/ - Static assets and icons.
```

