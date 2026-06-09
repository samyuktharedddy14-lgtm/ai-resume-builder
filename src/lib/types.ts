export interface ResumeData {
  id?: string;
  title: string;
  template_id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string[];
  projects: ProjectEntry[];
  certifications: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  cgpa: string;
  start_date: string;
  end_date: string;
}

export interface ExperienceEntry {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export type TemplateId = 'modern' | 'classic' | 'minimal' | 'bold' | 'elegant';

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines with a professional sidebar layout. Perfect for tech roles.',
    category: 'Tech & Startup',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format with timeless elegance. Ideal for corporate and academic roles.',
    category: 'Corporate',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Stripped-down design focusing on content. Great for creative fields.',
    category: 'Creative',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong visual hierarchy with prominent headers. Makes a statement.',
    category: 'Leadership',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined typography with sophisticated spacing. For executive-level resumes.',
    category: 'Executive',
  },
];

export const EMPTY_RESUME: ResumeData = {
  title: 'My Resume',
  template_id: 'modern',
  full_name: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  website: '',
  summary: '',
  education: [{ institution: '', degree: '', field: '', cgpa: '', start_date: '', end_date: '' }],
  experience: [{ company: '', position: '', start_date: '', end_date: '', description: '' }],
  skills: [],
  projects: [{ name: '', description: '', technologies: '', link: '' }],
  certifications: [],
};
