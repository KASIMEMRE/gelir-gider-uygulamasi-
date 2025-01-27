import { TransactionSummary } from '../types';

interface Props {
  summary: TransactionSummary;
}

export function Summary({ summary }: Props) {
  return (
    <div className="summary">
      <div className="balance-card main">
        <h2>Toplam Bakiye</h2>
        <p className={summary.balance >= 0 ? 'positive' : 'negative'}>
          {summary.balance.toFixed(2)} ₺
        </p>
      </div>
      
      <div className="summary-cards">
        <div className="balance-card">
          <h3>Toplam Gelir</h3>
          <p className="positive">{summary.totalIncome.toFixed(2)} ₺</p>
        </div>
        
        <div className="balance-card">
          <h3>Toplam Gider</h3>
          <p className="negative">{summary.totalExpense.toFixed(2)} ₺</p>
        </div>
      </div>
    </div>
  );
}