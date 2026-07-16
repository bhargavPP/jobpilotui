// src/app/features/resume/models/resume-upsert-request.model.ts

import {
  EducationEntry,
  SkillSet
} from './resume.model';

export interface ResumeUpsertRequest {

  summary: string;

  experience: ExperienceEntryDto[];

  education: EducationEntry[];

  skills: SkillSet;

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
