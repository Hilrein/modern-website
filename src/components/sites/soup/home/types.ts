export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  asciiArt: string;
  color: string;
  scale: number;
  scaleY: number;
}

export interface PricingTier {
  badge: string;
  title: string;
  description: string;
  price: string;
  byline?: string;
  ctaText: string;
  ctaHref: string;
  points: string[];
}

export interface TestimonialCard {
  company: string;
  overview: string;
  name: string;
  role: string;
  imageSrc: string;
  activeBoxes?: boolean;
}

export interface LargeTestimonial {
  name: string;
  role: string;
  quote: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TrustItem {
  text: string;
  useLogoMark?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}
