import { ColorType } from './data/colors';

export type PriorityType = 1 | 2 | 3 | 4;

export interface LabelIncompleteType {
  name: string;
  color?: ColorType;
  id?: string;
}
export interface LabelType extends LabelIncompleteType {
  id: string;
}

export interface TaskIncompleteType {
  name: string;
  description: string;
  priority: PriorityType;
  due?: Date;
  label?: LabelType;
  date?: Date;
  id?: string;
}

export interface TaskType extends TaskIncompleteType {
  date: Date;
  id: string;
}
