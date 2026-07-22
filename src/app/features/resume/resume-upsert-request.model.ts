// src/app/features/resume/models/resume-upsert-request.model.ts

import {
  PersonalInfo,
  EducationEntry,
  SkillCategory,
  CustomSection,
} from './resume.model';

export interface ResumeUpsertRequest {

  contact: PersonalInfo;

  summary: string;

  experience: ExperienceEntryDto[];

  education: EducationEntry[];
  skillCategories: SkillCategory[];

  customSections: CustomSection[];

}

export interface ExperienceEntryDto {

  id: string;

  company: string;

  title: string;

  startDate: string;

  endDate: string | null;

  bullets: BulletDto[];

}

export interface BulletDto {

  id: string;

  text: string;

  tags: string[];

}
