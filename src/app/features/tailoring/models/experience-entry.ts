export interface BulletDto {
  id: string;
  text: string;
  tags: string[];
}

export interface ExperienceEntryDto {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  bullets: BulletDto[];
}
