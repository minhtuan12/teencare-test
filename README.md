# TeenCare LMS Mini App

## Overview

A mini web app for managing students, parents, classes, and subscriptions. Built with Next.js (frontend + backend API) and MongoDB. Includes Docker-based CI/CD and a simple React UI.

## Features

- Manage Parents, Students, Classes, Class Registrations, and Subscriptions
- RESTful API endpoints for all main operations
- Simple UI for creating parents/students, viewing classes, and registering students
- Dockerized for easy deployment

## Database Schema

- **Parents**: id, name, phone, email
- **Students**: id, name, dob, gender, current_grade, parent_id
- **Classes**: id, name, subject, day_of_week, time_slot, teacher_name, max_students
- **ClassRegistrations**: class_id, student_id
- **Subscriptions**: id, student_id, package_name, start_date, end_date, total_sessions, used_sessions

## API Endpoints (JSON)

- `POST /api/parents` – create parent
- `GET /api/parents/{id}` – get parent details
- `POST /api/students` – create student (with parent_id)
- `GET /api/students/{id}` – get student details (with parent info)
- `POST /api/classes` – create class
- `GET /api/classes?day={weekday}` – list classes by day
- `POST /api/classes/{class_id}/register` – register student to class (with checks)
- `DELETE /api/registrations/{id}` – cancel registration (with session refund logic)
- `POST /api/subscriptions` – create subscription
- `PATCH /api/subscriptions/{id}/use` – mark session used
- `GET /api/subscriptions/{id}` – get subscription status

## Setup (Docker)

1. Copy `.env.example` to `.env` and fill in values
2. Run: `docker-compose up --build`
3. App runs at `http://localhost:4000`

## Example Seed Data

- 2 parents, 3 students, 2–3 classes (see `seed.ts`)

## License

MIT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `app/route.ts`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [route.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/route).
