import React from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import SearchBar from "./components/SearchBar";
import AddTransaction from "./components/AddTransaction";

export interface Transaction {
  id: string;
  text: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

function App() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  function addTransaction(transaction: Transaction) {
    setTransactions([...transactions, transaction]);
  }
  
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Header />
      <div className="flex flex-row flex-wrap justify-evenly items-center m-4">
        <Stats income={10000} expense={1000} />
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
