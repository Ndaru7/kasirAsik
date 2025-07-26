import React from 'react'

const StatsCard = ({ title, value, percent, isPositive }) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
          <div className="text-gray-500">{title}</div>
          <div className="text-3xl font-bold">{(value ?? 0).toLocaleString()}</div>
        </div>
        <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {percent}
        </div>
      </div>
    </div>
  )
}

export default StatsCard