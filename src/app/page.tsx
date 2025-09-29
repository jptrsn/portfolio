import { BrandIcon } from '@/components/BrandIcon';
import Navigation from '@/components/Navigation';
import ScrollToTop from '@/components/ScrollToTop';
import { Typewriter } from '@/components/Typewriter';
import { contactInfo } from '@/data/contactInfo';
import { sideProjects } from '@/data/projectInfo';
import { skills } from '@/data/skills';
import { generateExtendedMetadata } from '@/lib/metadata';
import { ArrowRight, ChevronDown, Code, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateExtendedMetadata({});

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navigation />

      <section id="top" className="pt-24 pb-16 px-6 min-h-screen flex flex-col items-center justify-center">
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
            {/* <div className="text-sm sm:text-md flex flex-col sm:flex-row justify-center gap-3 mb-12">
              <Link href="/blog" className="border border-secondary-500 text-secondary-400 hover:bg-secondary-500/10 px-8 py-3 rounded-lg font-semibold transition-all sm:w-48">
                Blog
              </Link>
              <Link href="/contact" className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 sm:w-48">
                Get In Touch
              </Link>
              <Link href="/projects" className="border border-secondary-500 text-secondary-400 hover:bg-secondary-500/10 px-8 py-3 rounded-lg font-semibold transition-all sm:w-48">
                View Projects
              </Link>
            </div> */}

            <div className="flex justify-center space-x-6">
              { contactInfo.map((info, index) => (
                <Link href={info.href} key={index} className="text-neutral-400 hover:text-primary-500 transition-colors" target="_blank">
                  {info.icon}
                </Link>
              ))}
            </div>

          </div>

          {/* Scroll indicator */}
          <Link href="#skills" className="flex justify-center animate-bounce">
            <ChevronDown className="w-6 h-6 text-neutral-400" />
          </Link>
        </div>
      </section>

      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-gradient">Expertise</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="mb-4">
                    <div className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" >
                      {skill.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-neutral-400 text-sm">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6 bg-neutral-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Side Projects</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              A selection of recent work and play showcasing full-stack development,
              system design, and problem-solving capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sideProjects.map((project, index) => (
              <div key={index} className="group">
                <div className="relative h-full bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Background image for entire card */}
                  {project.cover && (
                    <Image
                      src={project.cover}
                      alt={`${project.title} cover image`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  )}

                  {/* Overlay to ensure content readability */}
                  <div className="absolute inset-0 bg-neutral-900/80 group-hover:bg-neutral-900/70 transition-all duration-300"/>

                  {/* Content container - now positioned relative to stay above background */}
                  <div className="relative z-10 min-h-[500] flex items-end">
                    {/* Your existing header section */}
                    <div className="h-48 gradient-secondary opacity-20 group-hover:opacity-30 transition-opacity">
                      {/* This can now be empty or contain other overlay content */}
                    </div>

                    {/* Your existing content */}
                    <div className="p-6 bg-neutral-800/75">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="bg-secondary-500/10 text-secondary-400 px-2 py-1 rounded text-xs border border-secondary-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className={`flex ${project.liveUrl ? 'justify-between' : 'justify-end'} items-center`}>
                        {/* <Link href={project.link} className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center">
                          View Details <ArrowRight className="w-3 h-3 ml-1" />
                        </Link> */}
                        { project.liveUrl && (
                          <div className="flex justify-between items-center">
                            <Link href={project.liveUrl} className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center" target="_blank">
                              Visit the Project <ExternalLink className="w-3 h-3 ml-1" />
                            </Link>
                          </div>
                        )}
                        { project.github && (
                          <Link href={project.github} className="text-neutral-400 hover:text-neutral-300">
                            <BrandIcon name='github'></BrandIcon>
                          </Link>
                        )}
                      </div>
                      {/* { project.liveUrl && (
                        <div className="flex justify-between items-center">
                          <Link href={project.liveUrl} className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center" target="_blank">
                            Visit the Project <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="border border-accent-500 text-accent-400 hover:bg-accent-500/10 px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center">
              View All Projects <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="connect" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s <span className="text-gradient">Build Something</span> Amazing Together
          </h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in discussing new opportunities, innovative projects,
            and ways to solve complex technical challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center">
              Start a Conversation <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            {/* <Link href="/experience" className="border border-secondary-500 text-secondary-400 hover:bg-secondary-500/10 px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center">
              View My Experience <ArrowRight className="w-4 h-4 ml-2" />
            </Link> */}
          </div>
        </div>
      </section>

      {/* Footer */}
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