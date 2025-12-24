# Career Dashboard

### 1. Overview

This project is a Job board Dashboard where an admin can add job post, see all applicent and hire or reject them and an applicent can see all job post and can apply based on below constrant.

1.1 Constrant : 

● Each applicant can only apply once per job

● No more than 5 candidates should be allowed to apply for a specific job

● Candidates should not be allowed to apply for more than 5 jobs within 24 hours.(If let’s say an application is rejected, that should not be considered in the limit,e.g. Candidates applied for 5 jobs, but one of them got rejected, now they should be allowed to apply to one more.)

● Candidates should not be allowed to apply for the job without contact information (email and phone number)

● Candidates should not be allowed to apply if a job posting has 10 active applications.

1.2 Extra Edge Case : 

● Add a status attribute to the application to track if the applicant is hired or rejected, ensuring that the data persists and the applicant cannot apply again.

##

### 2. Tech Stack

Frontend : Next.js, Typescript, TailwindCSS.

Backend : Node.js, Express.js, Typescript

Database : PostgreSQL

Deployment : Local

Other : Axios, Recoil (State Management), Prisma (ORM)

##

### 3 Query Handling Approach

#### 3.1 Paging Implementation
My approach is to dynamically pass pagination parameters (page and limit) from the frontend to the backend via URL query strings. On the backend, I calculate the skip value (offset) based on the requested page. These parameters are then passed to the Prisma findMany method to execute a paginated query. Simultaneously, I use a count query to retrieve the total number of records, allowing the backend to return the total page count and navigation metadata (hasMore) alongside the results.
```
limit = 10
let page = 1

skip = (page - 1) * limit

Ex1 : page = 1 => skip = 0
Ex2 : page = 2 => skip = 10
Ex3 : page = 3 => skip = 20
```

##

### 4. Setup Instructions (Locally)

#### 4.1. Frontend : 
```
cd frontend


# create .env file
touch .env

# then place the base backend url
NEXT_PUBLIC_BACKEND_URL=http://localhost:3012


# Install dependencies
npm i

# Run the application (default: port 3000)
npm run dev

```

#### 4.2. Backend : 

```
cd backend


# create .env file
touch .env

# then use the below port number and jwt secrate
PORT=3012
JWT_SECRET="DevIsTheAdmin"

# use the below admin credential
ADMIN_EMAIL="dev@gmail.com"
ADMIN_PASSWORD="123456"

#place the database and prisma accelerator url
DATABASE_URL=
ACCELERATE_URL=



# Install dependencies
npm i

# Create table (only first time)
npx prisma migrate dev --name initialize-schema

# create prisma client
npx prisma generate

# build dist
npx tsc -b

# Start the application

# With nodemon (recommended for development)
npm run dev

######### OR ###############

# Without nodemon
node dist/server.js

# To see table (in backend directory => /backend)
npx prisma studio

```

### 6 Database Model

<img width="880" height="315" alt="Screenshot 2025-12-24 at 11 27 17 PM" src="https://github.com/user-attachments/assets/d53c7b25-6d65-4208-b74b-31c744cd878b" />

### 7 Folder Structure
```

├── backend/                                # Backend (Node.js + Express)
|   ├── prisma/
|   |   └── schema.prisma                   #schemas / DB models
|   |
│   ├── src/  
│   │   ├── controllers/                    # Route handlers
│   │   ├── lib/                            # prisma client inside the src
│   │   ├── middleware/                     # authorization midilware
│   │   ├── repository/                     # Database queries & repository layer
│   │   ├── routes/                         # API routes
│   │   ├── services/                       # Business logic
│   │   ├── types/                          # Type and interface
│   │   ├── utils/                          # Helper utilities
│   │   ├── validators/                     # Zod Validator schema
│   │   ├── app.ts                          # pass use middleware (cors, express.json(), express.urlencoded)
│   │   └── server.js                       # Entry point of backend server
|   |
│   ├── uploads                             # multer upload resume and coverLetters here
│   |   ├── coverLetters/                   
│   |   └── resumes/
|   |
│   ├── package.json                        # Backend dependencies & scripts
│   ├── package-lock.json
│   ├── prisma.config.d.ts
│   ├── prisma.config.d.ts.map
│   ├── prisma.config.d.js.map
│   ├── prisma.config.ts
│   ├── prisma.config.js
│   ├── tsconfig.json
│   └── tsconfig.tsbuilinfo
│
├── frontend/                                # Frontend (Next.js 14+ App Router)
│   ├── app/                                 # Next.js App Directory
│   │   ├── (auth)/                          # Authentication routes (Login/Register)
│   │   ├── 404/                             # Custom Not Found page
│   │   ├── Application/                     # Application tracking & management pages
│   │   ├── Job/                             # Job listing & detailed view pages
│   │   ├── JobForm/                         # Form for creating/editing jobs
│   │   ├── globals.css                      # Global Tailwind and CSS styles
│   │   ├── layout.tsx                       # Root Layout (Navbar/Footer/Providers)
│   │   └── page.tsx                         # Homepage / Landing page
│   │
│   ├── components/                          # Reusable UI components (Buttons, Cards, Inputs)
│   ├── public/                              # Static assets (Favicons, images)
│   ├── state/                               # Global state management (Recoil Atoms/Selectors)
│   │
│   ├── .env                                 # Environment variables (API URLs)
│   ├── Dockerfile                           # Frontend containerization
│   ├── next.config.mjs                      # Next.js configuration
│   ├── tailwind.config.ts                   # Tailwind CSS theme configuration
│   ├── tsconfig.json                        # TypeScript configuration
│   └── package.json                         # Frontend dependencies & scripts
│
└── README.md                               # Main project documentation


```
