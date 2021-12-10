import React, { useState } from 'react';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { FaRegListAlt, FaUtensils, FaGasPump, FaWifi, FaGamepad } from 'react-icons/fa';
import DatePicker from 'react-date-picker';
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
    PERSONAL: { text: 'PERSONAL', backgroundColor: '#FEC400', color: '#FFFFFF' },
    GROUP: { text: 'GROUP', backgroundColor: '#29CC97', color: '#FFFFFF' }
};
const CATEGORY = [
    {
        value: <FaWifi />,
        label: 'Utilities',
    },
    {
        value: <FaGamepad />,
        label: 'Entertainment',
    },
    {
        value: <FaGasPump />,
        label: 'Travel',
    },
    {
        value: <FaRegListAlt />,
        label: 'Misc',
    },
    {
        value: <FaUtensils />,
        label: 'Food',
    },
];

const TAG = [
    {
        value: "Personal",
        label: 'Personal'
    },
    {
        value: "Group",
        label: 'Group'
    }
]

function AddExpenseComponent(props) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const composedClassName = [classes.container, props.className].join(' ');
    const [modal, setModal] = useState(false);


    // function onAddButtonClick() {
    //     props.setItems((prev) => {
    //         const newItems = [...prev];
    //         newItems.push({
    //             icon: categories,
    //             title: `New Task`,
    //             tag: TAGS.PERSONAL,
    //             date: 'Dec 12, 2021',
    //             price: '5.99'
    //         });
    //         return newItems;
    //     });
    // }

    function onClick() {
        if (!modal) {
            setModal(true);

        }
        else {
            setModal(false)
        }
    }

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("New Task")
    const [categories, setCategories] = React.useState(null);
    const [tags, setTags] = React.useState('Personal');
    const [dates, setDates] = React.useState(null);

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
                icon: categories,
                title: title,
                tag: tags,
                date: dates,
                price: '5.99'
            });
            return newItems;
        });
    };

    const handleChange = (event) => {
        setCategories(event.target.value);
    };

    const handleTagChange = (event) => {
        setTags(event.target.value);
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
                        {/* Select Tag */}
                        <TextField fullWidth
                            id="outlined-select-currency"
                            select
                            label="Category"
                            value={categories}
                            onChange={handleChange}
                        >
                            {CATEGORY.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <RedBar />

                        {/* Title */}
                        <DialogContentText>
                            <TextField id="outlined-basic" label={title} variant="outlined" />
                        </DialogContentText>
                        <RedBar />

                        <TextField fullWidth
                            id="outlined-select-currency"
                            select
                            label="Tag"
                            value={tags}
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
                            <TextField id="outlined-basic" label="Date" variant="outlined" />
                        </DialogContentText>
                        <RedBar />
                        

                        <DialogContentText>
                            <TextField id="outlined-basic" label="Price" variant="outlined" />
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
