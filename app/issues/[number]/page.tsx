import { getIssue, getArticlesByIssueId, getIssues } from "@/lib/airtable";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all published issues
export async function generateStaticParams() {
  const issues = await getIssues();
  return issues.map((issue) => ({
    number: issue.number.toString(),
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: { number: string } }) {
  const issueNumber = parseInt(params.number);
  const issue = await getIssue(issueNumber);

  if (!issue) {
    return {
      title: "Issue Not Found - Inflections",
    };
  }

  return {
    title: `Issue ${issue.number}: ${issue.title} - Inflections`,
    description: issue.themeDescription || `Read Issue ${issue.number} of Inflections magazine`,
  };
}

export default async function IssuePage({ params }: { params: { number: string } }) {
  const issueNumber = parseInt(params.number);
  const issue = await getIssue(issueNumber);

  if (!issue) {
    notFound();
  }

  const articles = await getArticlesByIssueId(issue.id);

  // Group articles by pillar
  const articlesByPillar = articles.reduce((acc, article) => {
    const pillar = article.pillar || "Uncategorized";
    if (!acc[pillar]) {
      acc[pillar] = [];
    }
    acc[pillar].push(article);
    return acc;
  }, {} as Record<string, typeof articles>);

  const pillars = Object.keys(articlesByPillar).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/issues"
          className="text-brand-blue hover:underline"
        >
          ← Back to All Issues
        </Link>
      </div>

      {/* Issue Header */}
      <header className="mb-12 border-b border-gray-200 pb-8">
        <p className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-2">
          Issue {issue.number}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-3">
          {issue.title}
        </h1>
        {issue.publishDate && (
          <p className="text-gray-500">
            Published {new Date(issue.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
        {issue.themeDescription && (
          <p className="text-gray-600 mt-4 text-lg max-w-3xl">
            {issue.themeDescription}
          </p>
        )}
      </header>

      {/* Articles by Pillar */}
      {articles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            No articles in this issue yet.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {pillars.map((pillar) => (
            <section key={pillar}>
              <h2 className="text-xl font-bold text-brand-blue mb-6 border-b border-gray-200 pb-3">
                {pillar}
              </h2>
              <div className="space-y-6">
                {articlesByPillar[pillar].map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      {article.featuredImageUrl && (
                        <div className="md:w-48 md:h-48 flex-shrink-0">
                          <img
                            src={article.featuredImageUrl}
                            alt={article.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 p-6">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-brand-jet mb-3">
                          <Link
                            href={`/articles/${article.slug}`}
                            className="hover:text-brand-blue transition"
                          >
                            {article.title}
                          </Link>
                        </h3>
                        
                        {/* Excerpt */}
                        {article.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                        )}
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          {article.author && (
                            <span className="text-sm text-gray-500">
                              By {article.author}
                            </span>
                          )}
                          <Link
                            href={`/articles/${article.slug}`}
                            className="text-brand-blue font-semibold text-sm hover:underline"
                          >
                            Read Full Article →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/issues"
          className="text-brand-blue hover:underline"
        >
          ← Browse All Issues
        </Link>
      </div>
    </div>
  );
}
