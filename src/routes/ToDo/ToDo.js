import "./ToDo.css"
import React,{useState} from 'react'
import axios from "axios";



const ToDo = () => {
    var [inprocess,setInprocess]= useState(0)
    var [pending,setPending]= useState(0)
    var [neww,setNeww]= useState(0)
    
    const [task,setTask]= useState([])
    const [toggleSubmit,setToggleSubmit]=useState(true)    
    const [inputData, setInputData]=useState("")
    const [isEditItem,setIsEditItem]=useState(null);
    const [inputName,setInputName]=useState("");
    const [isEditName,setIsEditName]=useState(null);
    const [userId,setUserId]=useState("")

    const url = "http://localhost:3000/todo/getAll";
    // const url = "https://jsonplaceholder.typicode.com/posts/1";
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(url, ).then((response) => {
        setTask(response.data);
        // console.log(response.data);
        });
    }, []);
    console.log(post)
    const newTask= async (e)=>{
        // e.preventDefault();
        var name=document.getElementById("inputName").value
        var input=document.getElementById("inputTask").value
        var category=document.getElementById("taskOption").value
        
        if(input!=="" && name!=="")
        {
            // let taskObj={}
            // taskObj["toDoName"]=name
            // taskObj["toDoDescription"]=input
            // taskObj["toDoStatus"]=category
            

            await axios.post("http://localhost:3000/todo/create", 
                {
    
                    "toDoName":name,
                    "toDoDescription":input,
                    "toDoStatus": category,
                    
                    "userId":{"firstName" : "Jinal",
                        "lastName": "Mamaniya",
                        "email":"jinal.m@tcs.com",
                        "password":"Password@4125",
                        "groupName":"Web Project"
                }   
            }).then((response) =>{
                let tempList=task
             tempList.push(response.data) 
                
                setTask(tempList);
                // window.location.reload();
              });

            // const res = await axios.post("http://localhost:3000/todo/create",taskObj);
            // console.log(res.data);
            // let tempList=task
            // tempList.push(taskObj) 
            // setTask(tempList)
        
        }

        if(category==="New")
        {
            setNeww(neww+1)
        }
        else if(category==="Pending")
        {
            setPending(pending+1)
        }
        else if(category==="In-process")
        { 
            setInprocess(inprocess+1)
        }
        

        
    }

    const updated= async ()=>{
        var category=document.getElementById("taskOption").value

        let updt=task.map((elem)=>{
            if(elem.toDoDescription===isEditItem && elem.toDoName===isEditName)
            {
                return {...elem, toDoName:inputName, toDoDescription:inputData,toDoStatus:category, userId:userId}
            }
            return elem
        })
        console.log(updt)
        console.log(updt[0].userId[0].email)
        const res=await axios.put(`http://localhost:3000/todo/edit/${updt[0].userId[0].email}`, updt)
            setTask(res.data)

            if(category==="New")
            {
                setNeww(neww+1)
            }
            else if(category==="Pending")
            {
                setPending(pending+1)
            }
            else if(category==="In-process")
            { 
                setInprocess(inprocess+1)
            }

            setToggleSubmit(true);
            setInputData("")
            setIsEditItem(null)
            setIsEditName(null)
            setInputName("")
        
    }

    const handleDelete = async (id,type)=>
    {
        var category=document.getElementById("taskOption").value

        const removeItem = task.filter((t) => {
            if(t["toDoStatus"]===type)
            {
                if(category==="New")
                {
                    setNeww(neww-1)
                }
                else if(category==="Pending")
                {
                    setPending(pending-1)
                }
                else if(category==="In-process")
                { 
                    setInprocess(inprocess-1)
                }
            }
            return t["toDoName"] === id;
          });

          const res= await axios.delete(`http://localhost:3000/todo/delete/${id}`,removeItem)
          setTask(res.data);
    }
 
    function handleModal (taskName,taskDesc,index,userId){
        
        let editItems=task.find((elem)=>{
            return elem.toDoName===taskName
        })
        let editDesc=task.find((elem)=>{
            return elem.toDoDescription==taskDesc
        })
        console.log(editItems);
        if(editItems.toDoStatus==="New")
        {
            setNeww(neww-1);
        }else if(editItems.toDoStatus==="Pending")
        {
            setPending(pending-1);
        }
        else if(editItems.toDoStatus==="In-process")
        {
            setInprocess(inprocess-1);
        }
        
        setToggleSubmit(false);
        setInputData(editDesc.toDoDescription)
        setInputName(editItems.toDoName)
        setIsEditName(taskName)
        setIsEditItem(taskDesc)
        setUserId(userId)
    }


    
    return (
        <>
        
            
            
            {/* <br /><br /><br /> */}
            
                <input type="text" id="inputName" className="inputName" value={inputName} onChange={(e)=>setInputName(e.target.value)} placeholder="Task Name"></input>
                <input type="text" id="inputTask" className="inputTask" value={inputData} onChange={(e)=>setInputData(e.target.value)} placeholder="Task Description"/> 
                <select className="taskOption" id="taskOption"> 
                        <option value="New">New</option> 
                        <option value="Pending">Pending</option> 
                        <option value="In-process">In-process</option>
                         
                </select> 
                {toggleSubmit ? <input type="submit" value="Add New Task +" className="NewTaskBtn" onClick={newTask} />:
                <input type="submit" value="Edit Task" className="NewTaskBtn" onClick={updated}/>} 
           
           <br /><br />
            

            <div className="allTasks">
            
                {task.map((t,index)=>
                    <div className="task" key="{t.toDoName}" > <span className="tN">({t.toDoName})</span> <span className="tD"> {t.toDoDescription} </span><span className="tC"> [{t.toDoStatus}]</span> <input type="button" className="btn" onClick={()=>handleModal(t.toDoName,t.toDoDescription,index,t.userId)} value="Edit"/><input type="button" className="btn" value="Delete" onClick={()=>handleDelete(t.toDoName,t.toDoStatus)}/> </div>
            
                )}
            
            </div>
                
                <div className="taskCategories">
                    <div className="category"><h5 className="All"> <b>All  {neww+pending+inprocess}</b> </h5>  </div>
                    <div className="category"><h5 className="All"> <b>New  {neww}</b> </h5> </div>
                    <div className="category"><h5 className="All"> <b>Pending  {pending}</b> </h5> </div>
                    <div className="category"><h5 className="All"> <b>In-process  {inprocess}</b> </h5> </div>
                    
                </div>
        
            
            
        </>
    )
}

export default ToDo
