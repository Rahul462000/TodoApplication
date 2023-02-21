import React, { useEffect, useState } from 'react'
import "./Todo.css"
import Notes from "./images/Notes.png"


// setdata from localstorage
const getLocalItems = () =>{
    let list = localStorage.getItem('lists')
    console.log(list)

    // but humne data ko as arrya format mein send kiya hai
    if(list){
        return JSON.parse(localStorage.getItem('lists'))
    } else{
        return [];
    }
}


const Todo = () => {
    // user kya likh raha hai wo get karna 
    const[inputData,setInputData] = useState('');
    // ab hame sare items add karna hai
    const[items,setItems] = useState(getLocalItems);


// sare datra ko ek array mein store kar diya aur phir use store kar diya setItems mein
    const addItem = () =>{
        // if kuch bhi type nahi kiya aur plus click kiya to itms add na ho
        if(!inputData){
            return alert('You cannot add empty data')

        }else{
            setItems([...items,inputData])
            setInputData('')
        }
    }

 
    // deleting items from the list
// passing id from the map method
    const deleteItems =(id) =>{
        console.log(id);
       const updatedList = items.filter((elem,ind,aray) =>{
        // mujhe return karna hai aise data jo id se match nahi karte
        return ind !== id
       })
       setItems(updatedList);
    }

    // deleteAll functionality

    const deleteAll = () =>{
        setItems([]);
    }


    // now how to store the list in local storage
// useeffect mein value tabi add hogi jab nhi items ki value change hogi
// is method se items set to ho gaye abh get karnae hai
    useEffect(() =>{
        localStorage.setItem('lists',JSON.stringify(items))
    },[items])




  return (
    // it is the main div
    <div className="main-div">
        <div className="child-div">
            {/* image */}
            <figure>
                <img src={Notes} alt="images not found" />
                <figcaption>Add Your List here✌</figcaption>
            </figure>
            {/* input wala coloumn */}
            <div className="addItems">
                <input type="text" placeholder='✍️ Add Items'  
                value={inputData} 
                onChange={(e) => setInputData(e.target.value)}/>
                {/* add/plus button */}
                <i className="fa fa-plus add-btn" title='Add Items' onClick={addItem}></i>
            </div>

            <div className="showItems">

                {
                    items.map((elem,ind,arry) =>{
                        return(
                            

                <div className="eachItem" key={ind}>
                    <h3>{elem}</h3>
                    {/* onClick ko fat arrow funtion mein isliye likha hai because jab btn ko click karu tabhi hi item click ho */}
                    <i className='far fa-trash-alt add-btn' title remove items  onClick={() =>deleteItems(ind)}></i>
                </div>
                        )
                    })
                }

            </div>
            {/* clear all button */}
            <div className="showItem">
                <button className='btn effect04' data-sm-link-text= "Remove All" onClick={deleteAll}><span>Check List</span></button>
            </div>
        </div>
    </div>
  )
}

export default Todo