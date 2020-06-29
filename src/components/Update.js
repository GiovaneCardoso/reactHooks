import React, { useState }from 'react'
import axios from 'axios'

const Update = (props)=> {
    const alteraForm = (data)=> {
        data.preventDefault();
        axios.patch(`http://localhost:3000/users/${props.id}`, {
            name: formData.name,
            lastName: formData.lastName,
            age: formData.age,
            squad: formData.squad
        }).then(
            getUser()
        )
    }  
    const getUser = async ()=> {
        const { data } = await axios.get("http://localhost:3000/users")
        let user = data
        props.setUser(user)
      }
    const changeForm = (e)=> {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        age: "",
        squad: ""
    })


    return (
    <>
    <div>
    <div className="form">
        <input type="text" id="name" name="name" onChange={(e)=>changeForm(e)}></input><br />
        <input type="text" id="lastName" name="lastName" onChange={(e)=>changeForm(e)}></input><br />
        <input type="text" id="age" name="age" onChange={(e)=>changeForm(e)}></input><br />
        <input type="text" id="squad" name="squad" onChange={(e)=>changeForm(e)}></input><br />
        <button onClick={(e)=>alteraForm(e) }>Atualizar</button>
      </div>
    </div>
    </>
    )
}
export default Update