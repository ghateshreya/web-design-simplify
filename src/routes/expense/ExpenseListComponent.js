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

    function onCheckboxClick(index) {
        props.setItems((prev) =>{
            const newItems = [...prev];
            newItems.pop({
                title: index.title,
                tag: index.tag,

            })
        })
    }

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
                ...props.items.map((item, index) => (
                    <TaskComponent
                        classes={classes}
                        index={index}
                        item={item}
                        onCheckboxClick={onCheckboxClick}
                    />
                ))
            ]}
        />
    );
}

function TaskComponent({ classes, index, item = {}, onCheckboxClick, onTagClick }) {
    const { tag = {} } = item;
    return (
        <Row horizontal='space-between' vertical='center'>
            
            <Row>
                <span className={classes.itemTitle}>{item.title}</span>
                
            </Row>
            <TagComponent
                backgroundColor={tag.backgroundColor}
                classes={classes}
                color={tag.color}
                index={index}
                text={tag.text}
            />
            <span className={classes.itemTitle}>{item.desc}</span>
            
            <PriceComponent classes={classes} price={item.price}></PriceComponent>
            <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    { <AiFillDelete color='red'/>}
                </div>
            
            
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
        >
            {text}
        </Row>
    );
}

export default ExpenseListComponent;
