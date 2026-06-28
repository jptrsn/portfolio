import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary-700/50 text-foreground pt-24 px-6">

      <Navigation />

      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center">
          <Image src="/Headshot_3web.jpg" alt="Headshot" width="215" height="215" className="rounded-xl object-cover aspect-1/1" />
        </div>
        <div className="flex flex-col gap-6 mt-8 pb-12">
          <p>I&apos;m a full-stack engineer who starts every project with a deep understanding of who I&apos;m building for and what problems they actually care about. That principle is the through-line of everything I do.</p>
          <p>I cut my career in education—licensed to teach K-12 in Quebec—but I was always the person building tools to make people&apos;s lives easier. By the time I left the classroom to join a startup in 2014, the transition was natural. I wasn&apos;t abandoning teaching; I was scaling my impact by applying a builder&apos;s mindset to software.</p>
          <p>I&apos;m a tinkerer, a hacker, a critical thinker at heart. When I encounter a tool, framework, or technology that doesn&apos;t quite fit the problem I&apos;m trying to solve, I don&apos;t force it. I dig in until something clicks, then build what&apos;s actually needed. That relentless curiosity has taken me from malware forensics investigations to context engineering, from open-source contributions to DIY electronics labs. I dive deep. I dig where others don&apos;t. I don&apos;t stop when something is confusing—I start paying attention.</p>
          <p>What I&apos;ve learned across more than a decade of building software is that deep end-to-end ownership of a feature area, close to the product and the people using it, is where I operate at my best. Open source, accessibility, and genuinely improving the online experience aren&apos;t career keywords for me—they&apos;re the filter through which I decide what to work on.</p>
          <p>What keeps me going is finding something deeply interesting—either a problem worth solving or a technology worth understanding, or ideally both—and then figuring out how to do something with it that no one else has done yet. The harder it is, the more unusual it seems, the more excited I get. The learning is the point. I&apos;m happiest when I&apos;m stretching beyond what I already know, pulling myself into unfamiliar territory, and figuring it out.</p>
        </div>
      </div>
    </div>
  );
}