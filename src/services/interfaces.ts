export interface BoardData {
  id: string;
  title: string;
}

export interface ColumnData {
  id: string;
  title: string;
  order: number;
  tasks: TaskData[];
}

export interface ColumnType {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface TaskData {
  id: string;
  title: string;
  order: 1;
  done: false;
  description: string;
  userId: string;
  files: [
    {
      filename: string;
      fileSize: number;
    }
  ];
}

export interface UpdateTask {
  id: string;
  title: string;
  order: 1;
  description: string;
  userId: string;
  columnId: string;
  boardId: string;
}

export interface SignInForm {
  name: string;
  login: string;
  password: string;
  repeatPassword: string;
}

export interface boardColumns {
  body?: {
    title?: string;
    order?: number;
    description?: string;
    userId?: string;
    boardId?: string;
    columnId?: string;
  };
  boardId?: string;
  token?: string;
  columnId?: string;
  path?: string;
  method?: string;
  taskId?: string;
}

export interface UserInfo {
  id: string;
  name: string;
  login: string;
}
