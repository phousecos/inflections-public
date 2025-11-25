import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inflections - The Magazine for Modern IT Leadership",
  description: "Digital magazine covering Tech Leadership, Delivery Excellence, Workforce Transformation, Emerging Talent, and the Human Side of technology.",
  keywords: ["IT leadership", "technology", "digital transformation", "workforce", "management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold">
                  <span className="text-brand-blue">Inflec</span>
                  <span className="text-brand-jet">tions</span>
                </h1>
              </a>
              <nav className="hidden md:flex space-x-8">
                <a href="/articles" className="text-gray-700 hover:text-brand-blue transition">
                  Browse
                </a>
                <a href="/issues" className="text-gray-700 hover:text-brand-blue transition">
                  Issues
                </a>
                <a href="/about" className="text-gray-700 hover:text-brand-blue transition">
                  About
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="min-h-screen bg-brand-ghost">
          {children}
        </main>
        <footer className="bg-brand-jet text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h2 className="text-2xl font-bold mb-3">
                  <span className="text-brand-blue">Inflec</span>
                  <span className="text-white">tions</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  The magazine for modern IT leadership. Insights on technology, 
                  delivery, and the people who make it happen.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Explore</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/articles" className="hover:text-white transition">Browse Articles</a></li>
                  <li><a href="/issues" className="hover:text-white transition">All Issues</a></li>
                  <li><a href="/about" className="hover:text-white transition">About Inflections</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <NewsletterSignup variant="footer" />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2025 Inflections. A publication of Unlimited Powerhouse.
              </p>
              <div className="flex space-x-6">
                <a href="/privacy" className="text-sm text-gray-500 hover:text-white transition">
                  Privacy
                </a>
                <a href="/terms" className="text-sm text-gray-500 hover:text-white transition">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
