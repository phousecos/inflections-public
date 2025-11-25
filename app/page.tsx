import { getIssues, getArticlesByIssueId } from "@/lib/airtable";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const issues = await getIssues();
  const latestIssue = issues[0];

  if (!latestIssue) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-jet mb-4">
            Coming Soon
          </h1>
          <p className="text-gray-600 text-lg">
            The first issue of Inflections is being prepared.
          </p>
        </div>
      </div>
    );
  }

  const articles = await getArticlesByIssueId(latestIssue.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Issue Header */}
      <header className="mb-12 border-b border-gray-200 pb-8">
        <p className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-2">
          Latest Issue
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-3">
          Issue {latestIssue.number}: {latestIssue.title}
        </h1>
        {latestIssue.publishDate && (
          <p className="text-gray-500">
            Published {new Date(latestIssue.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
        {latestIssue.themeDescription && (
          <p className="text-gray-600 mt-4 text-lg max-w-3xl">
            {latestIssue.themeDescription}
          </p>
        )}
      </header>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            Articles coming soon...
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {articles.map((article) => (
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
                  {/* Pillar Tag */}
                  {article.pillar && (
                    <span className="inline-block text-xs font-semibold text-brand-blue uppercase tracking-wide mb-2 bg-blue-50 px-2 py-1 rounded">
                      {article.pillar}
                    </span>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-brand-jet mb-3">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="hover:text-brand-blue transition"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  
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
      )}

      {/* Browse Past Issues */}
      {issues.length > 1 && (
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-2xl font-bold text-brand-jet mb-4">
            Explore Past Issues
          </h3>
          <Link
            href="/issues"
            className="inline-block bg-brand-jet text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Browse All Issues
          </Link>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16">
        <NewsletterSignup variant="homepage" />
      </div>
    </div>
  );
}
