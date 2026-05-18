export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'professional' | 'internship';
}

export interface Project {
  title: string;
  category: string;
  description: string;
  impact: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CVData {
  name: string;
  title: string;
  location: string;
  tagline: string;
  about: string;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
}
