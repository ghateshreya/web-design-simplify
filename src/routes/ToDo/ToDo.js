import "./ToDo.css"
import React,{useState} from 'react';
import { createUseStyles } from "react-jss";
import axios from "axios";
import { Column, Row } from "simple-flexbox";
import MiniCardComponent from "components/cards/MiniCardComponent";
import TasksComponent from "routes/dashboard/TasksComponent";
import { useTheme } from "@emotion/react";
import CardComponent from "components/cards/CardComponent";
import { IconCheckboxOn, IconCheckboxOff } from 'assets/icons';
import { useHistory } from 'react-router-dom';

const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
    },
    tagStyles: {
        borderRadius: 5,
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: '0.5px',
        lineHeight: '14px',
        padding: '5px 12px 5px 12px'
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 2,
        marginRight: 30,
        height: '15vh',
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
    },
    stats: {
        borderTop: `1px solid ${theme.color.lightGrayishBlue2}`,
        width: '100%'
    },
    statTitle: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: '22px',
        letterSpacing: '0.3px',
        textAlign: 'center',
        color: theme.color.grayishBlue2,
        whiteSpace: 'nowrap',
        marginBottom: 6
    },
    statValue: {
        ...theme.typography.title,
        textAlign: 'center',
        color: theme.color.veryDarkGrayishBlue
    },
    container: {
        marginRight: 30,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        cursor: 'pointer',
        marginTop: 30,
        height: '15vh',
        width: '20vw',
        '@media (max-width: 768px)': {
            marginTop: 30,
            width: '140vw'
        },
    },
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    itemValue: {
        color: theme.color.grayishBlue2
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    tagStyles: {
        borderRadius: 5,
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: '0.5px',
        lineHeight: '14px',
        padding: '5px 12px 5px 12px'
    },
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 16
    }
}));

const TAGS = {
    URGENT: { text: 'URGENT', backgroundColor: '#FEC400', color: '#FFFFFF' },
    NEW: { text: 'NEW', backgroundColor: '#29CC97', color: '#FFFFFF' },
    DEFAULT: { text: 'DEFAULT', backgroundColor: '#F0F1F7', color: '#9FA2B4' }
};



