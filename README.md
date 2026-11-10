# Hospital Appointment API

A TypeScript Node.js backend using Prisma ORM 7 to manage hospital appointments, patients, and doctors.

## Tech Stack
- TypeScript
- Prisma ORM 7 (`prisma@7.10.0`, `@prisma/client@7.10.0`)
- PostgreSQL with `@prisma/adapter-pg`
- `tsx` runner

## Project Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create `.env` based on `.env.example`:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/hospital_api?schema=public"
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Seed Database:**
   ```bash
   npm run seed
   # or
   npx prisma db seed
   ```

5. **Run Test Script:**
   ```bash
   npm test
   # or
   npx tsx src/test.ts
   ```

