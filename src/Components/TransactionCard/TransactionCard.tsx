import {ITransaction} from '../../types';
import React from 'react';
import {deleteTransactions, getTransactions} from '../../store/TransactionThunk';
import {AppDispatch} from '../../app/store';
import {useDispatch} from 'react-redux';


interface Props {
  transaction: ITransaction
}

const TransactionCard: React.FC<Props> = ({transaction}) => {
  const dispatch: AppDispatch = useDispatch();
  const deleteTransactionsById = async (id: string) => {
    await dispatch(deleteTransactions(id));
    dispatch(getTransactions());
  };

  return (
    <>
      <div className="card w-25 mx-auto p-4 mb-3">
        <div className="card-body">
          <h5 className="card-title">{transaction.title}</h5>
          <p className="card-text">   {transaction.type === 'income' ?
            <p className="text-success"><b>+{transaction.transactionSum}</b></p> :
            <p className="text-danger"><b>-{transaction.transactionSum}</b></p>
          }</p>
          <p className="card-text"><b>Category</b> {transaction.category}</p>
          <p className="card-text"><b>Type</b> {transaction.type}</p>
          <p className="card-text"><b>Date</b> {transaction.date}</p>
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