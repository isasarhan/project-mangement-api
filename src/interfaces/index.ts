export interface IComment {
  user: string;
  text: string;
  createdAt?: Date;
}

export interface IBoard {
  title: string;
  lists?: string[];
  users?: string[];
  createdAt?: Date;
}
export enum TaskStatus {
  Complete = "complete",
  Finished = "finished",
  OnHold = "onHold",
  Discarded = "discarded",
}

export interface ICard {
  title: string;
  customer?: string;
  Members?: [string];
  status?: TaskStatus;
  members?: string[];
  description?: string;
  labels?: string[];
  quantity?: number;
  type?: string;
  dueDate?: Date;
  comments?: IComment[];
  createdAt?: Date;
}

export interface IUser {
  username: string,
  email: string,
  password: string,
  createdAt?: Date
}

export interface IList {
  title: string;
  cards?: string[];
  createdAt?: Date;
}
export interface ICustomer {
  name: string;
  location?: string;
  number?: string;
  description?: string;
}