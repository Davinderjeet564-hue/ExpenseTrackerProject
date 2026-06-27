import React from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import SearchBar from "./components/SearchBar";
import AddTransaction from "./components/AddTransaction";

export interface Expense {
  id: string;
  text: string;
  amount: number;
  category: string;
  date: string;
  type: "Expense"
}

export interface Income {
  id: string;
  amount: number;
  date: string;
  type: "Income"
}

export interface Transaction {
  expense: Expense[];
  income: Income[];
}

function App() {
  const [transactions, setTransactions] = React.useState<Transaction>({
    expense: [],
    income: [],
  });

  function addTransaction(transaction: Expense | Income) {
    if ("category" in transaction) {
      setTransactions((prev) => ({
        ...prev,
        expense: [...prev.expense, transaction],
      }));
    } else {
      setTransactions((prev) => ({
        ...prev,
        income: [...prev.income, transaction],
      }));
    }
  }

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Header />
      <div className="flex flex-row flex-wrap justify-evenly items-center m-4">
        <Stats income={transactions.income.reduce((acc, curr) => acc + curr.amount, 0)} expense={transactions.expense.reduce((acc, curr) => acc + curr.amount, 0)} />
        <SearchBar />
      </div>
      <div className="flex flex-row justify-center items-center m-4">
        <button className="btn btn-outline btn-accent active:shadow-lg hover:shadow-lg focus:shadow-lg focus:outline-1 focus:outline-accent outline-offset-2 transition-all duration-200 ease-in-out" onClick={()=>setShowModal(!showModal)}>Add +</button>
      </div>
      {showModal && (
        <AddTransaction onClose={() => setShowModal(false)} setTransaction={addTransaction} />
      )}
    </>
  );
}

export default App;
