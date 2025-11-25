import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata = {
  title: "About - Inflections",
  description: "Learn about Inflections, the digital magazine for modern IT leadership covering technology, delivery excellence, and workforce transformation.",
};

export default function AboutPage() {
  const pillars = [
    {
      name: "Tech Leadership",
      description: "Strategic insights for technology executives navigating digital transformation, emerging technologies, and organizational change.",
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Delivery Excellence",
      description: "Practical guidance on project execution, agile methodologies, and building high-performing delivery organizations.",
      color: "bg-green-50 border-green-200",
    },
    {
      name: "Workforce Transformation",
      description: "Perspectives on talent development, remote work, organizational design, and building inclusive tech teams.",
      color: "bg-purple-50 border-purple-200",
    },
    {
      name: "Emerging Talent",
      description: "Resources and insights for the next generation of technology leaders entering and advancing in the industry.",
      color: "bg-orange-50 border-orange-200",
    },
    {
      name: "Human Side",
      description: "The often-overlooked human elements of technology work: wellness, communication, resilience, and sustainable careers.",
      color: "bg-rose-50 border-rose-200",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-6">
          About <span className="text-brand-blue">Inflections</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          A digital magazine exploring the inflection points that shape 
          technology leadership, delivery, and the people driving change.
        </p>
      </header>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-jet mb-4">Our Mission</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-4">
            Every career, every project, every organization encounters inflection points—those 
            critical moments where the right insight, decision, or perspective changes everything.
          </p>
          <p className="mb-4">
            <strong className="text-brand-jet">Inflections</strong> exists to provide that insight. 
            We publish thoughtful, practical content for technology leaders and practitioners who 
            are navigating complexity, driving transformation, and building what's next.
          </p>
          <p>
            Whether you're a CIO steering enterprise strategy, a project manager delivering 
            under pressure, or an emerging leader finding your path, Inflections offers 
            perspectives that meet you where you are.
          </p>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-jet mb-6">What We Cover</h2>
        <p className="text-gray-600 mb-8">
          Our content is organized around five pillars that reflect the full spectrum 
          of modern technology leadership:
        </p>
        <div className="space-y-4">
          {pillars.map((pillar) => (
            <div 
              key={pillar.name}
              className={`${pillar.color} border rounded-lg p-6`}
            >
              <h3 className="text-lg font-bold text-brand-jet mb-2">
                {pillar.name}
              </h3>
              <p className="text-gray-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Part of Ecosystem */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-jet mb-4">Part of Something Bigger</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-4">
            Inflections is the flagship publication of <strong className="text-brand-jet">Unlimited Powerhouse</strong>, 
            an ecosystem of brands and platforms dedicated to transforming how organizations 
            approach technology leadership, project delivery, and talent development.
          </p>
          <p>
            Through Inflections, we share insights drawn from two decades of consulting experience 
            across higher education, healthcare, government, and enterprise organizations—distilled 
            into actionable content for today's technology leaders.
          </p>
        </div>
      </section>

      {/* For Readers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-jet mb-4">For Our Readers</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-4">
            We write for practitioners. That means:
          </p>
          <ul className="list-none space-y-3 pl-0">
            <li className="flex items-start gap-3">
              <span className="text-brand-blue font-bold">→</span>
              <span>No fluff—every article delivers actionable value</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-blue font-bold">→</span>
              <span>Real-world context from actual project experience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-blue font-bold">→</span>
              <span>Perspectives that challenge conventional thinking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-blue font-bold">→</span>
              <span>Content for leaders at every stage of their journey</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section>
        <NewsletterSignup variant="homepage" />
      </section>
    </div>
  );
}
