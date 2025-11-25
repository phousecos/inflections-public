import Airtable from 'airtable';

export const revalidate = 0; // Never cache - always fresh

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export default async function DebugPage() {
  // Fetch all issues (regardless of status)
  const issueRecords = await base('Issues').select().all();
  const issues = issueRecords.map((record) => ({
    id: record.id,
    number: record.get('Issue Number'),
    title: record.get('Issue Title'),
    status: record.get('Status'),
    publishDate: record.get('Publish Date'),
  }));

  // Fetch all articles
  const articleRecords = await base('Articles').select().all();
  const articles = articleRecords.map((record) => ({
    id: record.id,
    title: record.get('Title'),
    issueField: record.get('Issue'), // Raw linked record field
    pillar: record.get('Pillar'),
    status: record.get('Status'),
    excerpt: record.get('Excerpt'),
    content: record.get('Content') ? 'Has content' : 'No content',
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-red-600 mb-8">
        🔍 DEBUG PAGE - DELETE BEFORE PRODUCTION
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-brand-blue">
          Issues ({issues.length} total)
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-300">
                <th className="p-2">Record ID</th>
                <th className="p-2">Number</th>
                <th className="p-2">Title</th>
                <th className="p-2">Status</th>
                <th className="p-2">Publish Date</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="border-b border-gray-200">
                  <td className="p-2 font-mono text-xs">{issue.id}</td>
                  <td className="p-2">{String(issue.number)}</td>
                  <td className="p-2">{String(issue.title || '(none)')}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      issue.status === 'Published' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {String(issue.status || '(none)')}
                    </span>
                  </td>
                  <td className="p-2">{String(issue.publishDate || '(none)')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-brand-blue">
          Articles ({articles.length} total)
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-300">
                <th className="p-2">Record ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Issue Field (Linked)</th>
                <th className="p-2">Pillar</th>
                <th className="p-2">Status</th>
                <th className="p-2">Excerpt</th>
                <th className="p-2">Content</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-gray-200">
                  <td className="p-2 font-mono text-xs">{article.id}</td>
                  <td className="p-2 font-semibold">{String(article.title || '(none)')}</td>
                  <td className="p-2 font-mono text-xs">
                    {article.issueField ? (
                      <span className="bg-green-100 px-1 rounded">
                        {JSON.stringify(article.issueField)}
                      </span>
                    ) : (
                      <span className="bg-red-100 px-1 rounded text-red-600">
                        NOT LINKED
                      </span>
                    )}
                  </td>
                  <td className="p-2">{String(article.pillar || '(none)')}</td>
                  <td className="p-2">{String(article.status || '(none)')}</td>
                  <td className="p-2">{article.excerpt ? '✓ Has excerpt' : '✗ No excerpt'}</td>
                  <td className="p-2">{article.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-yellow-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">🔧 What to Check</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ <strong>Issues:</strong> At least one should have Status = "Published"</li>
          <li>✓ <strong>Articles:</strong> The "Issue Field (Linked)" should show a record ID like ["recXXXXXX"]</li>
          <li>✓ <strong>Match:</strong> The record ID in articles should match one of the Issue Record IDs above</li>
          <li>✓ <strong>Content:</strong> Articles should have excerpts and content for display</li>
        </ul>
      </section>

      <div className="mt-8 text-center text-red-600 font-bold">
        ⚠️ Remove /app/debug/page.tsx before going to production!
      </div>
    </div>
  );
}
