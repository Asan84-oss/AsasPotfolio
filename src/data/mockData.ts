export interface Project {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  name: string;
  imageUrl: string;
  projectUrl: string;
  description: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  clientName: string;
  clientImageUrl: string;
  reviewText: string;
  company: string;
}

export interface Biography {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  pitchTitle: string;
  bioText: string;
}

export const projects: Project[] = [
  {
    id: '1',
    persona: 'software_engineer',
    name: 'Neural Commerce Platform',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Full-stack e-commerce platform with AI-powered product recommendations, real-time inventory management, and seamless payment integration.',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    persona: 'software_engineer',
    name: 'CloudSync Dashboard',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Real-time cloud infrastructure monitoring dashboard with WebSocket connections, automated scaling alerts, and multi-provider support.',
    createdAt: '2024-03-20'
  },
  {
    id: '3',
    persona: 'software_engineer',
    name: 'DevOps Pipeline Automation',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'CI/CD pipeline automation tool with Docker orchestration, Kubernetes deployment scripts, and comprehensive testing suites.',
    createdAt: '2024-05-10'
  },
  {
    id: '4',
    persona: 'content_creator',
    name: 'The Digital Nomad Diaries',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'A visual storytelling series documenting the intersection of technology, culture, and remote work across African cities.',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    persona: 'content_creator',
    name: 'Tech & Culture Podcast',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Bilingual podcast exploring the African tech ecosystem, featuring interviews with founders, developers, and creative professionals.',
    createdAt: '2024-04-15'
  },
  {
    id: '6',
    persona: 'content_creator',
    name: 'Code & Creativity Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Educational content series teaching creative coding, generative art, and interactive design to aspiring developers in Central Africa.',
    createdAt: '2024-06-01'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    persona: 'software_engineer',
    clientName: 'Marie Tchoumi',
    clientImageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Samuel delivered an exceptional full-stack solution that exceeded our expectations. His attention to performance optimization and clean architecture is remarkable.',
    company: 'TechVentures Africa'
  },
  {
    id: '2',
    persona: 'software_engineer',
    clientName: 'David Nkomo',
    clientImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Working with Samuel was a game-changer for our startup. He built our entire backend infrastructure from scratch, handling complex real-time data flows with ease.',
    company: 'FinFlow Solutions'
  },
  {
    id: '3',
    persona: 'content_creator',
    clientName: 'Amina Bello',
    clientImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Samuel has a unique gift for translating complex technical concepts into engaging, accessible content. His bilingual approach makes tech truly inclusive.',
    company: 'AfriMedia Group'
  },
  {
    id: '4',
    persona: 'content_creator',
    clientName: 'Jean-Pierre Essomba',
    clientImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    reviewText: 'The content strategy Samuel developed for our brand tripled our engagement. His understanding of both the technical and creative sides is truly rare.',
    company: 'Digital Douala Agency'
  }
];

export const biography: Biography[] = [
  {
    id: '1',
    persona: 'software_engineer',
    pitchTitle: 'Building the Future, One Line at a Time',
    bioText: 'I\'m a full-stack software engineer based in Douala, Cameroon, specializing in building scalable web applications, cloud infrastructure, and developer tools. With expertise spanning React, Node.js, Python, and cloud-native architectures, I transform complex business requirements into elegant, performant solutions. My mission is to bridge the gap between African innovation and global technology standards.'
  },
  {
    id: '2',
    persona: 'content_creator',
    pitchTitle: 'Stories That Connect, Content That Inspires',
    bioText: 'As a bilingual content creator fluent in English and French, I craft compelling narratives that celebrate Africa\'s growing tech ecosystem. Through podcasts, visual storytelling, and educational content, I make technology accessible and inspiring. My work has reached audiences across 15+ African countries, fostering a community of creators who believe in the power of digital storytelling.'
  }
];
