import React , {useState} from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import TotalCardComponent from './TotalExpense';
import ExpennseListComponent from './ExpenseListComponent';
import ExpenseChart from './ExpenseChart';
import AddExpenseComponent from './AddExpenseComponent';
import { FaHamburger, FaGasPump, FaShoppingBag } from "react-icons/fa";

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
    calendar: {
        marginTop: '20px',
    }
}));

const TAGS = {
    PERSONAL: { text: 'PERSONAL', backgroundColor: '#FEC400', color: '#FFFFFF' },
    GROUP: { text: 'GROUP', backgroundColor: '#29CC97', color: '#FFFFFF' }
};

function ExpenseComponent(props) {
    const classes = useStyles();
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

    // State for defining data
    const [items, setItems] = useState([
        { icon: <FaShoppingBag/> ,title: 'Grocery', tag: TAGS.PERSONAL, date:'Dec 11, 2021', price: "5.99" },
        {
            icon: <FaGasPump />,
            title: 'Transport',
            tag: TAGS.GROUP,
            date:'Dec 10, 2021',
            price: "8.99"
        },
        { icon: <FaHamburger/>, title: 'Food', checked: true, tag: TAGS.PERSONAL, date:'Dec 07, 2021', price: "10.99" }
    ]);

    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <Row
                    flexGrow={1}
                    wrap
                    className={classes.container}
                    horizontal='center'
                    breakpoints={{ 1024: 'column' }}
                >
                     <Row flexGrow={1} breakpoints={{ 1024: classes.stats }}>
                        {renderStat('Personal Expenses', '$23.45')}
                        {renderStat('Group Expenses', '$108.50')}
                    </Row>
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    
                   
                    <TotalCardComponent
                        className={classes.miniCardContainer}
                        title='Overdue'
                        value='16'
                    />
                    <AddExpenseComponent 
                        className={classes.miniCardContainer}
                        setItems = {setItems}
                        // title='Unresolved'
                        // value='60'
                    />
                </Row>
                
            </Row>
            {/* <Row className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}>
                    <AddExpenseForm />


            </Row> */}
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{ 769: 'column' }}
            >
                
                <ExpennseListComponent containerStyles={classes.tasks} setItems={setItems} items={items}/>
                <ExpenseChart />
            </Row>
        </Column>
    );
}

export default ExpenseComponent;
