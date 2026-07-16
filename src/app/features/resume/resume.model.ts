// src/app/features/resume/models/resume.model.ts

export interface ResumeProfile {

  id: string;

  userId: string;

  summary: string;

  experience: ExperienceEntry[];

  education: EducationEntry[];

  skills: SkillSet;

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

  institution: string;

  degree: string;

  graduationDate: string | null;

}

export interface SkillSet {

  languages: string[];

  frameworks: string[];

  cloud: string[];

  devOps: string[];

  databases: string[];

}
