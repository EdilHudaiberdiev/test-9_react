// import {useDispatch, useSelector} from 'react-redux';
// import {AppDispatch, RootState} from '../../app/store';
import {ITransaction} from '../../types';


interface Props {
  transaction: ITransaction
}

const TransactionCard: React.FC<Props> = ({transaction}) => {

  // const isLoading = useSelector((state: RootState) => state.transactions.isLoading);
  // const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <div className="card w-100">
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
      </div>
    </>
  );
};


export default TransactionCard;