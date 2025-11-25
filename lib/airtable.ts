import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

// Type definitions
export interface Issue {
  id: string;
  number: number;
  title?: string;
  description?: string;
  publishedDate?: string;
  coverImage?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  author?: string;
  pillar?: string;
  issueNumber?: number;
  publishedDate?: string;
  coverImage?: string;
}

// Fetch all issues
export async function getIssues(): Promise<Issue[]> {
  const records = await base('Issues')
    .select({
      sort: [{ field: 'Issue Number', direction: 'desc' }],
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    number: record.get('Issue Number') as number,
    title: record.get('Title') as string | undefined,
    description: record.get('Description') as string | undefined,
    publishedDate: record.get('Published Date') as string | undefined,
    coverImage: record.get('Cover Image') as string | undefined,
  }));
}

// Fetch single issue by number
export async function getIssue(issueNumber: number): Promise<Issue | null> {
  const records = await base('Issues')
    .select({
      filterByFormula: `{Issue Number} = ${issueNumber}`,
      maxRecords: 1,
    })
    .all();

  if (records.length === 0) return null;

  const record = records[0];
  return {
    id: record.id,
    number: record.get('Issue Number') as number,
    title: record.get('Title') as string | undefined,
    description: record.get('Description') as string | undefined,
    publishedDate: record.get('Published Date') as string | undefined,
    coverImage: record.get('Cover Image') as string | undefined,
  };
}

// Fetch articles for a specific issue
export async function getArticlesByIssue(issueNumber: number): Promise<Article[]> {
  const records = await base('Articles')
    .select({
      filterByFormula: `{Issue Number} = ${issueNumber}`,
      sort: [{ field: 'Title', direction: 'asc' }],
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    title: record.get('Title') as string,
    slug: record.get('Slug') as string || slugify(record.get('Title') as string),
    content: record.get('Content') as string | undefined,
    excerpt: record.get('Excerpt') as string | undefined,
    author: record.get('Author') as string | undefined,
    pillar: record.get('Pillar') as string | undefined,
    issueNumber: record.get('Issue Number') as number | undefined,
    publishedDate: record.get('Published Date') as string | undefined,
    coverImage: record.get('Cover Image') as string | undefined,
  }));
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const records = await base('Articles')
    .select({
      filterByFormula: `{Slug} = '${slug}'`,
      maxRecords: 1,
    })
    .all();

  if (records.length === 0) return null;

  const record = records[0];
  return {
    id: record.id,
    title: record.get('Title') as string,
    slug: record.get('Slug') as string || slugify(record.get('Title') as string),
    content: record.get('Content') as string | undefined,
    excerpt: record.get('Excerpt') as string | undefined,
    author: record.get('Author') as string | undefined,
    pillar: record.get('Pillar') as string | undefined,
    issueNumber: record.get('Issue Number') as number | undefined,
    publishedDate: record.get('Published Date') as string | undefined,
    coverImage: record.get('Cover Image') as string | undefined,
  };
}

// Fetch all articles
export async function getArticles(): Promise<Article[]> {
  const records = await base('Articles')
    .select({
      sort: [{ field: 'Published Date', direction: 'desc' }],
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    title: record.get('Title') as string,
    slug: record.get('Slug') as string || slugify(record.get('Title') as string),
    content: record.get('Content') as string | undefined,
    excerpt: record.get('Excerpt') as string | undefined,
    author: record.get('Author') as string | undefined,
    pillar: record.get('Pillar') as string | undefined,
    issueNumber: record.get('Issue Number') as number | undefined,
    publishedDate: record.get('Published Date') as string | undefined,
    coverImage: record.get('Cover Image') as string | undefined,
  }));
}

// Helper function to create slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}
