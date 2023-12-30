import React from 'react';
import {ICategory, ITransaction} from '../../types';
import dayjs from 'dayjs';


interface Props {
  transaction: ITransaction;
  categories: ICategory[],
  deleteTransactionsById: (id: string) => void;
}

const TransactionCard: React.FC<Props> = ({categories, transaction, deleteTransactionsById }) => {
  let categoryFromTransaction: string = transaction.category;

  categories.map(category => {
    if (category.id === categoryFromTransaction) {
      categoryFromTransaction = category.title;
    }
  });

  return (
    <>
      <div className="card w-25 mx-auto p-4 mb-3">
        <div className="card-body">
          <h5 className="card-title">{transaction.title}</h5>
          <p className="card-text">   {transaction.type === 'income' ?
            <p className="text-success"><b>+{transaction.transactionSum}</b></p> :
            <p className="text-danger"><b>-{transaction.transactionSum}</b></p>
          }</p>
          <p className="card-text"><b>Category</b> {categoryFromTransaction}</p>
          <p className="card-text"><b>Type</b> {transaction.type}</p>
          <p className="card-text"><b>Date</b> {dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}</p>
        </div>

        <button
          onClick={() => deleteTransactionsById(transaction.id)}
          type="button"
          className="ms-3 btn btn-danger"
        >Delete</button>
      </div>
    </>
  );
};


export default TransactionCard;