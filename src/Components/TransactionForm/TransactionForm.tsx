import React, {ChangeEvent} from 'react';
import {ITransaction} from '../../types';


interface Props {
  transaction: ITransaction,
  onFormSubmit: (e: React.FormEvent) => void,
  changeForm:  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}

const TransactionForm: React.FC <Props> = ({transaction, changeForm, onFormSubmit}) => {



  const categories = [
    {title: 'Food', id: 'food'},
    {title: 'Salary', id: 'salary'},
    {title: 'Drinks', id: 'drinks'},
    {title: 'Other expenses', id: 'other-expenses'},
  ];

  const type = [
    {title: 'Income', id: 'income'},
    {title: 'Expense', id: 'expense'},
  ];



  return (
    <>
      <form onSubmit={e => onFormSubmit(e)}>
        <h2 className="text-center mb-4">Add transaction</h2>
        <select name="category" onChange={e => changeForm(e)}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={transaction.title}
            onChange={e => changeForm(e)}
          />
        </div>

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

        <select name="type" onChange={e => changeForm(e)}>
          {type.map(type => (
            <option key={type.id} value={type.id}>{type.title}</option>
          ))}
        </select>

        <h6 className="text-center mb-4">{transaction.date}</h6>

        <button type="submit" className="btn btn-primary">Add</button>


      </form>
    </>
  );
};

export default TransactionForm;