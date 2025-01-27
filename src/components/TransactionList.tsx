import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

export function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="transactions">
      <h2>İşlemler</h2>
      {transactions.length === 0 ? (
        <p className="no-transactions">Henüz işlem bulunmamaktadır.</p>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`transaction-item ${transaction.type}`}
          >
            <div className="transaction-info">
              <span className="description">{transaction.description}</span>
              <div className="transaction-details">
                <span className="category">{transaction.category}</span>
                <span className="date">{transaction.date}</span>
              </div>
            </div>
            <div className="transaction-actions">
              <span className="amount">
                {transaction.type === 'income' ? '+' : '-'} {transaction.amount.toFixed(2)} ₺
              </span>
              <button
                className="delete-button"
                onClick={() => onDelete(transaction.id)}
                aria-label="Sil"
              >
                ×
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}