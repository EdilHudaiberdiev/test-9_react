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

  // let totalSum = 0;


  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <>
      {isLoading ? <Spinner/> :
        <>
          <h6>Total:
            {}
          </h6>
          {transaction.length === 0 ? <h4>No contacts</h4> :
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