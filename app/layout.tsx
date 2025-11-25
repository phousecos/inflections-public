import type { Metadata } from "next";
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
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0">
                © 2025 Inflections. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/privacy" className="text-sm hover:text-brand-blue transition">
                  Privacy
                </a>
                <a href="/terms" className="text-sm hover:text-brand-blue transition">
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
