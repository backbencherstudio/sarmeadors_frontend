declare global {
    interface Window {
      katex: typeof import("katex");
    }
  }


  export interface Address {
  line: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

export interface Compensation {
  amount: string;
  currency: 'usd' | string;
  type: 'per_hour' | string;
}

export interface Attendance {
  id: number;
  short_term_job_id?: number;
  long_term_job_id?: number;
  candidate_id: number;
  booking_date?: string;
  date?: string;
  check_in: string;
  check_out: string;
  is_absent?: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: number;
  job_type: 'short_term' | 'long_term';
  title: string;
  client_name: string;
  description: string;
  cover_image_url: string | null;
  address: Address;
  compensation: Compensation;
  status: 'running' | 'marketplace' | string;
  latest_attendance: Attendance | null;
  can_check_in: boolean;
  can_check_out: boolean;
}

export interface Candidate {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  image_url: string | null;
}

export interface DashboardStats {
  short_term_jobs: number;
  long_term_jobs: number;
  my_jobs: number;
  my_families: number;
}

// 1. Main Core Data Structure
export interface DashboardData {
  candidate: Candidate;
  stats: DashboardStats;
  running_jobs: Job[];
  available_jobs: Job[];
}

// 2. Final API Response Type
export interface DashboardAPIResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}