export interface BoardData {
  id: string;
  title: string;
}

export interface ColumnData {
  id: string;
  title: string;
  order: number;
  description?: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
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
  };
  boardId?: string;
  token?: string;
  method: string;
  path: string;
}
