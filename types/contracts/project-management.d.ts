/**
 * Project Management Feature Contract
 * 
 * This contract defines the core types, interfaces, and service methods
 * for the project management system with kanban boards, task management, and team collaboration.
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  progress: number; // 0-100
  ownerId: string;
  teamId?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  reporterId: string;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  labels?: string[];
  attachments?: string[];
  subtasks?: Subtask[];
  dependencies?: string[]; // Task IDs
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  description?: string;
  completed: boolean;
  assigneeId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  goal?: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  capacity?: number; // Story points or hours
  velocity?: number; // Completed story points or hours
  tasks: string[]; // Task IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  projects: string[]; // Project IDs
  settings: TeamSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions: TeamPermissions;
  joinedAt: Date;
  invitedBy?: string;
}

export interface TeamSettings {
  allowMemberInvites: boolean;
  allowProjectCreation: boolean;
  allowTaskAssignment: boolean;
  defaultTaskPriority: 'low' | 'medium' | 'high' | 'urgent';
  defaultSprintDuration: number; // in days
  workingHours: {
    start: string; // HH:MM format
    end: string; // HH:MM format
    days: number[]; // 0-6 (Sunday-Saturday)
  };
  notifications: {
    email: boolean;
    inApp: boolean;
    slack?: string; // Slack webhook URL
  };
}

export interface TeamPermissions {
  canCreateProjects: boolean;
  canEditProjects: boolean;
  canDeleteProjects: boolean;
  canCreateTasks: boolean;
  canEditTasks: boolean;
  canDeleteTasks: boolean;
  canAssignTasks: boolean;
  canCreateSprints: boolean;
  canEditSprints: boolean;
  canDeleteSprints: boolean;
  canInviteMembers: boolean;
  canRemoveMembers: boolean;
  canManageSettings: boolean;
}

// ============================================================================
// KANBAN TYPES
// ============================================================================

export interface KanbanBoard {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  columns: KanbanColumn[];
  settings: KanbanSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface KanbanColumn {
  id: string;
  boardId: string;
  name: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  position: number;
  color?: string;
  wipLimit?: number; // Work in Progress limit
  tasks: string[]; // Task IDs
}

export interface KanbanSettings {
  showTaskCount: boolean;
  showAssignee: boolean;
  showDueDate: boolean;
  showPriority: boolean;
  showLabels: boolean;
  allowDragDrop: boolean;
  autoArchiveCompleted: boolean;
  archiveAfterDays: number;
}

// ============================================================================
// TIME TRACKING TYPES
// ============================================================================

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  billable: boolean;
  hourlyRate?: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeTrackingSettings {
  allowManualEntry: boolean;
  requireDescription: boolean;
  defaultBillable: boolean;
  defaultHourlyRate?: number;
  roundingRules: {
    enabled: boolean;
    interval: number; // in minutes
    roundUp: boolean;
  };
  breakTracking: {
    enabled: boolean;
    autoBreak: boolean;
    breakDuration: number; // in minutes
  };
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface ProjectAnalytics {
  projectId: string;
  period: 'week' | 'month' | 'quarter' | 'year';
  metrics: {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    averageTaskCompletionTime: number; // in hours
    teamVelocity: number; // story points or hours per sprint
    burndownRate: number; // percentage
    budgetUtilization: number; // percentage
    teamUtilization: number; // percentage
  };
  trends: {
    taskCompletion: TrendData[];
    teamVelocity: TrendData[];
    budgetSpent: TrendData[];
    timeTracking: TrendData[];
  };
  breakdown: {
    tasksByStatus: Record<string, number>;
    tasksByPriority: Record<string, number>;
    tasksByAssignee: Record<string, number>;
    timeByCategory: Record<string, number>;
  };
  generatedAt: Date;
}

export interface TrendData {
  date: string;
  value: number;
  change: number; // percentage change from previous period
  status: 'improving' | 'stable' | 'degrading';
}

// ============================================================================
// SERVICE INTERFACE
// ============================================================================

export interface IProjectManagementService {
  // Project Management
  getProjects(userId: string, filters?: ProjectFilters): Promise<Project[]>;
  getProject(projectId: string): Promise<Project>;
  createProject(userId: string, data: CreateProjectData): Promise<Project>;
  updateProject(projectId: string, data: UpdateProjectData): Promise<Project>;
  deleteProject(projectId: string): Promise<{ success: boolean }>;
  
  // Task Management
  getTasks(projectId: string, filters?: TaskFilters): Promise<Task[]>;
  getTask(taskId: string): Promise<Task>;
  createTask(projectId: string, data: CreateTaskData): Promise<Task>;
  updateTask(taskId: string, data: UpdateTaskData): Promise<Task>;
  deleteTask(taskId: string): Promise<{ success: boolean }>;
  moveTask(taskId: string, newStatus: string, newPosition?: number): Promise<Task>;
  
  // Sprint Management
  getSprints(projectId: string): Promise<Sprint[]>;
  getSprint(sprintId: string): Promise<Sprint>;
  createSprint(projectId: string, data: CreateSprintData): Promise<Sprint>;
  updateSprint(sprintId: string, data: UpdateSprintData): Promise<Sprint>;
  deleteSprint(sprintId: string): Promise<{ success: boolean }>;
  startSprint(sprintId: string): Promise<Sprint>;
  completeSprint(sprintId: string): Promise<Sprint>;
  
  // Team Management
  getTeams(userId: string): Promise<Team[]>;
  getTeam(teamId: string): Promise<Team>;
  createTeam(userId: string, data: CreateTeamData): Promise<Team>;
  updateTeam(teamId: string, data: UpdateTeamData): Promise<Team>;
  deleteTeam(teamId: string): Promise<{ success: boolean }>;
  inviteTeamMember(teamId: string, data: InviteTeamMemberData): Promise<{ success: boolean }>;
  removeTeamMember(teamId: string, userId: string): Promise<{ success: boolean }>;
  updateTeamMemberRole(teamId: string, userId: string, role: string): Promise<TeamMember>;
  
  // Kanban Management
  getKanbanBoard(projectId: string): Promise<KanbanBoard>;
  createKanbanBoard(projectId: string, data: CreateKanbanBoardData): Promise<KanbanBoard>;
  updateKanbanBoard(boardId: string, data: UpdateKanbanBoardData): Promise<KanbanBoard>;
  deleteKanbanBoard(boardId: string): Promise<{ success: boolean }>;
  
  // Time Tracking
  getTimeEntries(taskId: string, filters?: TimeEntryFilters): Promise<TimeEntry[]>;
  createTimeEntry(taskId: string, data: CreateTimeEntryData): Promise<TimeEntry>;
  updateTimeEntry(entryId: string, data: UpdateTimeEntryData): Promise<TimeEntry>;
  deleteTimeEntry(entryId: string): Promise<{ success: boolean }>;
  startTimeTracking(taskId: string, userId: string): Promise<TimeEntry>;
  stopTimeTracking(entryId: string): Promise<TimeEntry>;
  
  // Analytics
  getProjectAnalytics(projectId: string, period: string): Promise<ProjectAnalytics>;
  getTeamAnalytics(teamId: string, period: string): Promise<any>;
  getTimeTrackingReport(projectId: string, dateRange: DateRange): Promise<any>;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface ProjectFilters {
  status?: 'active' | 'completed' | 'on_hold' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  ownerId?: string;
  teamId?: string;
  tags?: string[];
  dateRange?: DateRange;
  limit?: number;
  offset?: number;
}

export interface TaskFilters {
  status?: 'todo' | 'in_progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  reporterId?: string;
  labels?: string[];
  dueDateRange?: DateRange;
  limit?: number;
  offset?: number;
}

export interface TimeEntryFilters {
  userId?: string;
  dateRange?: DateRange;
  billable?: boolean;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

// ============================================================================
// CREATE/UPDATE DATA TYPES
// ============================================================================

export interface CreateProjectData {
  name: string;
  description?: string;
  status?: 'active' | 'completed' | 'on_hold' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  teamId?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  status?: 'active' | 'completed' | 'on_hold' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  progress?: number;
  teamId?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  dueDate?: Date;
  estimatedHours?: number;
  labels?: string[];
  attachments?: string[];
  subtasks?: Omit<Subtask, 'id' | 'taskId' | 'createdAt' | 'updatedAt'>[];
  dependencies?: string[];
  metadata?: Record<string, any>;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  labels?: string[];
  attachments?: string[];
  subtasks?: Omit<Subtask, 'id' | 'taskId' | 'createdAt' | 'updatedAt'>[];
  dependencies?: string[];
  metadata?: Record<string, any>;
}

export interface CreateSprintData {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  goal?: string;
  capacity?: number;
}

export interface UpdateSprintData {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  goal?: string;
  capacity?: number;
  velocity?: number;
  status?: 'planning' | 'active' | 'completed' | 'cancelled';
}

export interface CreateTeamData {
  name: string;
  description?: string;
  settings?: Partial<TeamSettings>;
}

export interface UpdateTeamData {
  name?: string;
  description?: string;
  settings?: Partial<TeamSettings>;
}

export interface InviteTeamMemberData {
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions?: Partial<TeamPermissions>;
}

export interface CreateKanbanBoardData {
  name: string;
  description?: string;
  settings?: Partial<KanbanSettings>;
}

export interface UpdateKanbanBoardData {
  name?: string;
  description?: string;
  settings?: Partial<KanbanSettings>;
}

export interface CreateTimeEntryData {
  description?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  billable?: boolean;
  hourlyRate?: number;
  tags?: string[];
}

export interface UpdateTimeEntryData {
  description?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  billable?: boolean;
  hourlyRate?: number;
  tags?: string[];
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
