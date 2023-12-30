
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from '../../app/store';
import TransactionForm from '../../Components/TransactionForm/TransactionForm';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {addTransaction} from '../../store/TransactionThunk';
import {ITransactionForm} from '../../types';


const AddTransaction = () => {
    const isLoading = useSelector((state: RootState) => state.transactions.isLoading);
    const dispatch: AppDispatch = useDispatch();
    const Navigation = useNavigate();
    const [transaction, setTransactions] = useState<ITransactionForm>({
        transactionSum: 0,
        type: 'income',
        category: '',
        date: new Date().toISOString(),
    });

    const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransactions((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

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

    return (
        <div>
            <>
                {isLoading ? <Spinner/> :
                    <>
                        <TransactionForm onFormSubmit={onFormSubmit} changeForm={changeForm} transaction={transaction} btnText='Add'
                        />
                    </>
                }
            </>
        </div>
    );
};

export default AddTransaction;