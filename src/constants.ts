import { LucideIcon, Briefcase, Code2, GraduationCap, Cpu, Globe, Zap, MessageSquare, Send, User, Bot, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Project {
  title: string;
  company: string;
  description: string;
  tags: string[];
}

export const MOKHLES_DATA = {
  name: "Mokhles Elheni",
  title: "Senior Software Engineer (Amazon SDE II)",
  email: "elhenimokhles@gmail.com",
  linkedin: "https://www.linkedin.com/in/elhenimokhles/",
  summary: "Senior Software Engineer with 8+ years of experience architecting high-scale web applications and internal developer platforms. Specialized in React, TypeScript, and AWS, with deep expertise in data visualization and observability.",
  experience: [
    {
      company: "Amazon",
      role: "Software Development Engineer II",
      period: "Feb 2024 – Present",
      location: "Dublin, Ireland",
      description: [
        "Architected a high-scale observability platform ingesting millions of daily events.",
        "Led performance optimization initiatives achieving a 60% reduction in workflow execution time using GenAI (Amazon Bedrock).",
        "Owned frontend architecture and UX strategy for internal data products."
      ],
      skills: ["React", "TypeScript", "AWS", "GenAI", "Observability"]
    },
    {
      company: "Criteo",
      role: "Senior Software Engineer",
      period: "Feb 2023 – Jan 2024",
      location: "Paris, France",
      description: [
        "Engineered full-stack reporting solutions for advertisers to analyze campaign performance.",
        "Built and launched a predictive forecasting tool for budget simulation.",
        "Optimized dashboard performance and UX for deeper actionable insights."
      ],
      skills: ["React", "TypeScript", "Scala", "Data Visualization"]
    },
    {
      company: "Freelance / Tech Lead",
      role: "Senior Technical Consultant",
      period: "Jul 2018 – Jan 2023",
      location: "Paris, France",
      description: [
        "GEODIS: Led web team to launch a US-market parcel delivery platform (Node.js microservices).",
        "Disneyland Paris: Modernized User Profile and Reservation flows (React, GraphQL, Scala).",
        "Figaro Classifieds: Executed legacy migration of Figaro Immo platform to Go, Vue.js, ElasticSearch."
      ],
      skills: ["Node.js", "Microservices", "Go", "Vue.js", "GraphQL"]
    },
    {
      company: "GoMyCode",
      role: "Full Stack Engineer & Instructor",
      period: "Nov 2017 – May 2018",
      location: "Tunis, Tunisia",
      description: [
        "Developed and launched proprietary e-learning platform (LMS) utilizing React and Redux.",
        "Engineered adaptive learning algorithms using Python (TensorFlow, Keras)."
      ],
      skills: ["React", "Redux", "Python", "TensorFlow"]
    },
    {
      company: "Asayer (OpenReplay)",
      role: "Software Engineer",
      period: "Jul 2016 – Oct 2017",
      location: "Paris, France",
      description: [
        "Engineered core SaaS QA dashboard using React and Ruby on Rails.",
        "Built scalable serverless testing infrastructure on AWS Lambda."
      ],
      skills: ["React", "Ruby on Rails", "AWS Lambda", "Selenium"]
    }
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Scala", "Go", "SQL"],
    frontend: ["React", "Vue.js", "Next.js", "Redux", "Tailwind CSS"],
    backend: ["Node.js", "AWS", "GraphQL", "Ruby on Rails", "Express"],
    ai: ["GenAI Integration", "Amazon Bedrock", "Machine Learning"],
    architecture: ["Microservices", "Serverless", "Event-Driven", "ElasticSearch", "Redis"]
  },
  education: {
    school: "INSAT - Institut National des Sciences Appliquées et de Technologie",
    degree: "Diplôme d'ingénieur, Génie logiciel",
    period: "2012 – 2017",
    location: "Tunis, Tunisia"
  }
};
