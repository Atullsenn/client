import './App.css';
import {useState, useEffect} from "react";
import Axios from 'axios';

function App() {

  const [name, setName] = useState(" ");
  const [age, setAge] = useState(0);
  const [ListOfFriends, setListOfFriends] = useState([]);

  const addFriend = ()=>{
    Axios.post("https://crudmernapp01.herokuapp.com/addfriend",{
      name,
      age,
    }).then(()=>{
      setListOfFriends([...ListOfFriends, {name: name, age: age}]);
    });
  };

  const updateFriend = (id)=>{
    const newAge = prompt("Enter new Age: ");

    Axios.put("https://crudmernapp01.herokuapp.com/update", {newAge: newAge, id: id}).then(
      ()=>{
        setListOfFriends(
          ListOfFriends.map((val)=>{
            return val._id === id ?{_id: id, name: val.name, age: newAge} : val;
          })
        )
      }
    )
  }

  const deleteFriend = (id)=>{
    Axios.delete(`https://crudmernapp01.herokuapp.com/delete/${id}`).then(()=>{
      setListOfFriends(ListOfFriends.filter((val)=>{
        return val._id !== id;
      }))
    })
  }

  useEffect(()=>{
    Axios.get("https://crudmernapp01.herokuapp.com/read").then((response)=>{
      setListOfFriends(response.data)
    }).catch(()=>{
      console.log("ERR");
    })
  })
  return (
    <div className="App">
      <div className="inputs">
      <input type="text" placeholder="Friend Name..."
      onChange={(event)=>{setName(event.target.value)}}/>
      <input type="Number" placeholder="Friend Age..."
      onChange={(event)=>{setAge(event.target.value)}}/>
      <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className='listOfFriends'>
        {ListOfFriends.map((val)=>{
          return(
            <div className='friendContainer'>
            <div className='friend'>
            <><h3>Name: {val.name} </h3>
            <h3>Age: {val.age} </h3></>
            </div>
            <button onClick={()=>{updateFriend(val._id)}}>Update</button>
            <button id='removeBtn'onClick={()=>{deleteFriend(val._id)}}>Delete</button>
            </div>
          );
        })}
      </div>

      </div>
  );
}

export default App;
