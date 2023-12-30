import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {useEffect} from 'react';
import {getTransactions} from '../../store/TransactionThunk';
import Spinner from '../../Components/UI/Spinner/Spinner';
import TransactionCard from '../../Components/TransactionCard/TransactionCard';

const Home = () => {

  const transaction = useSelector((state: RootState) => state.transactions.transactions);
  const isLoading = useSelector((state: RootState) => state.transactions.isLoading);
  const dispatch: AppDispatch = useDispatch();

  let total = 0;
  transaction.forEach(item => {
    if (item.type === 'income') {
      total += +item.transactionSum;
    } else {
      total -= +item.transactionSum;
    }
  });

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <>
      {isLoading ? <Spinner/> :
        <>
          <h4 className="mt-2">Balance {total} KGS</h4>

          {transaction.length === 0 ? <h4>No transactions</h4> :
            <>
              {transaction.map(transaction => (
                <TransactionCard key={transaction.id} transaction={transaction}/>
              ))}
            </>
          }
        </>
      }
    </>
  );
};

export default Home;