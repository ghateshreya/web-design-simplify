import React, { useState } from 'react';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { Grid, Modal, Typography } from '@material-ui/core';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import ModalCompo from './ModalCompo';
import { Button } from 'react-bootstrap';
import './Expense.css';
import { render } from 'preact';

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
        top:0,
        backgroundColor: "white",
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        margin: "60px 30px 30px 30px",
    },
    modalH2:{
        color: '#000000',
        fontSize: '16px',
    },
    category:{
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    title:{
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    tag:{
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    date:{
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold'
    },

    price:{
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

function AddExpenseComponent(props) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const composedClassName = [classes.container, props.className].join(' ');
    const [modal, setModal] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    function onAddButtonClick() {
        props.setItems((prev) => {
            const newItems = [...prev];
            newItems.push({
                icon: <FaMoneyCheckAlt />,
                title: `New Task`,
                tag: TAGS.PERSONAL,
                date: 'Dec 12, 2021',
                price: '5.99'
            });
            return newItems;
        });
    }

    function onClick() {
        if (!modal) {
            setModal(true);

        }
        else {
            setModal(false)
        }
    }
    function onClose() {
        setModal(false);
    }



    const ModalComponent = () => {
        return (
            <div className={classes.modal}>
                <div className={classes.modalH2}>Add Expense</div>
                <div className={classes.category}>Category</div>
                <div className={classes.title}>Title</div>
                <div className={classes.tag}>Tag</div>
                <div className={classes.date}>Date</div>
                <div className={classes.price}>Price</div>

            </div>
        )
    };



    return (
        <Column flexGrow={1} className={composedClassName} horizontal='center' vertical='center' onClick={onClick}>
            <Grid item xs container direction="column" className={classes.user}>
                <Grid item className={classes.user} >
                    <Typography variant="h6" style={{ fontSize: '30px' }}>
                        +
                    </Typography>
                    <Typography variant="body2">Add New Expense</Typography>
                    { modal ? <ModalComponent/> : null }


                </Grid>
            </Grid>
        </Column>
        

    );
}

export default AddExpenseComponent;
