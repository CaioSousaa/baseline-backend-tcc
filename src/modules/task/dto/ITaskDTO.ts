export interface ITaskDTO {
  title: string;
  description: string;
  status?: 'todo' | 'in_progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  dueDate: Date;
  owner: string;
  tags?: string[];
  alert?: string;
}
