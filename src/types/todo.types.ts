export interface TodoItem {
  text: string;
  completed?: boolean;
}

export type FilterType = 'All' | 'Active' | 'Completed';
