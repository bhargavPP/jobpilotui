// src/app/features/resume/models/resume-upsert-request.model.ts

import {
  PersonalInfo,
  EducationEntry,
  SkillSet,
  CustomSection,
} from './resume.model';

export interface ResumeUpsertRequest {

  contact: PersonalInfo;

  summary: string;

  experience: ExperienceEntryDto[];

  education: EducationEntry[];

  skills: SkillSet;

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
