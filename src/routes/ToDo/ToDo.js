import "./ToDo.css"
import React,{useState} from 'react'




const ToDo = () => {
    var [work,setWork]= useState(0)
    var [other,setOther]= useState(0)
    var [family,setFamily]= useState(0)
    var [personal,setPersonal]= useState(0)
    const [task,setTask]= useState([])
    const [toggleSubmit,setToggleSubmit]=useState(true)    
    const [inputData, setInputData]=useState("")
    const [isEditItem,setIsEditItem]=useState(null);
    
     
    
    const newTask=(e)=>{
        e.preventDefault();
        var input=document.getElementById("inputTask").value
        var category=document.getElementById("taskOption").value
        
        if(input!=="" && category!=="Select One")
        {
            let taskObj={}
            taskObj["Name"]=input
            taskObj["Type"]=category
            
            let tempList=task
            tempList.push(taskObj)
            setTask(tempList)
        }

        if(category==="Work")
        {
            setWork(work+1)
        }
        else if(category==="Other")
        {
            setOther(other+1)
        }
        else if(category==="Personal")
        { 
            setPersonal(personal+1)
        }
        else if(category==="Family") 
        {
            setFamily(family+1)
        }

        
    }

    function updated(){
        var category=document.getElementById("taskOption").value

        
        
            setTask(
                task.map((elem)=>{
                    if(elem.Name===isEditItem)
                    {
                        
                        
                        return {...elem, Name:inputData, Type:category}
                    }
                    return elem
                })
            )

        if(category==="Work")
        {
            setWork(work+1)
        }
        else if(category==="Other")
        {
            setOther(other+1)
        }
        else if(category==="Personal")
        { 
            setPersonal(personal+1)
        }
        else if(category==="Family") 
        {
            setFamily(family+1)
        }

            setToggleSubmit(true);
            setInputData("")
            setIsEditItem(null)
        
    }

    function handleDelete(id,type)
    {
        const removeItem = task.filter((t) => {
            if(t["Type"]===type)
            {
                if(type==="Work")
                {
                    setWork(work-1);
                }
                if(type==="Personal")
                {
                    setPersonal(personal-1)
                }
                if(type==="Family")
                {
                    setFamily(family-1)
                }
                if(type==="Other")
                {
                    setOther(other-1);
                }
            }
            return t["Name"] !== id;
          });
          setTask(removeItem);
    }
 
    function handleModal (taskName,taskType,index){
        
        let editItems=task.find((elem)=>{
            return elem.Name===taskName
        })
        console.log(editItems);
        if(editItems.Type==="Family")
        {
            setFamily(family-1);
        }else if(editItems.Type==="Other")
        {
            setOther(other-1);
        }
        else if(editItems.Type==="Personal")
        {
            setPersonal(personal-1);
        }
        else if(editItems.Type==="Work")
        {
            setWork(work-1)
        }
        setToggleSubmit(false);
        setInputData(editItems.Name)
        setIsEditItem(taskName)
    }


    
    return (
        <>
        
            
            
            <br /><br /><br />
            
                <input type="text" id="inputTask" className="inputTask" value={inputData} onChange={(e)=>setInputData(e.target.value)} placeholder="Add Task"/> 
                <select className="taskOption" id="taskOption"> 
                        <option value="Select One">Select One</option> 
                        <option value="Work">Work</option> 
                        <option value="Family">Family</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option> 
                </select> 
                {toggleSubmit ? <input type="submit" value="Add New Task +" className="NewTaskBtn" onClick={newTask} />:
                <input type="submit" value="Edit Task" className="NewTaskBtn" onClick={updated}/>} 
           
           <br /><br />
            

            <div className="allTasks">
            
                {task.map((t,index)=>
                    <div className="task" key={t.Name} > <span className="tN">{t.Name}</span> <span className="tC"> [{t.Type}]</span> <input type="button" className="btn" onClick={()=>handleModal(t.Name,t.Type,index)} value="Edit"/><input type="button" className="delbtn" value="Delete" onClick={()=>handleDelete(t.Name,t.Type)}/> </div>
            
                )}
            
            </div>
                
                <div className="taskCategories">
                    <div className="category"><h3> <b>All  {work+personal+family+other}</b> </h3>  </div>
                    <div className="category"><h3> <b>Work  {work}</b> </h3> </div>
                    <div className="category"><h3> <b>Personal  {personal}</b> </h3> </div>
                    <div className="category"><h3> <b>Family  {family}</b> </h3> </div>
                    <div className="category"><h3> <b>Other  {other}</b> </h3> </div>
                </div>
        
            
            
        </>
    )
}

export default ToDo
