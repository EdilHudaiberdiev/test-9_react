import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {editTransactionById, getTransactions} from '../../store/TransactionThunk';
import {ICategory, ITransaction, ITransactionForm} from '../../types';
import dayjs from 'dayjs';
import TransactionForm from '../TransactionForm/TransactionForm';
import CustomModal from '../UI/CustomModal/CustomModal';


interface Props {
  transaction: ITransaction;
  categories: ICategory[],
  deleteTransactionsById: (id: string) => void;
}

const TransactionCard: React.FC<Props> = ({categories, transaction, deleteTransactionsById }) => {
  const [transactionItem, setTransactionItem] = useState<ITransaction>(transaction);
  const dispatch: AppDispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  let categoryFromTransaction: string = transaction.category;

  categories.map(category => {
    if (category.id === categoryFromTransaction) {
      categoryFromTransaction = category.title;
    }
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTransactionItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const copyTransaction: ITransactionForm = {...transactionItem};

    if ('id' in copyTransaction && 'title' in copyTransaction && 'type' in copyTransaction) {
      delete copyTransaction.id;
      delete copyTransaction.title;
      delete copyTransaction.type;
    }

    copyTransaction.transactionSum = Number(copyTransaction.transactionSum);

    if (transaction.category.trim().length === 0) {
      confirm('Category must be selected');
    } else {
      try {
        await dispatch(editTransactionById({transaction: copyTransaction, id: transaction.id}));
        await dispatch(getTransactions());
      } catch (e) {
        alert('Something gone wrong');
      }
    }
  };

  return (
      <>
        <div className="card w-50 mx-auto p-4 mb-3">
          <div className="card-body">
            <h5 className="card-title">{transaction.title}</h5>
            <p className="card-text">   {transaction.type === 'income' ?
                <span className="text-success"><b>+{transaction.transactionSum}</b></span> :
                <span className="text-danger"><b>-{transaction.transactionSum}</b></span>
            }
            </p>
            <p className="card-text"><b>Category</b> {categoryFromTransaction}</p>
            <p className="card-text"><b>Type</b> {transaction.type}</p>
            <p className="card-text"><b>Date</b> {dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}</p>
          </div>

          <button className="btn btn-warning ms-3 mb-2" onClick={() => setOpenModal(true)}>Edit</button>

          <button
              onClick={() => deleteTransactionsById(transaction.id)}
              type="button"
              className="ms-3 btn btn-danger"
          >Delete</button>
        </div>

        <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
          <div>
            <TransactionForm
                onFormSubmit={onFormSubmit}
                changeForm={changeForm}
                transaction={transactionItem}
                btnText='Edit'
            />
            <button className="btn btn-warning" onClick={() => setOpenModal(false)}>Cancel</button>
          </div>
        </CustomModal>
      </>
  );
};


export default TransactionCard;