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
  try {
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
      publishedDate: record.get('Publish Date') as string | undefined,
      coverImage: undefined, // Field doesn't exist yet
    }));
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}

// Fetch single issue by number
export async function getIssue(issueNumber: number): Promise<Issue | null> {
  try {
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
      publishedDate: record.get('Publish Date') as string | undefined,
      coverImage: undefined, // Field doesn't exist yet
    };
  } catch (error) {
    console.error('Error fetching issue:', error);
    return null;
  }
}

// Fetch articles for a specific issue
export async function getArticlesByIssue(issueNumber: number): Promise<Article[]> {
  try {
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
      publishedDate: record.get('Publish Date') as string | undefined,
      coverImage: undefined, // Field doesn't exist yet
    }));
  } catch (error) {
    console.error('Error fetching articles by issue:', error);
    return [];
  }
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
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
      publishedDate: record.get('Publish Date') as string | undefined,
      coverImage: undefined, // Field doesn't exist yet
    };
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

// Fetch all articles
export async function getArticles(): Promise<Article[]> {
  try {
    const records = await base('Articles')
      .select({
        sort: [{ field: 'Publish Date', direction: 'desc' }],
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
      publishedDate: record.get('Publish Date') as string | undefined,
      coverImage: undefined, // Field doesn't exist yet
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
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
