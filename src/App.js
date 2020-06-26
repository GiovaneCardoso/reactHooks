import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';


//useState = data do vue;
//useEffect = watch/mounted(depende do 2 param) do vue
const App = ()=> {
  const [ squad, setSquad ] = useState([]) 
  const [ user, setUser ] = useState([])
  

  const getSquad = async ()=> {
    const { data } = await axios.get('http://localhost:3000/squads') 
    let name = data;
    setSquad(name);
  }
  const getUser = async ()=> {
    const { data } = await axios.get("http://localhost:3000/users")
    let user = data
    // const usuerFiltered = data
    setUser(user)
  }

  useEffect(()=> {
    getSquad();
    getUser();
  }, [])

  
  return (
    <>
      <div>
        <h1>Membros por squad</h1>

        <div>{squad.map(singleSquad => {
          return (
          <>
          <h2>{singleSquad.name}</h2>
          <ul>
          {user.filter(user => user.squad == singleSquad.id).map(singleUser => <li className="xablau">{singleUser.name}</li>)}
         </ul>
          </>
          )
        })}</div>

      </div>
    </>
  )
}

export default App;
