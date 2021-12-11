import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import DateComponent from './DateComponent';
import PriceComponent from './PriceComponent';
import {AiFillDelete} from 'react-icons/ai';


const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
    },
    icon:{
        color:'rgb(108, 99, 255)'
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue,
        margin: '0px 0px 0px 10px',
        fontSize:16,
        
    },
    itemDesc: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue2,
        margin: '0px 0px 0px 10px',
        fontSize:15,
        
    },
    itemValue: {
        color: theme.color.grayishBlue2
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    tagStyles: {
        textAlign: "center",
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
    UTILITIES: { text: 'UTILITIES', backgroundColor: '#FEC400', color: '#FFFFFF' },
    ENTERTAINMENT: { text: 'ENTERTAINMENT', backgroundColor: '#9966FF', color: '#FFFFFF' },
    TRAVEL: { text: 'TRAVEL', backgroundColor: '#FF6484', color: '#FFFFFF' },
    MISC: { text: 'MISC', backgroundColor: '#FF9F3F', color: '#FFFFFF' },
    FOOD: { text: 'FOOD', backgroundColor: '#4BC0C0', color: '#FFFFFF' },

};


function ExpenseListComponent(props) {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        
        <CardComponent
            containerStyles={props.containerStyles}
            title='Expense List'
            subtitle='List of all your expenses'
            
            items={[
                <Row horizontal='space-between' vertical='center'>
                    {/* <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                        Add New Expense
                    </span>
                    {renderAddButton()} */}
                </Row>,
                ...props.items.map((exp, index) => (
                    // <TaskComponent
                    //     classes={classes}
                    //     index={index}
                    //     item={item}
                    //     onCheckboxClick={onCheckboxClick}
                    // />
                    <Row horizontal='space-between' vertical='center'>
            <Row>
                <span className={classes.itemTitle} key={index}>{exp.expenseName}</span>
                
            </Row>
            

            <TagComponent
                
                backgroundColor= "#bdc3c7"
                classes={classes}
                color='#000000'
                index={index}
                text={exp.expenseCategory}
            />
            <span className={classes.itemDesc}>{exp.expenseDescription}</span>
            
            <PriceComponent classes={classes} price={exp.expenseCostInDollars}></PriceComponent>
            
            
        </Row>
                ))
            ]}
        />
    );
}


function TaskComponent({ classes, index, item = {}, onCheckboxClick, onTagClick }) {
    const { tag = {} } = item;
    // console.log(item)

    return (
        <>
        {item.map((exp, i) => (
        <Row horizontal='space-between' vertical='center'>
            <Row>
                <span className={classes.itemTitle}>{exp.title}</span>
                
            </Row>
            <TagComponent
                backgroundColor={tag.backgroundColor}
                classes={classes}
                color={tag.color}
                index={index}
                text={tag.text}
            />
            <span className={classes.itemTitle}>{exp.desc}</span>
            
            <PriceComponent classes={classes} price={exp.price}></PriceComponent>
            <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    { <AiFillDelete color='red'/>}
                </div>
            
            
        </Row>
        ))}
        </>
    );
}

function TagComponent({ backgroundColor, classes, color, index, onClick, text }) {
    return (
        <Row
            horizontal='center'
            vertical='center'
            style={{ backgroundColor, color }}
            className={classes.tagStyles}
        >
            {text}
        </Row>
    );
}

export default ExpenseListComponent;
