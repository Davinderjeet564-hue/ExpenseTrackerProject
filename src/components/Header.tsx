import React from 'react'

function Header() {
  return (
    <header className='flex justify-between rounded-2xl m-4 p-4'>
        <h1 className='text-white font-bold text-2xl'>Expense Tracker</h1>
        <div className='flex gap-4'>
            <button className='btn btn-primary'>Change theme</button>
            <div className='btn btn-secondary'>login</div>
        </div>
    </header>
  )
}

export default Header