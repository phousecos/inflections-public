import { getArticles, getIssues } from "@/lib/airtable";
import ArticleFilter from "@/components/ArticleFilter";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Browse Articles - Inflections",
  description: "Explore articles by category: Tech Leadership, Delivery Excellence, Workforce Transformation, Emerging Talent, and Human Side",
};

export default async function ArticlesPage() {
  const [articles, issues] = await Promise.all([
    getArticles(),
    getIssues(),
  ]);

  // Create a map of issue IDs to issue numbers for linking
  const issueMap = new Map(issues.map(issue => [issue.id, issue.number]));

  // Add issue numbers to articles
  const articlesWithIssueNumbers = articles.map(article => ({
    ...article,
    issueNumber: article.issueId ? issueMap.get(article.issueId) : undefined,
  }));

  // Get unique pillars from articles
  const pillars = [...new Set(articles.map(a => a.pillar).filter(Boolean))] as string[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-4">
          Browse Articles
        </h1>
        <p className="text-gray-600 text-lg">
          Explore insights across all our content pillars.
        </p>
      </header>

      {/* Filter and Articles */}
      <ArticleFilter articles={articlesWithIssueNumbers} pillars={pillars} />
    </div>
  );
}
