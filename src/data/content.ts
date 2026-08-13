import { assets } from './assets';

export const nav = {
  brand: 'Portfolio Designer Art Director',
  links: [
    { label: 'Home', href: '/#home' },
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
  ],
  cta: { label: 'Let\u2019s grab a coffee', href: '/#contact' },
} as const;

export const hero = {
  wordmark: assets.wordmark,
  wordmarkAlt: 'SILVI',
  tagline: 'Germany based Creative Designer',
} as const;

export const about = {
  statement:
    'I\u2019m Silvia Castillo Angulo Creative Director, born in Yue-Yang raised in Valencia and little of Germany . With over four years of experience in creative agencies around the world.',
  education: [
    'Master of Arts in Communication Design - Hochschule Mainz',
    'Bachelor in Design and Creative Technologies - Universitat polit\u00e8cnica de Val\u00e8ncia',
  ],
} as const;

export const contact = {
  label: 'Let\u2019s grab a coffee',
  statement: 'Looking forward to new projects and opportunities.',
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/nomilkhouse/' },
    {
      label: 'Linkedin',
      href: 'https://linkedin.com/in/silvia-castillo-angulo-56a757172',
    },
    {
      label: 'castilloangulosilvia@gmail.com',
      href: 'mailto:castilloangulosilvia@gmail.com',
    },
    { label: '+34 618 767 504', href: 'tel:+34618767504' },
  ],
} as const;
