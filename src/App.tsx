import React, { useEffect } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import SearchBar from "./components/SearchBar";
import AddTransaction from "./components/AddTransaction";
import RecentTransactions from "./components/ShowRecentTransaction";

export interface Expense {
  id: string;
  text: string;
  amount: number;
  category: string;
  date: string;
  type: "Expense";
}

export interface Income {
  id: string;
  amount: number;
  date: string;
  type: "Income";
}

export interface Transaction {
  expense: Expense[];
  income: Income[];
}

function App() {
  const [transactions, setTransactions] = React.useState<Transaction>(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : { expense: [], income: [] };
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

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

  function deleteExpense(id: string) {
    setTransactions((prev) => ({
      ...prev,
      expense: prev.expense.filter((item) => item.id !== id),
    }));
  }

  function saveTransaction(transaction: Expense | Income) {
    setTransactions((prev) => {
      if ("category" in transaction) {
        const exists = prev.expense.some((item) => item.id === transaction.id);
        return {
          ...prev,
          expense: exists
            ? prev.expense.map((item) =>
                item.id === transaction.id ? transaction : item,
              )
            : [...prev.expense, transaction],
        };
      } else {
        const exists = prev.income.some((item) => item.id === transaction.id);
        return {
          ...prev,
          income: exists
            ? prev.income.map((item) =>
                item.id === transaction.id ? transaction : item,
              )
            : [...prev.income, transaction],
        };
      }
    });
    setShowModal(false);
    setEditingExpense(null);
  }

  const [showModal, setShowModal] = React.useState(false);
  const [editingExpense, setEditingExpense] = React.useState<Expense | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredExpenses = transactions.expense.filter(
    (item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Header />
      <div className="flex flex-row flex-wrap justify-evenly items-center m-4">
        <Stats
          income={transactions.income.reduce(
            (acc, curr) => acc + curr.amount,
            0,
          )}
          expense={transactions.expense.reduce(
            (acc, curr) => acc + curr.amount,
            0,
          )}
        />
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className="flex flex-row justify-center items-center m-4">
        <button
          className="btn btn-outline btn-accent active:shadow-lg hover:shadow-lg focus:shadow-lg focus:outline-1 focus:outline-accent outline-offset-2 transition-all duration-200 ease-in-out"
          onClick={() => setShowModal(!showModal)}
        >
          Add +
        </button>
      </div>
      {showModal && (
        <AddTransaction
          onClose={() => setShowModal(false)}
          setTransaction={addTransaction}
        />
      )}
      {editingExpense && (
        <AddTransaction
          onClose={() => setEditingExpense(null)}
          setTransaction={saveTransaction}
          editingTransaction={editingExpense}
        />
      )}
      <RecentTransactions
        expense={filteredExpenses}
        onDelete={deleteExpense}
        onEdit={setEditingExpense}
      />
    </>
  );
}

export default App;
