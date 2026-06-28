import React, { useState } from "react";
import type { Expense, Income } from "../App";
import { IoBusOutline, IoFastFoodOutline } from "react-icons/io5";
import { FaFileInvoiceDollar, FaNewspaper, FaShirt } from "react-icons/fa6";
import { FaHome, FaRegQuestionCircle, FaShoppingBag } from "react-icons/fa";

interface AddTransactionProps {
  onClose: () => void;
  setTransaction: (transaction: Expense | Income) => void;
  editingTransaction?: Expense | null; // Optional editing object
}

function AddTransaction({ onClose, setTransaction, editingTransaction }: AddTransactionProps) {
  const [type, setType] = useState<"income" | "expense" | null>(editingTransaction ? editingTransaction.type === "Expense" ? "expense" : "income" : "expense");

  // Controlled form state
  const [description, setDescription] = useState(editingTransaction?.text || "");
  const [amount, setAmount] = useState(editingTransaction?.amount.toString() || "");
  const [category, setCategory] = useState(editingTransaction?.category || "");
  const [date] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!type) return;

    if (type=="expense"){
      const expense: Expense = {
        id: editingTransaction?.id || Date.now().toString(),
        text:description||"Untitled",
        amount:Number(amount)||0,
        category:category||"General",
        date:date,
        type:"Expense",
      };
      setTransaction(expense);
    }else{
      const income: Income = {
        id: editingTransaction?.id || Date.now().toString(),
        amount:Number(amount)||0,
        date:date,
        type:"Income",
      };
      setTransaction(income);
    }

    onClose();
  };

  return (
    <div
      className="modal modal-middle modal-open w-full h-full bg-black/40"
      role="dialog"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {editingTransaction ? "Update Expense" : "Add Transaction"}
        </h3>
        {!editingTransaction && (
          <div className="flex gap-2 p-1">
            <button
              className={`btn flex-1 rounded-full ${type === "expense" ? "btn-neutral" : "btn-outline"}`}
              onClick={() => setType("expense")}
            >
              Expense
            </button>
            <button
              className={`btn flex-1 rounded-full ${type === "income" ? "btn-neutral" : "btn-outline"}`}
              onClick={() => setType("income")}
            >
              Income
            </button>
          </div>
        )}
        {/*If type is expense show expense form */}
        {type === "expense" && (
          <div className="modal-action block">
            {/** Expense form here */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                onClose();
              }}
              className="flex flex-col gap-4"
            >
              <div className="form-control opacity-70">{date}</div>

              <div>
                <div>
                  <label htmlFor="description">
                    <span className="label-text">
                      Description
                    </span>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="input input-bordered w-full"
                    placeholder="e.g. buy coffee"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label" htmlFor="amount">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="input input-bordered w-full"
                  placeholder="e.g. 50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="category">
                  <span className="label-text">Category</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="select select-bordered w-full"
                  value={category || "Food"}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Groceries"><FaShoppingBag/>Groceries</option>
                  <option value="Food"><IoFastFoodOutline size={20}/>Food</option>
                  <option value="Transport"><IoBusOutline size={20}/>Transport</option>
                  <option value="Utilities"><FaHome size={20}/>Utilities</option>
                  <option value="Shopping"><FaShirt size={20}/>Shopping</option>
                  <option value="Bills"><FaFileInvoiceDollar size={20}/>Bills</option>
                  <option value="Subscription"><FaNewspaper size={20}/>Subscription</option>
                  <option value="Other"><FaRegQuestionCircle size={20}/>Other</option>
                </select>
              </div>

              <div className="modal-action gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-accent">
                  {editingTransaction ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}
        {/*If type is income show income form*/}
        {type === "income" && (
          <div className="modal-action block">
            {/** Income form here */}
            <form method="dialog" onSubmit={handleSubmit}>
              <div className="form-control opacity-70">{date}</div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="amount">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="input input-bordered w-full"
                  placeholder="e.g. 50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="modal-action gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={()=>{onClose()}}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-accent" >
                  {editingTransaction ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
export default AddTransaction;