import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary-700/50 text-foreground pt-24 px-6">

      <Navigation />

      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl font-bold mb-8">Hi, I&apos;m James</h2>
        <div className="flex items-center justify-center">
          <Image src="/Headshot_3web.jpg" alt="Headshot" width="215" height="215" className="rounded-xl object-cover aspect-1/1" />
        </div>
        <div className="flex flex-col gap-6 mt-8 pb-12">
          <p>I&apos;m a full-stack software developer with over a dozen years of development experience building across web, mobile, and embedded systems. But more than that, I&apos;m an educator at heart—one who brings that mindset to every line of code I write and every team I work with.</p>
          <p>My approach to development is rooted in the meta-skills of teaching: understanding the real problems users face, fostering collaboration, thinking laterally about solutions, and continuously adapting. I believe the best software emerges when teams work together to deeply understand a problem, then creatively and collaboratively design an elegant solution before building it. This process of discovery, iteration, and growth—whether I&apos;m mentoring a junior developer or coordinating a team tackling a complex challenge—is where I thrive.</p>
          <p>My technical curiosity knows few boundaries. I&apos;ve built production web applications with React, Angular, and Vue, backed by Node.js, NestJS, and Go services, working with everything from PostgreSQL to MongoDB. I&apos;ve architected progressive web apps with offline functionality, encrypted IndexedDB storage, and web workers for performance. When I encounter a tool or service that doesn&apos;t quite fit, I don&apos;t settle—I dig in and build something better. This drive has taken me beyond the browser to Flutter mobile apps, ESP32 firmware, Docker orchestration, and custom CI/CD pipelines. I&apos;m passionate about open source because it embodies technical excellence, genuine collaboration, and creative freedom while giving everyone the power to choose their own path.</p>
          <p>My self-hosted infrastructure serves as my personal laboratory—a sandbox where I experiment with DevOps practices, network architecture, containerization, Linux administration, and automation. Every side project teaches me something new that I can apply to production systems.</p>
          <p>When I&apos;m not writing code or deploying services, you&apos;ll find me tinkering with hobby electronics in the smart home space—usually involving ESP32 microcontrollers, 3D-printed enclosures, and more blinking lights than any reasonable person needs.</p>
        </div>
      </div>
    </div>
  );
}