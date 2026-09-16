export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: string;
}

export interface BrandContact {
  email: string;
  phone: string;
  studio: string;
  hours: string;
}

export interface Brand {
  name: string;
  baker: string;
  tagline: string;
  heroHeadline: string;
  heroSubtext: string;
  heroImage: {
    src: string;
    alt: string;
  };
  intro: string;
  bio: string[];
  philosophy: string;
  portrait: {
    src: string;
    alt: string;
  };
  contact: BrandContact;
  socials: SocialLink[];
}
