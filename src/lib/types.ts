// HYco 대시보드 타입 정의

export type ProjectStatus = 'active' | 'monitoring' | 'archived';

export interface Project {
  slug: string;
  name: string;
  emoji: string;
  completion: number;
  status: ProjectStatus;
  domain: string;
  revenueModel: string;
  revenueStatus: string;
  color: string;
  nextTasks: string[];
  pendingDecisions: PendingDecision[];
  lastUpdated: string;
  description: string;
  techStack: string[];
  brainHighlights: string[];
}

export interface PendingDecision {
  item: string;
  date: string;
  daysPending: number;
}

export interface KpiSnapshot {
  monthlyRevenue: string;
  monthlyRevenueStatus: 'green' | 'yellow' | 'red';
  adSenseSites: number;
  weeklyCommits: number;
  pendingDecisions: number;
  inboxCount: number;
  activeProjects: number;
}

export interface Approval {
  id: string;
  project: string;
  projectSlug: string;
  item: string;
  registeredDate: string;
  daysPending: number;
  urgency: 'normal' | 'warning' | 'critical';
}

export interface HyDirectTask {
  item: string;
  project: string;
  memo: string;
}

export interface LogEntry {
  date: string;
  sessionType: string;
  projectSlug?: string;
  summary: string;
  items: LogItem[];
}

export interface LogItem {
  category: string;
  title: string;
  result: string;
  status: 'done' | 'pending' | 'skipped';
}

export interface SystemScript {
  name: string;
  file: string;
  status: 'running' | 'ready' | 'idle';
  description: string;
}
