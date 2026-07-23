export interface ApplicationSummary {
  id: string;
  companyName: string;
  jobTitle: string;
  status: string;
  matchScore: number;
  atsScore: number;
  createdAt: string;
}

export interface ApplicationDetails {
  id: string;
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  jobDescriptionRaw: string;
  status: string;
  matchScore: number;
  atsScore: number;

  tailoredResume: any;

  coverLetter: string;

  missingSkills: string[];

  recommendations: string[];

  createdAt: string;
}

export interface UpdateApplicationStatusRequest {
  status: string;
}
 
