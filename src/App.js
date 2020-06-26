import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';


//useState = data do vue;
//useEffect = watch/mounted(depende do 2 param) do vue
const App = ()=> {
  const [ squad, setSquad ] = useState([]) 
  const [ user, setUser ] = useState([])
  const [ sendUser, setSendUser] = useState({
    id: "",
    name: "",
    lastName: "",
    age: "",
    squad: ""
  })
  

  const getSquad = async ()=> {
    const { data } = await axios.get('http://localhost:3000/squads') 
    let name = data;
    setSquad(name);
  }
  const getUser = async ()=> {
    const { data } = await axios.get("http://localhost:3000/users")
    let user = data
    setUser(user)
  }
  const submit = (e)=> {
    e.preventDefault();
    axios.post("http://localhost:3000/users", sendUser).then(res=> {
      console.log(res)
    })
  }
  const info = (e)=> {
    const newUser = {...sendUser}
    newUser[e.target.id]= e.target.value
    setSendUser(newUser);
  }

  useEffect(()=> {
    getSquad();
  }, [])
  useEffect(()=> {
    getUser();
  }, [user])

  
  return (
    <>
      <div className="Membros">
        <h1>Membros por squad</h1>

        <div>{squad.map(singleSquad => {
          return (
          <>
          <h2>{singleSquad.name}</h2>
          <ul>
          {user.filter(user => user.squad == singleSquad.id).map(singleUser => <li className={singleSquad.id}>{singleUser.name}</li>)}
         </ul>
          </>
          )
        })}</div>

      </div>
      <div className="form" >
        <form id="form-submit" onSubmit={(e)=> submit(e)}>
        <input type="number" id="id" name="id" value={sendUser.id} onChange={(e)=>info(e)}></input><br />
        <input type="text" id="name" name="name" value={sendUser.name} onChange={(e)=>info(e)}></input><br />
        <input type="text" id="lastName" name="lastName" value={sendUser.lastName} onChange={(e)=>info(e)}></input><br />
        <input type="text" id="age" name="age" value={sendUser.age} onChange={(e)=>info(e)}></input><br />
        <input type="text" id="squad" name="squad" value={sendUser.squad} onChange={(e)=>info(e)}></input><br />
        <input type="submit"></input>
        </form>

      </div>
    </>
  )
}

export default App;
