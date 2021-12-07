import React, {useState} from 'react';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { Grid, Typography } from '@material-ui/core';
import { Row } from 'simple-flexbox';

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

function AddExpenseComponent({ className = '', title, value }) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [items, setItems] = useState([
        { title: 'Grocery', checked: false, tag: TAGS.PERSONAL, price: "5.99" },
        {
            title: 'Transport',
            checked: false,
            tag: TAGS.GROUP,
            price: "8.99"
        },
        { title: 'Food', checked: true, tag: TAGS.PERSONAL, price: "10.99" }
    ]);
    const composedClassName = [classes.container, className].join(' ');

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
    

    function getNextTag(current = 'GROUP') {
        const tagLabels = ['PERSONAL', 'GROUP' ];
        const tagIndex = (tagLabels.indexOf(current) + 1) % 2;
        return TAGS[tagLabels[tagIndex]];
    }

    function renderAddButton() {
        return (
            <Row
                horizontal='center'
                vertical='center'
                className={[classes.tagStyles, classes.addButton].join(' ')}
                onClick={onAddButtonClick}
            >
                +
            </Row>
        );
    }

    return (
        <Column flexGrow={1} className={composedClassName} horizontal='center' vertical='center'>
            <Grid item xs container direction="column" className={classes.user}>
                <Grid item className={classes.user}>
                <Typography variant="h6" style={{fontSize: '30px'}}>
                       $1800.50
                    </Typography>
                    <Typography variant="body2">Total Expenses</Typography>
                    
                </Grid>
            </Grid> 
        </Column>
        
    );
}

export default AddExpenseComponent;
