# Taskly

### https://taskly-chi-one.vercel.app/

A **React + Supabase** project manager app to organize your projects and tasks.  
Supports user authentication, project/task management, and user-specific data.

## Features

- Signup & Login (Supabase Auth)
- Create, view, update, and delete projects
- Add tasks to projects
- Responsive and clean UI with GIF background
- User menu with sign out

## Tech Stack

- **Frontend:** React, TailwindCSS, React Router
- **Backend:** Supabase (Auth + Postgres)
- **Deployment:** Vercel

## Setup Locally

```bash
git clone https://github.com/anuragbhonsle/Taskly.git
cd TasklyV
npm install
cp .env.example .env
# Fill in your Supabase URL & ANON key
npm run dev
```
