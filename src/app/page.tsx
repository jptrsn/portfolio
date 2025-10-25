import Navigation from '@/components/Navigation';
import { ProjectsSection } from '@/components/ProjectsSection';
import ScrollToTop from '@/components/ScrollToTop';
import { SkillsSection } from '@/components/SkillSection';
import { Typewriter } from '@/components/Typewriter';
import { contactInfo } from '@/data/contactInfo';
import { sideProjects } from '@/data/projectInfo';
import { generateExtendedMetadata } from '@/lib/metadata';
import { getSkillsData } from '@/lib/skill';
import { ChevronDown, Code } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateExtendedMetadata({});

export default function HomePage() {

  const skills = getSkillsData();

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navigation />

      <section id="top" className="pt-24 pb-16 px-6 min-h-screen flex flex-col items-center justify-center gradient-primary">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">

            <div className="w-20 sm:w-32 h-20 sm:h-32 mx-auto mb-8 rounded-full gradient-primary flex items-center justify-center">
              <div className="w-16 sm:w-28 h-16 sm:h-28 rounded-full bg-background flex items-center justify-center">
                <Code className="w-12 h-12 text-primary-500" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6">
              <Typewriter
                text="Software Engineer & Educator"
                className="text-gradient"
                speed={100}
                delay={500}
                showCursor={true}
              />
            </h1>
            <p className="text-md sm:text-xl md:text-2xl text-neutral-400 mb-8 max-w-3xl mx-auto">
              Building human-centric applications and guiding engineering teams to deliver
              exceptional digital experiences that solve real-world problems.
            </p>

            <div className="flex justify-center space-x-6">
              { contactInfo.map((info, index) => (
                <Link href={info.href} key={index} aria-label={info.label} className="text-neutral-400 hover:text-primary-500 transition-colors" target="_blank">
                  {info.icon}
                </Link>
              ))}
            </div>

          </div>

          {/* Scroll indicator */}
          <Link href="#skills" aria-label='Skills' className="flex justify-center motion-safe:animate-bounce-once">
            <ChevronDown className="w-6 h-6 text-neutral-400" />
          </Link>
        </div>
      </section>

      <SkillsSection skills={skills} />

      <ProjectsSection projects={sideProjects} />

      <section id="connect" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s <span className="text-gradient">Build Something</span> Amazing Together
          </h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in discussing new opportunities, innovative projects,
            and ways to solve complex technical challenges.
          </p>
          <div className="flex justify-center space-x-6">
              { contactInfo.map((info, index) => (
                <Link key={index} href={info.href} aria-label={info.label} className="flex flex-col items-center justify-center gap-2 text-neutral-400 hover:text-primary-500 transition-colors" target="_blank">
                  {info.icon}
                  <div className="text-sm">{info.label}</div>
                </Link>
              ))}
            </div>
        </div>
      </section>

      <footer className="border-t border-neutral-800 py-2 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-neutral-400 text-sm">
            © 2025 EduCoder.dev
          </div>
        </div>
      </footer>
      <ScrollToTop threshold={500} />
    </div>
  );
}