import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import TotalCardComponent from './TotalExpense';
import ExpennseListComponent from './ExpenseListComponent';
import ExpenseChart from './ExpenseChart';
import AddExpenseComponent from './AddExpenseComponent';

const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
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



function ExpenseComponent() {
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
                    <AddExpenseComponent
                        className={classes.miniCardContainer}
                        // title='Unresolved'
                        // value='60'
                    />
                   
                    <TotalCardComponent
                        className={classes.miniCardContainer}
                        title='Overdue'
                        value='16'
                    />
                </Row>
                
            </Row>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{ 769: 'column' }}
            >
                
                <ExpennseListComponent containerStyles={classes.tasks} />
                <ExpenseChart />
            </Row>
        </Column>
    );
}

export default ExpenseComponent;
