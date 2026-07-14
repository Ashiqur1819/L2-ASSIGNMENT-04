export interface ITechnicianProfile {
  bio: string;
  experience: number;
  location: string;
  hourlyRate: number;
}

export interface IUpdateTechnicianProfile {
  bio?: string;
  experience?: number;
  location?: string;
  hourlyRate?: number;
}
