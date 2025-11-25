import { getIssues } from "@/lib/airtable";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "All Issues - Inflections",
  description: "Browse all issues of Inflections magazine",
};

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-4">
          All Issues
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our complete archive of technology leadership insights.
        </p>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            No issues published yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              href={`/issues/${issue.number}`}
              className="group"
            >
              <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden h-full">
                {issue.coverImage && (
                  <div className="aspect-[3/4] bg-gray-200">
                    <img
                      src={issue.coverImage}
                      alt={`Issue ${issue.number}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-2">
                    Issue {issue.number}
                  </div>
                  {issue.title && (
                    <h2 className="text-2xl font-bold text-brand-jet mb-2 group-hover:text-brand-blue transition">
                      {issue.title}
                    </h2>
                  )}
                  {issue.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {issue.description}
                    </p>
                  )}
                  {issue.publishedDate && (
                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(issue.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
