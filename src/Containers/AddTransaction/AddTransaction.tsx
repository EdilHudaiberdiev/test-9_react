import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {ITransaction} from '../../types';
import {addTransaction} from '../../store/TransactionThunk';
import Spinner from '../../Components/UI/Spinner/Spinner';
import TransactionForm from '../../Components/TransactionForm/TransactionForm';
import dayjs from 'dayjs';

const AddTransaction = () => {

  const now = new Date();
  const createdAt = now.toISOString();
  const DateForSend = dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss');

  const dispatch: AppDispatch = useDispatch();
  const Navigation = useNavigate();
  const isLoading = useSelector((state: RootState) => state.transactions.isLoading);
  const [transaction, setTransactions] = useState<ITransaction>({
    title: '',
    transactionSum: 0,
    type: '',
    category: '',
    date: DateForSend,
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTransactions((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addTransaction(transaction));
      Navigation('/');
    } catch (e) {
      alert('Something gone wrong');
    }
  };

  return (
    <div>
      <>
        {isLoading ? <Spinner/> :
          <TransactionForm
            transaction={transaction}
            onFormSubmit={onFormSubmit}
            changeForm={changeForm}
          />
        }
      </>
    </div>
  );
};

export default AddTransaction;