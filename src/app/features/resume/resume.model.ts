// src/app/features/resume/models/resume.model.ts
export interface PersonalInfo {

  fullName: string;

  email: string;

  phone: string;

  location: string;

  linkedIn?: string;

  gitHub?: string;

  portfolio?: string;

}
export interface ResumeProfile {

  id: string;

  userId: string;
  contact: PersonalInfo; 
  summary: string;

  experience: ExperienceEntry[];

  education: EducationEntry[];

  skillCategories: SkillCategory[];

  customSections: CustomSection[];
  sections: ResumeSection[];

  version: number;

  updatedAt: string;

}

export interface ExperienceEntry {

  id: string;

  company: string;

  title: string;

  startDate: string;

  endDate: string | null;

  bullets: Bullet[];

}

export interface Bullet {

  id: string;

  text: string;

  tags: string[];

}

export interface EducationEntry {
  id: string;
  institution: string;

  degree: string;

  graduationDate: string | null;

}
export interface SkillCategory {

  id: string;

  name: string;

  skills: string[];

}
// export interface SkillSet {

//   languages: string[];

//   frameworks: string[];

//   cloud: string[];

//   devOps: string[];

//   databases: string[];

// }
export interface ResumeSection {

  id: string;

  title: string;

  items: ResumeSectionItem[];

  order: number;

}
export interface ResumeSectionItem {

  id: string;

  text: string;

}
export interface CustomSection {

  id: string;

  title: string;

  order: number;

  items: CustomSectionItem[];

}

export interface CustomSectionItem {

  id: string;

  text: string;

}
