import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type !== 'income') {
      if (type !== 'outcome') {
        throw Error(`Type must be 'income' or 'outcome'`);
      }
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.income - balance.outcome < value) {
      throw Error('Não tem saldo suficiente.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
