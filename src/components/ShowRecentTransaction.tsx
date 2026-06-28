import {FaEdit} from 'react-icons/fa';
import {MdDeleteOutline} from 'react-icons/md';
import type { Expense } from '../App';
import { IoBusOutline, IoFastFoodOutline } from "react-icons/io5";
import { FaFileInvoiceDollar, FaNewspaper, FaShirt } from "react-icons/fa6";
import { FaHome, FaRegQuestionCircle, FaShoppingBag } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";


interface ShowRecentTransactionsProps{
  expense:Expense[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Expense) => void;
}

function getIcon(category:string){
    switch(category){
        case "Groceries":
            return <FaShoppingBag size={20}/>
        case "Food":
            return <IoFastFoodOutline size={20}/>
        case "Transport":
            return <IoBusOutline size={20}/>
        case "Utilities":
            return <FaHome size={20}/>
        case "Shopping":
            return <FaShirt size={20}/>
        case "Bills":
            return <FaFileInvoiceDollar size={20}/>
        case "Subscription":
            return <FaNewspaper size={20}/>
        case "Other":
            return <FaRegQuestionCircle size={20}/>
    }
}

function getCategoryStyles(category: string) {
  switch (category) {
    case "Groceries":
      return { bg: "bg-emerald-500/10", text: "text-emerald-500" };
    case "Food":
      return { bg: "bg-amber-500/10", text: "text-amber-500" };
    case "Transport":
      return { bg: "bg-blue-500/10", text: "text-blue-500" };
    case "Utilities":
      return { bg: "bg-orange-500/10", text: "text-orange-500" };
    case "Shopping":
      return { bg: "bg-pink-500/10", text: "text-pink-500" };
    case "Bills":
      return { bg: "bg-rose-500/10", text: "text-rose-500" };
    case "Subscription":
      return { bg: "bg-violet-500/10", text: "text-violet-500" };
    default:
      return { bg: "bg-neutral-content/10", text: "text-base-content" };
  }
}

function ShowRecentTransactions({ expense, onDelete, onEdit }: ShowRecentTransactionsProps) {
  return (
    <div className="flex mt-2 p-4">
      <div className="flex-1">
        <h2 className="font-bold text-2xl mb-6 ml-8">Recent Expenses</h2>
        {expense.length === 0 && (
          <p className="opacity-50 text-center py-8 flex gap-2 items-center justify-center text-xl "><CiNoWaitingSign size={24}/>No expenses yet</p>
        )}
        <div className="flex justify-center items-center gap-4 flex-1 flex-wrap">
            {expense.map((transaction) => {
              const styles = getCategoryStyles(transaction.category);
              return (
                <div
                  key={transaction.id}
                  className="card card-border bg-base-100 w-full max-w-md shadow-xs hover:shadow-md hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-0.5 group"
                >
                  <div className="card-body p-4 flex flex-row items-center gap-4">
                    {/* Left: Category Icon */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${styles.bg} ${styles.text} transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                      {getIcon(transaction.category)}
                    </div>

                    {/* Middle: Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate text-base-content leading-snug">
                        {transaction.text}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs opacity-60 font-medium">
                          {transaction.date}
                        </span>
                        <span className="badge badge-xs badge-neutral font-semibold text-[10px] uppercase tracking-wider">
                          {transaction.category}
                        </span>
                      </div>
                    </div>

                    {/* Right: Amount & Actions */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-bold text-lg text-error">
                        -${transaction.amount.toFixed(2)}
                      </span>
                      <div className="flex gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="btn btn-xs btn-circle btn-ghost hover:bg-neutral-content/20"
                          onClick={() => onEdit(transaction)}
                          aria-label="Edit transaction"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          className="btn btn-xs btn-circle btn-ghost text-error hover:bg-error/10"
                          onClick={() => onDelete(transaction.id)}
                          aria-label="Delete transaction"
                        >
                          <MdDeleteOutline size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  )
}

export default ShowRecentTransactions