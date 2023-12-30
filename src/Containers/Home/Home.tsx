import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {useEffect} from 'react';
import {getCategories} from '../../store/CategoryThunk';
import {deleteTransactions, getTransactions} from '../../store/TransactionThunk';
import Spinner from '../../Components/UI/Spinner/Spinner';
import TransactionCard from '../../Components/TransactionCard/TransactionCard';

const Home = () => {
  const transaction = useSelector((state: RootState) => state.transactions.transactions);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const total = useSelector((state: RootState) => state.transactions.total);
  const isLoading = useSelector((state: RootState) => state.transactions.isLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch]);

  const deleteTransactionsById = async (id: string) => {
    await dispatch(deleteTransactions(id));
    dispatch(getTransactions());
  };

  return categories && (
      <>
        {isLoading ? <Spinner/> :
            <>
              <h4 className="mt-2">Balance {total} KGS</h4>

              {transaction.length === 0 ? <h4>No transactions</h4> :
                  <>
                    {transaction.map(transaction => (
                        <TransactionCard
                            key={transaction.id}
                            categories={categories}
                            transaction={transaction}
                            deleteTransactionsById={deleteTransactionsById}
                        />
                    ))}
                  </>
              }
            </>
        }
      </>
  );
};

export default Home;