import React, { useState } from "react";
import type { Expense, Income } from "../App";

interface AddTransactionProps {
  onClose: () => void;
  setTransaction: (transaction: Expense | Income) => void;
}

function AddTransaction({ onClose, setTransaction }: AddTransactionProps) {
  const [type, setType] = useState<"income" | "expense" | null>("expense");

  // Controlled form state
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!type) return;

    if (type=="expense"){
      const expense: Expense = {
        id:Date.now().toString(),
        text:description||"Untitled",
        amount:Number(amount)||0,
        category:category||"General",
        date:date,
        type:"Expense",
      };
      setTransaction(expense);
    }else{
      const income: Income = {
        id:Date.now().toString(),
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
        <h3 className="font-bold text-lg">Add Transaction</h3>
        <div className="flex gap-2 p-1">
          <button
            className="btn flex-1 rounded-full bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-700 focus-visible:bg-neutral-600 focus-visible:outline-neutral-600 focus-visible:outline-offset-2 focus-visible:outline-2"
            onClick={() => setType("expense")}
          >
            Expense
          </button>
          <button
            className="btn flex-1 rounded-full bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-700 focus-visible:bg-neutral-600 focus-visible:outline-neutral-600 focus-visible:outline-offset-2 focus-visible:outline-2"
            onClick={() => setType("income")}
          >
            Income
          </button>
        </div>
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
              <div className="form-control text-gray-300">{date}</div>

              <div>
                <div>
                  <label htmlFor="description">
                    <span className="label-text text-gray-300">
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
                    placeholder="e.g. Groceries"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label" htmlFor="amount">
                  <span className="label-text text-gray-300">Amount</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="input input-bordered w-full"
                  placeholder="e.g. 50"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="category">
                  <span className="label-text text-gray-300">Category</span>
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="input input-bordered w-full"
                  placeholder="e.g. Groceries"
                  onChange={(e) => setCategory(e.target.value)}
                />
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
                  Save
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
              <div className="form-control text-gray-300">{date}</div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="amount">
                  <span className="label-text text-gray-300">Amount</span>
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
                  Save
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
