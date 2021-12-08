import React, { useState } from 'react';
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
    PERSONAL: { text: 'PERSONAL', backgroundColor: '#FEC400', color: '#FFFFFF' },
    GROUP: { text: 'GROUP', backgroundColor: '#29CC97', color: '#FFFFFF' }
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
    function getNextTag(current = 'GROUP') {
        const tagLabels = ['PERSONAL', 'GROUP' ];
        const tagIndex = (tagLabels.indexOf(current) + 1) % 2;
        return TAGS[tagLabels[tagIndex]];
    }

    function onAddButtonClick() {
        props.setItems((prev) => {
            const newItems = [...prev];
            newItems.push({
                title: `Task ${newItems.length + 1}`,
                checked: false,
                tag: getNextTag()
            });
            return newItems;
        });
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
                onClick={onTagClick}
                text={tag.text}
            />
            <DateComponent date={item.date}></DateComponent>
            <PriceComponent classes={classes} price={item.price}></PriceComponent>
            <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    { <AiFillDelete/>}
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