const ToDo = () => {
    const classes = useStyles();
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
    const history = useHistory();

    const redirect = () => {
        history.push('/dashboard');
    }
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
                redirect();
              });
        
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
        const res=await axios.patch(`http://localhost:3000/todo/edit/${updt[0].userId[0].email}`, updt)
            setTask(res.data)
            console.log(res)

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

    function renderStat(title, value) {
        return (
            <Column
                flexGrow={1}
                className={classes.statContainer}
                vertical='center'
                horizontal='center'
            >
                <span className={classes.statTitle}>{title}</span>
                <span className={classes.statValue}>{value}</span>
            </Column>
        );
    }
    function TasksComponent(props) {
        const theme = useTheme();
        const classes = useStyles({ theme });
        const [items, setItems] = useState([
            { title: 'Finish ticket update', checked: false, tag: TAGS.URGENT },
            {
                title: 'Create new ticket example',
                checked: false,
                tag: TAGS.NEW
            },
            { title: 'Update ticket report', checked: true, tag: TAGS.DEFAULT }
        ]);
    
        function onCheckboxClick(index) {
            setItems((prev) => {
                const newItems = [...prev];
                newItems[index].checked = newItems[index].checked ? false : true;
                return newItems;
            });
        }
        function getNextTag(current = 'URGENT') {
            const tagLabels = ['URGENT', 'NEW', 'DEFAULT'];
            const tagIndex = (tagLabels.indexOf(current) + 1) % 3;
            return TAGS[tagLabels[tagIndex]];
        }
    
        function onTagClick(index) {
            setItems((prev) => {
                const newItems = [...prev];
                newItems[index].tag = getNextTag(newItems[index].tag.text);
                return newItems;
            });
        }
    
        function onAddButtonClick() {
            setItems((prev) => {
                const newItems = [...prev];
                newItems.push({
                    title: `Task ${newItems.length + 1}`,
                    checked: false,
                    tag: getNextTag()
                });
                return newItems;
            });
        }




function TaskComponent({ classes, index, item = {}, onCheckboxClick, onTagClick }) {
    const { tag = {} } = item;
    return (
        <Row horizontal='space-between' vertical='center'>
            <Row>
                <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    {item.checked ? <IconCheckboxOn /> : <IconCheckboxOff />}
                </div>
                <span className={classes.itemTitle}>{item.title}</span>
            </Row>
            <TagComponent
                backgroundColor={tag.backgroundColor}
                classes={classes}
                color={tag.color}
                index={index}
                onClick={onTagClick}
                text={tag.text}
            />
        </Row>
    );
}

function TagComponent({ backgroundColor, classes, color, index, onClick, text }) {
    return (
        <Row
            horizontal='center'
            vertical='center'
            style={{ backgroundColor, color }}
            className={classes.tagStyles}
            onClick={() => onClick(index)}
        >
            {text}
        </Row>
    );
}
    
        // function renderAddButton() {
        //     return (
        //         <Row
        //             horizontal='center'
        //             vertical='center'
        //             className={[classes.tagStyles, classes.addButton].join(' ')}
        //             onClick={onAddButtonClick}
        //         >
        //             +
        //         </Row>
        //     );
        // }
    
        return (
            <CardComponent
                containerStyles={props.containerStyles}
                title='Tasks'
                items={[
                    <Row horizontal='space-between' vertical='center'>
                        {/* <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                            Create new task
                        </span> */}
                    </Row>,
                    ...items.map((item, index) => (
                        <TaskComponent
                            classes={classes}
                            index={index}
                            item={item}
                            onCheckboxClick={onCheckboxClick}
                            onTagClick={onTagClick}
                        />
                    ))
                ]}
            />
        );
    }


    
    return (
    
            <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
            </Row>
        
            <Row>
            {/* <br /><br /><br /> */}
                <div className='search'>
                <input type="text" id="inputName" className="inputName" value={inputName} onChange={(e)=>setInputName(e.target.value)} placeholder="Task Name"></input>
                <input type="text" id="inputTask" className="inputTask" value={inputData} onChange={(e)=>setInputData(e.target.value)} placeholder="Task Description"/> 
                <select className="taskOption" id="taskOption"> 
                        <option value="New">New</option> 
                        <option value="Pending">Pending</option> 
                        <option value="In-process">In-process</option>
                         
                </select> 
                {toggleSubmit ? <input id='submit-button' type="submit" value="Add New Task +" className="NewTaskBtn" onClick={newTask} />:
                <input type="submit" value="Edit Task" className="NewTaskBtn" onClick={updated}/>} 
                </div>
           <br /><br />
            </Row>
            <Column>
                <div className='list'>
                    <h2>ToDO List</h2>
                    <p>List of all Todo items</p>
                </div>
            <div className="allTasks">
                
            {/* <div className="todoItem"> <input type="button" className="btn" onClick={()=>handleModal(t.toDoName,t.toDoDescription,index,t.userId)} value="Edit"/> </div> */}
                {task.map((t,index)=>
                    <div className="task" key="{t.toDoName}" > 
                    <div className="todoItem">{t.toDoName}</div>
                    <div className="todoItem"> {t.toDoDescription} </div> 
                    <div className="todoItem"><b>{t.toDoStatus}</b></div>  
                    <div className="todoItemButton"> <input type="button" className='btn'  value="Delete" onClick={()=>handleDelete(t.toDoName,t.toDoStatus)}/> </div> 
                    </div>
            
                )}
            
            </div>
                
                {/* <div className="taskCategories">
                    <div className="category"><h5 className="All"> <b>All  {neww+pending+inprocess}</b> </h5>  </div>
                    <div className="category"><h5 className="All"> <b>New  {neww}</b> </h5> </div>
                    <div className="category"><h5 className="All"> <b>Pending  {pending}</b> </h5> </div>
                    <div className="category"><h5 className="All"> <b>In-process  {inprocess}</b> </h5> </div>
                    
                </div> */}
            </Column>
        </Column>
            
    )
}

export default ToDo
