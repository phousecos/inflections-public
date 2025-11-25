import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

// Type definitions
export interface Issue {
  id: string;
  number: number;
  title: string;
  publishDate?: string;
  status: string;
  themeDescription?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  author?: string;
  pillar?: string;
  issueId?: string;
  issueNumber?: number;
  publishDate?: string;
  featuredImageUrl?: string;
  publishedUrl?: string;
}

// Helper function to create slugs from title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

// ============ ISSUES ============

// Fetch all published issues
export async function getIssues(): Promise<Issue[]> {
  try {
    const records = await base('Issues')
      .select({
        filterByFormula: `{Status} = "Published"`,
        sort: [{ field: 'Issue Number', direction: 'desc' }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      number: record.get('Issue Number') as number,
      title: record.get('Issue Title') as string,
      publishDate: record.get('Publish Date') as string | undefined,
      status: record.get('Status') as string,
      themeDescription: record.get('Theme Description') as string | undefined,
    }));
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}

// Fetch single published issue by number
export async function getIssue(issueNumber: number): Promise<Issue | null> {
  try {
    const records = await base('Issues')
      .select({
        filterByFormula: `AND({Issue Number} = ${issueNumber}, {Status} = "Published")`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) return null;

    const record = records[0];
    return {
      id: record.id,
      number: record.get('Issue Number') as number,
      title: record.get('Issue Title') as string,
      publishDate: record.get('Publish Date') as string | undefined,
      status: record.get('Status') as string,
      themeDescription: record.get('Theme Description') as string | undefined,
    };
  } catch (error) {
    console.error('Error fetching issue:', error);
    return null;
  }
}

// ============ ARTICLES ============

// Fetch articles for a specific issue (by issue record ID)
export async function getArticlesByIssueId(issueId: string): Promise<Article[]> {
  try {
    const records = await base('Articles')
      .select({
        filterByFormula: `FIND("${issueId}", ARRAYJOIN({Issue}))`,
        sort: [{ field: 'Title', direction: 'asc' }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      title: record.get('Title') as string,
      slug: slugify(record.get('Title') as string),
      content: record.get('Content') as string | undefined,
      excerpt: record.get('Excerpt') as string | undefined,
      author: record.get('Author') as string | undefined,
      pillar: record.get('Pillar') as string | undefined,
      issueId: (record.get('Issue') as string[])?.[0],
      publishDate: record.get('Publish Date') as string | undefined,
      featuredImageUrl: record.get('Featured Image URL') as string | undefined,
      publishedUrl: record.get('Published URL') as string | undefined,
    }));
  } catch (error) {
    console.error('Error fetching articles by issue:', error);
    return [];
  }
}

// Fetch single article by slug (searches all articles in published issues)
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    // First get all published issues
    const publishedIssues = await getIssues();
    
    if (publishedIssues.length === 0) return null;

    // Get all articles from published issues
    for (const issue of publishedIssues) {
      const articles = await getArticlesByIssueId(issue.id);
      const article = articles.find(a => a.slug === slug);
      if (article) {
        // Add issue number to the article
        article.issueNumber = issue.number;
        return article;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

// Fetch all articles from all published issues
export async function getArticles(): Promise<Article[]> {
  try {
    // First get all published issues
    const publishedIssues = await getIssues();
    
    if (publishedIssues.length === 0) return [];

    // Get all articles from published issues
    const allArticles: Article[] = [];
    for (const issue of publishedIssues) {
      const articles = await getArticlesByIssueId(issue.id);
      // Add issue number to each article
      articles.forEach(article => {
        article.issueNumber = issue.number;
      });
      allArticles.push(...articles);
    }

    return allArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Update article with published URL
export async function updateArticlePublishedUrl(articleId: string, publishedUrl: string): Promise<void> {
  try {
    await base('Articles').update(articleId, {
      'Published URL': publishedUrl,
    });
  } catch (error) {
    console.error('Error updating article published URL:', error);
  }
}
