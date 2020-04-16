import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(trans => trans.type === 'income')
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);
    const outcome = this.transactions
      .filter(trans => trans.type === 'outcome')
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const { title, value, type } = data;
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
