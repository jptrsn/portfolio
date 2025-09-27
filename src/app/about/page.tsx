import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 px-6">

      <Navigation />

      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gradient mb-8">About</h1>
        <h2 className="text-xl font-bold mb-8">Hi, I&apos;m James</h2>
        <div className="flex items-center justify-center">
          <Image src="/Headshot_3web.jpg" alt="Headshot" width="215" height="215" className="rounded-xl" />
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <p>
          I&apos;m a full-stack software developer with a decade of web development experience. I love building beautiful, responsive web apps that are a pleasure to use.
          </p>
          <p>
            As a former teacher, I&apos;m passionate about using technology to empower learners to seek, find and use information to improve learning. I am an advocate for free and open technology, and I believe that community-building is the true power of the internet.
          </p>
          <p>
            I believe that knowledge should be shared freely and accessibly, and that people are more important that profits. I write and publish a lot of code, some of it is even good.
          </p>
          <p>
            I love solving problems, brainstorming new ideas, features, and approaches, learning new coding languages, techniques, and architectures. One of my greatest strengths is in coordinating a group of people who enjoy
          </p>
          <p>
            When I&apos;m not working, I spend my free time tinkering with hobby electronics in the smart home area of interest, usually involving 3D printing and lots of blinking lights.
          </p>
        </div>
      </div>
    </div>
  );
}