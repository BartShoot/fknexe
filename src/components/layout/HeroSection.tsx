import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <article className="typography mb-8 text-center">
      <h1 className="mb-0">{title}</h1>
      <h3 className="mt-0">{subtitle}</h3>
    </article>
  );
};

export { HeroSection };
