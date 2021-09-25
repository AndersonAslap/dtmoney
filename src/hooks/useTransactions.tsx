import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';


interface Transaction {
    id: number;
    title: string;
    value: number;
    type: string;
    category: string;
    createdAt: Date;
}

interface TransactionProviderProps {
    children: ReactNode
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContext {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionsContext>(
    {} as TransactionsContext
);

export function TransactionProvider( { children } : TransactionProviderProps ) {

    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('http://localhost:3000/api/transactions')
        .then(response => setTransaction(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});
        const { transaction } = response.data; 

        setTransaction([
            ...transactions,
            transaction
        ])

    }

    return(
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    );

}

export function useTransactions() {
    const context = useContext(TransactionContext);

    return context;
}