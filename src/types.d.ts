export interface ITransaction {
  id: string;
  title: string;
  transactionSum: number;
  type: string;
  category: string;
  date: string;
}

export interface  ICategoryForm {
  title: string;
  type: string;
}

export interface  ICategory {
  id: string;
  title: string;
  type: string;
}