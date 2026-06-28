import {useState,useEffect} from 'react'
import { FaMoneyBillAlt } from "react-icons/fa";

const THEMES = ["light", "dark", "cupcake"]

function Header() {

  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className='flex justify-between m-4 p-4 bg-neutral/30'>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaMoneyBillAlt className="text-white text-xl" />
            </div>
            <h1 className='font-bold text-2xl'>Expense Tracker</h1>
        </div>
        <div className='flex gap-4'>
            <div className='dropdown dropdown-end'>
                <button className='btn btn-primary'>{theme}</button>
                <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                    {THEMES.map((t) => (
                        <li key={t}>
                            <a onClick={() => setTheme(t)}>{t}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <button className='btn btn-secondary'>login</button>
        </div>
    </header>
  )
}

export default Header