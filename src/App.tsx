import { useMemo } from 'react';
import { Transaction } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { Summary } from './components/Summary';
import './App.css';

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.totalIncome += curr.amount;
        } else {
          acc.totalExpense += curr.amount;
        }
        acc.balance = acc.totalIncome - acc.totalExpense;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0 }
    );
  }, [transactions]);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>Para Takip Uygulaması</h1>
      
      <Summary summary={summary} />
      
      <TransactionForm onSubmit={handleAddTransaction} />
      
      <TransactionList
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}

export default App;