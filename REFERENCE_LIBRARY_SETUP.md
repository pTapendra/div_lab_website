# Reference Library setup

## Route

- Reference Library: `/reference-library`
- The page is public to read.
- `Add paper` is always visible. If the visitor is not signed in, it opens the sign-in modal first and then opens the Add Paper form.
- Edit and delete controls appear only after sign-in.

## Paper fields

- Title
- Author(s)
- Year
- Venue
- Keywords
- Paper URL
- BibTeX

Search matches title, author(s), venue, year, and keywords.

## Authentication environment variables

Create `.env.local` in the project root using `.env.example` as a guide:

```env
LAB_ADMIN_USERNAME=divlab
LAB_ADMIN_PASSWORD=replace-with-a-strong-password
LAB_SESSION_SECRET=replace-with-at-least-32-random-characters
```

Keep the real values out of GitHub. In production, add them in the Vercel project's Environment Variables.

## Storage behavior

The storage layer automatically uses:

- **Local development:** `data/reference-library.json`
- **Vercel:** private Vercel Blob storage at `reference-library/reference-library.json`

`data/reference-library.json` is also used as the initial seed if the Blob object does not exist yet.

You can override automatic storage selection with:

```env
REFERENCE_LIBRARY_STORAGE=local
```

or:

```env
REFERENCE_LIBRARY_STORAGE=blob
```

Normally this override is not needed.

## Vercel Blob setup

1. Open the existing DIV Lab project in Vercel.
2. Open **Storage** and create/connect a **Private Blob** store.
3. Connect it to the DIV Lab project and its Production/Preview environments as needed.
4. Deploy this code. On the first read, the app seeds Blob from `data/reference-library.json` if no library object exists yet.

New Vercel Blob stores can use Vercel's project-scoped authentication automatically. Older stores may expose `BLOB_READ_WRITE_TOKEN`; keep that value in Vercel and never commit it to GitHub.

## Local testing

Local development continues to use the local JSON file by default:

```bash
npm install
npm run dev
```

To test against the connected Vercel Blob store locally, link/pull the Vercel project environment and set:

```env
REFERENCE_LIBRARY_STORAGE=blob
```
