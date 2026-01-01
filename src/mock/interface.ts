export type ReportType =
  | "kriminalitas"
  | "kebersihan"
  | "kesehatan"
  | "fasilitas"
  | "lainnya";
export type Visibility = "public" | "private" | "anonymous";
export type MediaType = "image" | "video" | "audio";
export type Status =
  | "submitted"
  | "verified"
  | "in_progress"
  | "resolved"
  | "rejected"
  | "escalated";
export type ActorRole = "citizen" | "officer" | "supervisor" | "system";

export interface Reporter {
  user_id: string;
  name: string;
  contact: {
    email: string;
    phone: string;
  };
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Media {
  media_id: string;
  type: MediaType;
  url: string;
  uploaded_at: string;
}

export interface ReportStatus {
  current: Status;
  updated_at: string;
}

export interface TimelineEntry {
  status: string;
  actor: {
    actor_id: string;
    actor_role: ActorRole;
  };
  note: string;
  timestamp: string;
}

export interface Votes {
  upvote_count: number;
  voters: string[];
}

export interface Authority {
  assigned_agency: string | null;
  assigned_unit: string | null;
  assigned_officer_id: string | null;
}

export interface Escalation {
  is_escalated: boolean;
  escalated_to: string | null;
  escalation_reason: string | null;
  escalated_at: string | null;
}

export interface Report {
  report_id: string;
  type: ReportType;
  title: string;
  description: string;
  visibility: Visibility;
  reporter: Reporter;
  location: Location;
  media: Media[];
  status: ReportStatus;
  timeline: TimelineEntry[];
  votes: Votes;
  authority: Authority;
  escalation: Escalation;
  created_at: string;
}
