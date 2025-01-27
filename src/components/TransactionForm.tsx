import { useState } from 'react';
import { Transaction } from '../types';

interface Props {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories = {
  income: ['Maaş', 'Freelance', 'Yatırım', 'Diğer Gelir'],
  expense: ['Market', 'Kira', 'Faturalar', 'Ulaşım', 'Sağlık', 'Eğlence', 'Diğer']
};

export function TransactionForm({ onSubmit }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState(categories.expense[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    });

    setDescription('');
    setAmount('');
  };

  const handleTypeChange = (newType: 'income' | 'expense') => {
    setType(newType);
    setCategory(categories[newType][0]);
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label htmlFor="description">Açıklama:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Miktar (₺):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Tür:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value as 'income' | 'expense')}
          >
            <option value="income">Gelir</option>
            <option value="expense">Gider</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories[type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit">Ekle</button>
    </form>
  );
}