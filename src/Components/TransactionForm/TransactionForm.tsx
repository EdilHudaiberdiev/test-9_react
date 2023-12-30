import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from '../../app/store';
import {getCategoriesByType} from '../../store/CategoryThunk';
import {addTransaction} from '../../store/TransactionThunk';
import {ITransactionForm} from '../../types';

const TransactionForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const Navigation = useNavigate();
  const type = [
    {title: 'income', id: 'income'},
    {title: 'expense', id: 'expense'},
  ];
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [transaction, setTransactions] = useState<ITransactionForm>({
    transactionSum: 0,
    type: 'income',
    category: '',
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (transaction.type !== undefined && transaction.type?.trim().length > 0 ) {
      dispatch(getCategoriesByType(transaction.type));
    }

  }, [transaction.type]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const copyTransaction = {...transaction};
    delete copyTransaction.type;
    if (transaction.category.trim().length === 0) {
      confirm('Category must be selected');
    } else {
    try {
      await dispatch(addTransaction(transaction));
      Navigation('/');
    } catch (e) {
      alert('Something gone wrong');
      }
    }
  };

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTransactions((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
      <>
        <form onSubmit={e => onFormSubmit(e)}>
          <h2 className="text-center mb-4">Add transaction</h2>

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="type" className="form-label">Transaction Sum</label>
            <select name="type" onChange={e => changeForm(e)}>
              {type.map(type => (
                  <option key={type.id} value={type.id}>{type.title}</option>
              ))}
            </select>
          </div>

          <select disabled={categories.length === 0} name="category" value={transaction.category} onChange={e => changeForm(e)}>
            <option value="" disabled defaultValue={transaction.category}>Select category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="transactionSum" className="form-label">Transaction Sum</label>
          <input
            type="number"
            name="transactionSum"
            id="transactionSum"
            className="form-control"
            value={
              transaction.transactionSum}
            onChange={e => changeForm(e)}
          />
        </div>

          <button disabled={transaction.category.trim().length === 0} type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
};

export default TransactionForm;