# Tandem Repeats Lab — Sokol Lab Website

A full-stack web application for Dr. Dina Sokol's Tandem Repeat Laboratory at Brooklyn College. Users can submit DNA sequences to detect tandem repeats using the TRED 2.0 algorithm, view results in a table and alignment format, and download output files.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MySQL (via `mysql2`)
- **Algorithm**: TRED 2.0 — C++ tandem repeat detection tool by Dr. Dina Sokol

---

## Prerequisites

- Node.js 18+
- MySQL 8.0
- A C++ compiler (g++) — only needed if recompiling the backend

---

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd tandem_site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=tandem
```

### 4. Set up the database

Start MySQL, then run:

```bash
mysql -u your_mysql_user -p
```

Once connected:

```sql
CREATE DATABASE IF NOT EXISTS tandem;
USE tandem;
source sql/tandem.sql
EXIT;
```

### 5. Compile the backend (Windows)

The TRED executables must be compiled before the app can run analyses. From the `backend/` folder:

```bash
cd backend
g++ -c -g main.cpp buildk.cpp tracek.cpp errorsarray.cpp printcompact.cpp createarray.cpp oneiteration.cpp
g++ -g -o tred.exe main.o buildk.o tracek.o errorsarray.o printcompact.o createarray.o oneiteration.o
g++ -g -o filter.exe filter.cpp
g++ -g -o nofilter.exe nofilter.cpp
```

> **Note:** On Linux, omit the `.exe` extension and update the executable paths in `app/upload/upload-action.tsx` accordingly.

### 6. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
tandem_site/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── upload/
│   │   ├── page.tsx              # Run Program page
│   │   └── upload-action.tsx     # Server actions — runs TRED pipeline
│   └── api/
│       └── run-sequence/route.ts # Legacy API route (unused)
├── backend/                      # TRED 2.0 C++ source + compiled executables
├── components/                   # UI components
├── lib/
│   └── db.ts                     # MySQL connection config
├── sql/
│   └── tandem.sql                # Database schema
└── .env.local                    # Environment variables (not committed)
```

---

## How the Analysis Pipeline Works

1. User submits a DNA sequence (paste or `.txt` file upload) on the Run Program page.
2. The server action in `upload-action.tsx` validates the input (A/T/C/G only, min 20 characters, max 5MB).
3. The sequence is saved to the `dna_sequence` table in MySQL.
4. The sequence is written to a temporary file.
5. `tred.exe` runs on the temp file and produces an intermediary file.
6. `filter.exe` processes the intermediary file and produces a results table and alignment file.
7. Results are read, temp files are deleted, and output is returned to the browser.
8. The user can view results on screen or download them as `.dat` / `.txt` files.

---

## Database Schema

**`dna_sequence`** — submitted sequences

| Column | Type | Notes |
|--------|------|-------|
| id | INT | Auto-increment primary key |
| dna | VARCHAR(255) | The submitted DNA sequence |

**`data`** — analysis results

| Column | Type |
|--------|------|
| start, end | INT |
| lenght, period | INT |
| copies | FLOAT |
| errors, mathes | INT |
| percent | FLOAT |
| id | INT |
| sdata, edata | CHAR(60) |

**`inputdesc`** — input descriptor (reserved for future use)

| Column | Type |
|--------|------|
| id | INT |

---

## TRED Parameters

TRED parameters are set at compile time in `backend/parameters.h`. To change them, edit the file and recompile.

| Parameter | Default | Description |
|-----------|---------|-------------|
| MAX_ERRORS | 10 | Max errors allowed between repeat periods |
| MIN_LENGTH | 20 | Minimum repeat length to report |
| MIN_RATING | 15 | Minimum quality score |
| MIN_PERIOD | 1 | Minimum period length |
| MAX_PERIOD | 250 | Maximum detectable period size |
| ERROR_VAL | 3 | Error penalty weight |

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Notes

- The TRED source code (`backend/`) was written by Dr. Dina Sokol and Justin Tojeira. Do not modify the C++ source files.
- The compiled `.exe` files are Windows binaries. Deploying to a Linux server requires recompiling on that server.
- MySQL must be running before starting the app, or database errors will be shown to the user.
