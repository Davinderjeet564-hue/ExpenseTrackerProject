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
        <h2 className="text-white font-bold text-2xl mb-4 ml-8">Recent Expenses</h2>
        {expense.length === 0 && (
          <p className="text-white/50 text-center">No expenses yet</p>
        )}
        <div className="flex justify-center items-center gap-4 flex-1 flex-wrap">
            {expense.map((transaction) => (
            <div className="card card-border bg-neutral/30 bg-base-100 w-96 flex">
                <div key={transaction.id} className="card-body">
                    <div className="card-actions justify-end">
                        <button className="btn bg-gray-900 hover:bg-gray-800 text-white rounded-full" onClick={() => onEdit(transaction)}><FaEdit /></button>
                        <button className="btn bg-gray-900 hover:bg-gray-800 text-white rounded-full" onClick={() => onDelete(transaction.id)}><MdDeleteOutline /></button>
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