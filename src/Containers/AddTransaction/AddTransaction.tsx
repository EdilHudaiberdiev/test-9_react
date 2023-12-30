import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import TransactionForm from '../../Components/TransactionForm/TransactionForm';
import Spinner from '../../Components/UI/Spinner/Spinner';


const AddTransaction = () => {

  // const now = new Date();
  // const createdAt = now.toISOString();
  // const DateForSend = dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss');

  const isLoading = useSelector((state: RootState) => state.transactions.isLoading);


  return (
    <div>
      <>
        {isLoading ? <Spinner/> :
           <>
            <TransactionForm
            />
          </>
      }
    </>
  </div>
  );
};

export default AddTransaction;