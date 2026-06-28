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
  currency: "usd" | string;
  type: "per_hour" | string;
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
  job_type: "short_term" | "long_term";
  title: string;
  client_name: string;
  description: string;
  cover_image_url: string | null;
  address: Address;
  compensation: Compensation;
  status: "running" | "marketplace" | string;
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

// Sub-Interfaces for Nested Objects
export interface JobClient {
  id: number;
  name: string;
  image_url: string | null;
}

export interface JobLocation {
  label: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

export interface JobTime {
  from: string;
  to: string;
  range: string;
}

export interface JobCompensation {
  amount: string; // Dynamic values input formatted text
  currency: string;
  type: string;
  label: string;
}

export interface JobAttendance {
  checked_in_at: string | null;
  checked_out_at: string | null;
  total_minutes: number;
  total_label: string | null;
}

export interface JobWorkingTime {
  total_minutes: number;
  total_label: string;
}

export interface JobReview {
  id: number;
  rating: number;
  review: string;
}

export interface JobActions {
  can_view_details: boolean;
  can_check_in: boolean;
  can_check_out: boolean;
  can_report_client: boolean;
  can_leave_review: boolean;
  can_view_review: boolean;
  view_details_url: string;
  check_in_url: string;
  check_out_url: string;
  reviews_url: string;
  report_client_url: string;
}

export interface JobModal {
  title: string;
  subtitle: string;
  date: string;
  time_range: string;
  can_check_in: boolean;
}

// Main Job Interface
export interface JobDetails {
  id: string; // Notice object output as alphanumeric dynamic id "long_term_1_2026-06-01"
  job_id: number;
  job_type: "long_term" | "short_term" | string; // Type restrict korar jonne generic string literal or standalone string
  job_type_label: string;
  title: string;
  client: JobClient;
  cover_image_url: string | null;
  description: string;
  description_preview: string;
  location: JobLocation;
  date: string;
  date_label: string;
  time: JobTime;
  compensation: JobCompensation;
  status: string;
  status_label: string;
  attendance: JobAttendance;
  working_time: JobWorkingTime;
  cancellation: string | null; // Null types dynamically set
  review: JobReview | null;
  actions: JobActions;
  modal: JobModal;
}

// Pratham structure (e.g., Existing or Signed Document)
export interface UserDocument {
  id: number;
  document_record_id: number;
  title: string;
  description: string;
  status: "signed" | "missing" | "pending" | string;
  signed_at: string | null;
  content_type: string;
  file_url: string | null;
  can_sign: boolean;
  can_view: boolean;
}

export interface RequiredDocument {
  id: number;
  key: string;
  document_record_id: number | null;
  title: string;
  description: string;
  status: "missing" | "uploaded" | "pending" | string;
  file_name: string | null;
  file_url: string | null;
  can_upload: boolean;
  can_view: boolean;
  can_replace: boolean;
  can_delete: boolean;
}

export interface AvailabilityDayType {
  id: number;
  day_of_week: number; 
  day_name: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | string;
  is_available: boolean;
  start_time: string; 
  end_time: string;   
}

export interface UnavailabilityType {
  id: number;
  title: string;
  start_date: string; 
  end_date: string;   
}
// Main Availability Sub-Object
export interface AvailabilityDataType {
  id: number;
  timezone: string; 
  days: AvailabilityDayType[];
}