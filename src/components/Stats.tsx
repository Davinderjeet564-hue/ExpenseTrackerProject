import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { MdOutlineSavings } from "react-icons/md";

interface StatsProps {
  income: number;
  expense: number;
}


function Stats({income=0, expense=0}: StatsProps) {
  const balance = income - expense;
  return (
    <div className="card bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title mb-2">This Month</h2>
        <div className="flex flex-row gap-3">
          {/* Spending Pill */}
          <div className="flex flex-row items-center gap-3 bg-[#bf5c6b] text-white p-1.5 pl-2.5 pr-6 rounded-full flex-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/30 text-white">
              <FiArrowUp size={20} />
            </div>
            <div>
              <span className="block text-[11px] text-white/70 leading-none mb-0.5">Spending</span>
              <p className="text-sm font-bold leading-tight">${expense}</p>
            </div>
          </div>

          {/* Income Pill */}
          <div className="flex flex-row items-center gap-3 bg-[#3f6f4b] text-white p-1.5 pl-2.5 pr-6 rounded-full flex-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/30 text-white">
              <FiArrowDown size={20} />
            </div>
            <div>
              <span className="block text-[11px] text-white/70 leading-none mb-0.5">Income</span>
              <p className="text-sm font-bold leading-tight">${income}</p>
            </div>
          </div>
        </div>
        {/**Balance pill */}
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-row items-center gap-3 bg-neutral text-neutral-content p-1.5 pl-2.5 pr-6 rounded-full w-fit">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-content/20 text-neutral-content">
              <MdOutlineSavings size={20} />
            </div>
            <div>
              <span className="block text-[11px] opacity-70 leading-none mb-0.5">Balance</span>
              <p className="text-sm font-bold leading-tight">${balance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

