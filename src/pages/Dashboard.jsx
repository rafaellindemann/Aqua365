import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

function Dashboard() {
  const {usuarios, isLoading, relatorios} = useContext(GlobalContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <div>


      </div>
    </div>
  )
}

export default Dashboard
