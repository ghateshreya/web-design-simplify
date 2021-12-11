import "./ToDo.css"
import React,{useState} from 'react'




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
    
    
    const newTask=(e)=>{
        e.preventDefault();
        var name=document.getElementById("inputName").value
        var input=document.getElementById("inputTask").value
        var category=document.getElementById("taskOption").value
        
        if(input!=="" && category!=="Select One")
        {
            let taskObj={}
            taskObj["Name"]=name
            taskObj["Desc"]=input
            taskObj["Type"]=category
            
            // const res = await axios.post("/todo",taskObj);
            let tempList=task
            tempList.push(taskObj)
            setTask(tempList)
        
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

    function updated(){
        var category=document.getElementById("taskOption").value

        
        
            setTask(
                task.map((elem)=>{
                    if(elem.Desc===isEditItem && elem.Name===isEditName)
                    {
                        return {...elem, Name:inputName, Desc:inputData,Type:category}
                    }
                    return elem
                })
            )

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

    function handleDelete(id,type)
    {
        var category=document.getElementById("taskOption").value

        const removeItem = task.filter((t) => {
            if(t["Type"]===type)
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
            return t["Name"] !== id;
          });
          setTask(removeItem);
    }
 
    function handleModal (taskName,taskDesc,index){
        
        let editItems=task.find((elem)=>{
            return elem.Name===taskName
        })
        let editDesc=task.find((elem)=>{
            return elem.Desc==taskDesc
        })
        console.log(editItems);
        if(editItems.Type==="New")
        {
            setNeww(neww-1);
        }else if(editItems.Type==="Pending")
        {
            setPending(pending-1);
        }
        else if(editItems.Type==="In-process")
        {
            setInprocess(inprocess-1);
        }
        
        setToggleSubmit(false);
        setInputData(editDesc.Desc)
        setInputName(editItems.Name)
        setIsEditName(taskName)
        setIsEditItem(taskDesc)
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
                    <div className="task" key={t.Name} > <span className="tN">({t.Name})</span> {t.Desc} <span className="tC"> [{t.Type}]</span> <input type="button" className="btn" onClick={()=>handleModal(t.Name,t.Desc,index)} value="Edit"/><input type="button" className="btn" value="Delete" onClick={()=>handleDelete(t.Name,t.Type)}/> </div>
            
                )}
            
            </div>
                
                <div className="taskCategories">
                    <div className="category"><h5> <b>All  {neww+pending+inprocess}</b> </h5>  </div>
                    <div className="category"><h5> <b>New  {neww}</b> </h5> </div>
                    <div className="category"><h5> <b>Pending  {pending}</b> </h5> </div>
                    <div className="category"><h5> <b>In-process  {inprocess}</b> </h5> </div>
                    
                </div>
        
            
            
        </>
    )
}

export default ToDo
