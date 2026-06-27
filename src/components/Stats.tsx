import React from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

interface StatsProps {
  income: number;
  expense: number;
}


function Stats({income=1000, expense=2000}: StatsProps) {
  return (
    <div className="card bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title text-white mb-2">This Month</h2>
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
      </div>
    </div>
  );
}

export default Stats;

