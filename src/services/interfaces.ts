export interface BoardData {
  id: string;
  title: string;
}

export interface ColumnData {
  id: string;
  title: string;
  order: number;
}

export interface SignInForm {
  name: string;
  login: string;
  password: string;
  repeatPassword: string;
}
