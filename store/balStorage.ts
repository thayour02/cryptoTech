import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
// import { zustandStorage } from './mmkv';
import { zustandStorage } from './mmkv'; 

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    description: string;
}

export interface BalanceState {
    transactions: Array<Transaction>;
    addTransaction: (transaction: Transaction) => void;
    removeTransaction: () => void;
    balance: () => number;
}

export const useBalanceStore = create<BalanceState>()(
    persist ((set,get) => ({
        transactions: [],
        addTransaction: (transaction: Transaction)=> {
            set((state) => ({transactions: [...state.transactions, transaction]}))
        },
        balance: () => get().transactions.reduce((acc, trans)=> acc + trans.amount, 0),

        removeTransaction:()=>{
            set({transactions: []})
        }
    }),{
        name:"balance-storage",
        storage: createJSONStorage(()=> zustandStorage)
    })
)