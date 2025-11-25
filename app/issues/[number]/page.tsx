import { getIssue, getArticlesByIssue, getIssues } from "@/lib/airtable";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all issues
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
    title: `Issue ${issue.number}${issue.title ? ` - ${issue.title}` : ""} - Inflections`,
    description: issue.description || `Read Issue ${issue.number} of Inflections magazine`,
  };
}

export default async function IssuePage({ params }: { params: { number: string } }) {
  const issueNumber = parseInt(params.number);
  const issue = await getIssue(issueNumber);

  if (!issue) {
    notFound();
  }

  const articles = await getArticlesByIssue(issueNumber);

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
      {/* Issue Header */}
      <div className="mb-12">
        <Link
          href="/issues"
          className="text-brand-blue hover:underline mb-4 inline-block"
        >
          ← Back to All Issues
        </Link>
        <div className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-2">
          Issue {issue.number}
        </div>
        {issue.title && (
          <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-4">
            {issue.title}
          </h1>
        )}
        {issue.description && (
          <p className="text-gray-600 text-lg max-w-3xl">
            {issue.description}
          </p>
        )}
        {issue.publishedDate && (
          <p className="text-sm text-gray-500 mt-4">
            Published {new Date(issue.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>

      {/* Table of Contents */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-brand-jet mb-8">
          Table of Contents
        </h2>

        {articles.length === 0 ? (
          <p className="text-gray-600">
            No articles in this issue yet.
          </p>
        ) : (
          <div className="space-y-8">
            {pillars.map((pillar) => (
              <div key={pillar}>
                <h3 className="text-lg font-semibold text-brand-blue mb-4 border-b border-gray-200 pb-2">
                  {pillar}
                </h3>
                <div className="space-y-4">
                  {articlesByPillar[pillar].map((article) => (
                    <article key={article.id} className="group">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="block hover:bg-brand-ghost p-4 rounded-lg transition"
                      >
                        <h4 className="text-xl font-bold text-brand-jet group-hover:text-brand-blue transition mb-2">
                          {article.title}
                        </h4>
                        {article.excerpt && (
                          <p className="text-gray-600 text-sm mb-2">
                            {article.excerpt}
                          </p>
                        )}
                        {article.author && (
                          <p className="text-sm text-gray-500">
                            By {article.author}
                          </p>
                        )}
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-between">
        {issueNumber > 1 && (
          <Link
            href={`/issues/${issueNumber - 1}`}
            className="text-brand-blue hover:underline"
          >
            ← Issue {issueNumber - 1}
          </Link>
        )}
        <div className="flex-1" />
        <Link
          href={`/issues/${issueNumber + 1}`}
          className="text-brand-blue hover:underline"
        >
          Issue {issueNumber + 1} →
        </Link>
      </div>
    </div>
  );
}
