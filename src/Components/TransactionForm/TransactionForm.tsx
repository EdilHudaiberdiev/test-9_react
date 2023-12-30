import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {getCategoriesByType} from '../../store/CategoryThunk';
import {ITransactionForm} from '../../types';

interface Props {
  onFormSubmit: (e: React.FormEvent) => void;
  changeForm: (e:  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  transaction: ITransactionForm;
  btnText: string;
}

const TransactionForm: React.FC<Props> = ({onFormSubmit, transaction, changeForm, btnText}) => {
  const dispatch: AppDispatch = useDispatch();
  const type = [
    {title: 'income', id: 'income'},
    {title: 'expense', id: 'expense'},
  ];
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    if (transaction.type !== undefined && transaction.type?.trim().length > 0) {
      dispatch(getCategoriesByType(transaction.type));
    }

  }, [transaction.type]);


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

          <select disabled={categories.length === 0} name="category" value={transaction.category}
                  onChange={e => changeForm(e)}>
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
                min={0}
                value={
                  transaction.transactionSum}
                onChange={e => changeForm(e)}
            />
          </div>

          <button disabled={transaction.category.trim().length === 0} type="submit" className="btn btn-primary">{btnText}
          </button>
        </form>
      </>
  );
};

export default TransactionForm;