import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

function Dashboard() {
  const {usuarios, isLoading} = useContext(GlobalContext);
  return (
    <div>
      <h1>Dashboard</h1>
      {console.log(usuarios)}
      {/* <p>{!isLoading && usuarios[0].nome}</p> */}
    </div>
  )
}

export default Dashboard
