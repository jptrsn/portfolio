'use client';
import { SkillNode } from '@/types/types';
import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import {
  Palette,
  Code2,
  Database,
  Wrench,
  Cloud,
  Lightbulb,
  Package,
  Sparkles
} from 'lucide-react';

// Move static data outside component
const CATEGORIES: Array<SkillNode['category'] | 'all'> = [
  'all',
  'language',
  'framework',
  'database',
  'tool',
  'platform',
  'concept'
];

// Category icon mapping helper
const getCategoryIcon = (category: SkillNode['category'], size: number = 24) => {
  const iconProps = { size, className: 'inline-block' };
  const icons = {
    framework: <Palette {...iconProps} />,
    language: <Code2 {...iconProps} />,
    database: <Database {...iconProps} />,
    tool: <Wrench {...iconProps} />,
    platform: <Cloud {...iconProps} />,
    concept: <Lightbulb {...iconProps} />
  };
  return icons[category] || <Package {...iconProps} />;
};

// Proficiency color helper
const getProficiencyColor = (level?: SkillNode['proficiencyLevel']) => {
  const colors = {
    beginner: 'text-blue-400',
    intermediate: 'text-green-400',
    advanced: 'text-purple-400',
    expert: 'text-amber-400'
  };
  return level ? colors[level] : '';
};

// Memoized thumbnail component
const SkillThumbnail = memo(({
  skill,
  isActive,
  onClick
}: {
  skill: SkillNode;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 w-32 bg-neutral-900/50 border rounded-lg p-4 transition-all duration-300 hover:scale-105 ${
      isActive
        ? 'border-primary-500 ring-2 ring-primary-500/20'
        : 'border-neutral-800 hover:border-neutral-700'
    }`}
  >
    <div className="flex justify-center mb-2">
      {getCategoryIcon(skill.category, 32)}
    </div>
    <p className="text-xs font-medium line-clamp-2">{skill.label}</p>
  </button>
));

SkillThumbnail.displayName = 'SkillThumbnail';

interface SkillsSectionProps {
  skills: SkillNode[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillNode['category'] | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Memoize filtered skills
  const filteredSkills = useMemo(
    () => selectedCategory === 'all'
      ? skills
      : skills.filter(skill => skill.category === selectedCategory),
    [selectedCategory, skills]
  );

  // Create skills map for O(1) lookups
  const skillsMap = useMemo(() => {
    return new Map(skills.map(skill => [skill.id, skill]));
  }, [skills]);

  // Memoize getRelatedSkills with optimized lookup
  const getRelatedSkills = useCallback((skillIds: string[]) => {
    return skillIds.map(id => skillsMap.get(id)).filter(Boolean) as SkillNode[];
  }, [skillsMap]);

  // Memoize current skill
  const currentSkill = useMemo(
    () => filteredSkills[currentIndex],
    [filteredSkills, currentIndex]
  );

  // Memoize navigation handlers
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredSkills.length - 1));
  }, [filteredSkills.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filteredSkills.length - 1 ? prev + 1 : 0));
  }, [filteredSkills.length]);

  // Memoize drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <section id="skills" className="pt-16 px-6 min-h-screen gradient-secondary">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-gradient">Experience & Skills</span>
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50'
              }`}
            >
              {cat === 'all' ? (
                <>
                  <Sparkles size={16} />
                  <span>All</span>
                </>
              ) : (
                <>
                  {getCategoryIcon(cat, 16)}
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Main Swiper Card */}
        <div className="relative mb-8">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Previous skill"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Next skill"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Card */}
          {currentSkill && (
            <div className="mx-12 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-8 md:p-12 min-h-[400px] transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-primary-500">
                  {getCategoryIcon(currentSkill.category, 64)}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-3">{currentSkill.label}</h3>

                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-neutral-800/50 rounded-full text-sm text-neutral-400 capitalize">
                    {currentSkill.category}
                  </span>
                  {currentSkill.proficiencyLevel && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProficiencyColor(currentSkill.proficiencyLevel)} bg-neutral-800/50`}>
                      {currentSkill.proficiencyLevel}
                    </span>
                  )}
                </div>

                {currentSkill.description && (
                  <p className="text-neutral-300 text-lg max-w-2xl mb-8">{currentSkill.description}</p>
                )}

                {currentSkill.relatedTo.length > 0 && (
                  <div className="w-full max-w-2xl">
                    <h4 className="text-sm font-semibold text-neutral-400 mb-4">Related Skills</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {getRelatedSkills(currentSkill.relatedTo).map((related) => (
                        <button
                          key={related.id}
                          onClick={() => {
                            const index = filteredSkills.findIndex(s => s.id === related.id);
                            if (index !== -1) setCurrentIndex(index);
                          }}
                          className="px-3 py-1.5 bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700 rounded-lg text-sm transition-all duration-300 hover:scale-105 flex items-center gap-1.5"
                        >
                          {getCategoryIcon(related.category, 14)}
                          <span>{related.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {filteredSkills.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-neutral-700 hover:bg-neutral-600'
              }`}
              aria-label={`Go to skill ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredSkills.map((skill, index) => (
              <SkillThumbnail
                key={skill.id}
                skill={skill}
                isActive={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}