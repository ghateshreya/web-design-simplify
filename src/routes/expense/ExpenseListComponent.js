import React, { useState } from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { IconCheckboxOn, IconCheckboxOff } from 'assets/icons';
import CardComponent from 'components/cards/CardComponent';

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
    priceStyles: {
        fontSize: 12,
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

function TasksComponent(props) {
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

    function onCheckboxClick(index) {
        setItems((prev) => {
            const newItems = [...prev];
            newItems[index].checked = newItems[index].checked ? false : true;
            return newItems;
        });
    }
    function getNextTag(current = 'GROUP') {
        const tagLabels = ['PERSONAL', 'GROUP' ];
        const tagIndex = (tagLabels.indexOf(current) + 1) % 2;
        return TAGS[tagLabels[tagIndex]];
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
        <CardComponent
            containerStyles={props.containerStyles}
            title='Expense List'
            link='View all'
            subtitle='List of all your expenses till date'
            items={[
                <Row horizontal='space-between' vertical='center'>
                    <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                        Add New Expense
                    </span>
                    {renderAddButton()}
                </Row>,
                ...items.map((item, index) => (
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
                <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    {item.checked ? <IconCheckboxOn /> : <IconCheckboxOff />}
                </div>
                <span className={classes.itemTitle}>{item.title}</span>
            </Row>
            <PriceComponent classes={classes} price={item.price}></PriceComponent>
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

function PriceComponent({classes, price}){
    return (
        <Row className={classes.priceStyles}>
            {price}
        </Row>
    )
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

export default TasksComponent;
