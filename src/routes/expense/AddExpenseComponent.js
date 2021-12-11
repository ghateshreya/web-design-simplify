import React, { useState } from 'react';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import './Expense.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import axios from 'axios';

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
    },
    modal: {
        height: '50vh',
        position: 'fixed',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        backgroundColor: "white",
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        margin: "60px 30px 30px 30px",
    },
    modalH2: {
        color: '#000000',
        fontSize: '16px',
    },
    category: {
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    title: {
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    tag: {
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    date: {
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    price: {
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },
    container: {
        backgroundColor: 'rgb(108, 99, 255)',
        color: "#FFFFFF",
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        cursor: 'pointer',
        width: '250',
        // display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 40px',
        '&:hover': {
            borderColor: theme.color.lightBlue,
            '&:nth-child(n) > span': {
                color: theme.color.lightBlue
            }
        }
    },
    title: {
        ...theme.typography.cardTitle,
        color: theme.color.grayishBlue2,
        marginBottom: 12,
        minWidth: 102,
        textAlign: 'center'
    },
    value: {
        color: theme.color.veryDarkGrayishBlue,
        fontWeight: 'bold',
        fontSize: 40,
        letterSpacing: '1px',
        lineHeight: '50px',
        textAlign: 'center'
    }
}));

const TAGS = {
    UTILITIES: { text: 'UTILITIES', backgroundColor: '#FEC400', color: '#FFFFFF' },
    ENTERTAINMENT: { text: 'ENTERTAINMENT', backgroundColor: '#9966FF', color: '#FFFFFF' },
    TRAVEL: { text: 'TRAVEL', backgroundColor: '#FF6484', color: '#FFFFFF' },
    MISC: { text: 'MISC', backgroundColor: '#FF9F3F', color: '#FFFFFF' },
    FOOD: { text: 'FOOD', backgroundColor: '#4BC0C0', color: '#FFFFFF' },

};

function AddExpenseComponent(props) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const composedClassName = [classes.container, props.className].join(' ');
    const [modal, setModal] = useState(false);

    function onClick() {
        if (!modal) {
            setModal(true);

        }
        else {
            setModal(false)
        }
    }
    const TAG = [
        {
            value: TAGS.UTILITIES,
            label: 'Utilities',
        },
        {
            value: TAGS.ENTERTAINMENT,
            label: 'Entertainment',
        },
        {
            value: TAGS.TRAVEL,
            label: 'Travel',
        },
        {
            value: TAGS.MISC,
            label: 'Misc',
        },
        {
            value: TAGS.FOOD,
            label: 'Food',
        },
    ];

    const [open, setOpen] = React.useState(false);
    const [expenseTitle, setExpenseTitle] = React.useState(null);
    const [expenseDesc, setExpenseDesc] =  React.useState(null);
    const [expenseTags, setExpenseTags] = React.useState(null);
    const [expensePrice, setExpensePrice] = React.useState(null);

    const [post, setPost] = React.useState(null);
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    const handleSave = () => {
        setOpen(false);

        props.setItems((prev) => {
            const newItems = [...prev];
            newItems.push({
                title: expenseTitle,
                tag: expenseTags,
                desc: expenseDesc,
                price: expensePrice
            });
            // createPOST();
            return newItems;
        });
    };
    
    const url = "http://localhost:3000/expense/create";
    React.useEffect(() => {
    axios.get(url).then((response) => {
    setPost(response.data);
    });
    }, []);

    function createPOST(){
        
        axios.post(url, 
            {

                "expenseName":expenseTitle,
                "expenseDescription":"Desc",
                "expenseCategory": expenseTags.text,
                "expenseCostInDollars": expensePrice,
                "userId":{"firstName" : "Jinal",
                    "lastName": "Mamaniya",
                    "email":"jinal.m@tcs.com",
                    "password":"Password@4125",
                    "groupName":"Web Project"
            }   
        }).then((response) =>{
            setPost(response.data);
          });
    }

    const handleTagChange = (event) => {
        console.log(event.target.value)
        setExpenseTags(event.target.value);
    };

    const handleTitleChange = (event) => {
        setExpenseTitle(event.target.value);
    };
    const handleDescChange = (event) => {
        setExpenseDesc(event.target.value);
    };
    const handlePriceChange = (event) => {
        setExpensePrice(event.target.value);
    };

    function RedBar() {
        return (
            <Box
                sx={{
                    height: 20,
                    backgroundColor: '#FFFFFF'
                }}
            />
        );
    }
    return (

        <Column flexGrow={1} className={composedClassName} horizontal='center' vertical='center' onClick={onClick}>
            <div>
                <Button onClick={handleClickOpen} style={{ color: "white" }}>
                    Add New Expense
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogContent>
                        <RedBar />

                        {/* Title */}
                        <DialogContentText>
                            <TextField id="outlined-basic" label="Title" variant="outlined" onChange={handleTitleChange} />
                        </DialogContentText>
                        <RedBar />
                        <DialogContentText>
                            <TextField id="outlined-basic" label="Description" variant="outlined" onChange={handleDescChange} />
                        </DialogContentText>
                        <RedBar />

                        <TextField fullWidth
                            id="outlined-select-currency"
                            select
                            label="Tag"
                            value={expenseTags}
                            onChange={handleTagChange}
                        >
                            {TAG.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <RedBar />


                        <DialogContentText>
                            <TextField id="outlined-basic" label="Price" variant="outlined" onChange={handlePriceChange} />
                        </DialogContentText>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Column>


    );
}

export default AddExpenseComponent;
