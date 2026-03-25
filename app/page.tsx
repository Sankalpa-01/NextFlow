import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, Layout, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <header className="px-6 lg:px-10 h-16 flex items-center border-b backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="h-6 w-6 text-blue-600" />
          <span>NextFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">Features</Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-muted/50 text-blue-600 border-blue-200">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Now powered by Gemini 3 Flash</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Build AI Workflows <br /> 
            <span className="text-blue-600">Without Limits.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Drag, drop, and connect Gemini AI nodes to build powerful agents. 
            Automate your tasks in minutes with our visual canvas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              View Demo
            </Button>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-24 bg-muted/30 border-y">
          <div className="container px-6 mx-auto grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Layout className="h-10 w-10 text-blue-600" />}
              title="Visual Canvas"
              description="Built on React Flow for a seamless, lag-free building experience."
            />
            <FeatureCard 
              icon={<Sparkles className="h-10 w-10 text-purple-600" />}
              title="Gemini Intelligence"
              description="Direct integration with Google's latest models for reasoning and text generation."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-10 w-10 text-green-600" />}
              title="Enterprise Ready"
              description="Secure authentication with Clerk and background tasks via Trigger.dev."
            />
          </div>
        </section>
      </main>

      <footer className="py-10 border-t text-center text-sm text-muted-foreground">
        © 2026 NextFlow Inc. Built for the Galaxy.ai Innovation Challenge.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-background border shadow-sm">
      <div className="mb-2">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}