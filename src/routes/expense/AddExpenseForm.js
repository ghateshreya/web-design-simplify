import React, {useState} from 'react';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { Grid, Modal, Typography } from '@material-ui/core';

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
    },
    container: {
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        margin: '60px 30px 0px 0px',
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

    function onAddButtonClick() {
        props.setItems((prev) => {
            const newItems = [...prev];
            newItems.push({
                title: `New Task`,
                tag: TAGS.PERSONAL,
                date: 'Dec 12, 2021',
                price: '5.99'
            });
            return newItems;
        });
    }

    return (
        <Column flexGrow={1} className={composedClassName} horizontal='center' vertical='center' onClick={onAddButtonClick}>
            <Grid item xs container direction="column" className={classes.user}>
                <Grid item className={classes.user} >
                    Form
                    
                </Grid>
            </Grid> 
        </Column>
        
    );
}

export default AddExpenseComponent;
