import {FaEdit} from 'react-icons/fa';
import {MdDeleteOutline} from 'react-icons/md';
import type { Expense } from '../App';

interface ShowRecentTransactionsProps{
  expense:Expense[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Expense) => void;
}

function ShowRecentTransactions({ expense, onDelete, onEdit }: ShowRecentTransactionsProps) {
  return (
    <div className="flex mt-2 p-4">
      <div className="flex-1">
        <h2 className="font-bold text-2xl mb-4 ml-8">Recent Expenses</h2>
        {expense.length === 0 && (
          <p className="opacity-50 text-center">No expenses yet</p>
        )}
        <div className="flex justify-center items-center gap-4 flex-1 flex-wrap">
            {expense.map((transaction) => (
            <div key={transaction.id} className="card card-border bg-base-100 w-96 flex">
                <div className="card-body">
                    <div className="card-actions justify-end">
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={() => onEdit(transaction)} aria-label="Edit transaction"><FaEdit /></button>
                        <button className="btn btn-sm btn-circle btn-ghost text-error" onClick={() => onDelete(transaction.id)} aria-label="Delete transaction"><MdDeleteOutline /></button>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col">
                            <h1 className="card-title">${transaction.amount}</h1>
                            <p>{transaction.date}</p>
                        </div>
                        <h2 className="card-title">{transaction.text}</h2>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ShowRecentTransactions