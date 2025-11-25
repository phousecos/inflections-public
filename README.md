# Inflections Magazine - Public Site

Public-facing digital magazine built with Next.js 14, reading content from Airtable.

## Features

- 📰 Magazine-style issue organization
- 📝 Individual article pages with clean typography
- 🏷️ Content organized by pillars (Tech Leadership, Delivery Excellence, etc.)
- 🎨 Brand-aligned design using Poppins font and blue/orange palette
- ⚡ Static generation for fast loading
- 🔄 Hourly revalidation for content updates

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Airtable
- **Font:** Poppins (Google Fonts)
- **Deployment:** Vercel (recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update `.env.local` with your Airtable credentials:

```env
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
```

**To find your Airtable Base ID:**
1. Go to https://airtable.com/api
2. Select your base
3. The Base ID is shown in the URL: `appXXXXXXXXXXXXXX`

### 3. Airtable Structure

Your Airtable base should have these tables:

#### Issues Table
- `Issue Number` (Number) - required
- `Title` (Text)
- `Description` (Long text)
- `Published Date` (Date)
- `Cover Image` (Attachment)

#### Articles Table
- `Title` (Text) - required
- `Slug` (Text) - URL-friendly version of title
- `Content` (Long text) - HTML or Markdown
- `Excerpt` (Long text)
- `Author` (Text)
- `Pillar` (Single select) - Options: Tech Leadership, Delivery Excellence, Workforce Transformation, Emerging Talent, Human Side
- `Issue Number` (Number) - Links to Issues table
- `Published Date` (Date)
- `Cover Image` (Attachment)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
inflections-public/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage (latest issue)
│   ├── issues/
│   │   ├── page.tsx        # All issues listing
│   │   └── [number]/
│   │       └── page.tsx    # Individual issue page
│   └── articles/
│       └── [slug]/
│           └── page.tsx    # Individual article page
├── lib/
│   └── airtable.ts         # Airtable API client
├── .env.local              # Environment variables
└── tailwind.config.ts      # Tailwind with brand colors
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
4. Deploy!

Your site will be available at `inflections.media` (configure custom domain in Vercel)

## Content Workflow

1. **Create Issue** in Airtable Issues table
2. **Write Articles** in Airtable Articles table, linking to issue
3. **Organize by Pillar** using the Pillar field
4. **Publish** - Content appears automatically (revalidates every hour)

## Customization

### Colors

Edit `tailwind.config.ts` to adjust brand colors:

```typescript
colors: {
  brand: {
    blue: "#0020C2",
    orange: "#FFA300",
    // ... etc
  }
}
```

### Typography

Currently using Poppins. To change font, update:
1. `app/globals.css` - Google Fonts import
2. `tailwind.config.ts` - Font family

### Layout

- Header: `app/layout.tsx`
- Homepage: `app/page.tsx`
- Issue template: `app/issues/[number]/page.tsx`
- Article template: `app/articles/[slug]/page.tsx`

## Performance

- Static generation with ISR (revalidates hourly)
- Optimized images via Next.js Image
- Minimal client JavaScript
- Fast page loads

## Future Enhancements

- Newsletter signup integration
- Search functionality
- Pillar landing pages
- Related articles
- Comments/discussion
- Social sharing

## Support

For issues or questions, contact the Unlimited Powerhouse team.
