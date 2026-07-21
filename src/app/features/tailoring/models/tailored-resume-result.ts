import { ExperienceEntryDto } from './experience-entry';
import { SkillSet } from './skill-set';
import { AtsScoreResult } from './ats-score';
import { JdExtraction } from './jd-extraction';

export interface TailoredResumeResult {

  applicationId?: string;

  companyName?: string;

  jobTitle?: string;

  jobUrl?: string;

  tailoredSummary: string;

  experience: ExperienceEntryDto[];

  skills: SkillSet;

  extraction: JdExtraction;

  atsScore: AtsScoreResult;

  matchScore: number;

  missingSkills: string[];

  recommendations: string[];

  coverLetter: string;
}
