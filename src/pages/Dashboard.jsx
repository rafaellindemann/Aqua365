import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

function Dashboard() {
  const {usuarios, isLoading, relatorios} = useContext(GlobalContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {/* {relatorios.map((relatorio, index) => (
            <CardRelatorio relatorio={relatorio} key={index}/>
        ))} */}

      </div>
    </div>
  )
}

export default Dashboard
