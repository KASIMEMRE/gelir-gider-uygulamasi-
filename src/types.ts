export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    category: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    color: string;
  }
  
  export interface TransactionSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  }