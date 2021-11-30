import ExpenseItem from './ExpenseItem';

const ExpenseList = () =>{
    return (
        <div className='expense-list'>
            <h3>Expense History</h3>
            <div className='expense-items'>
                <ExpenseItem></ExpenseItem>
                <ExpenseItem></ExpenseItem>
                <ExpenseItem></ExpenseItem>
                <ExpenseItem></ExpenseItem>
                <ExpenseItem></ExpenseItem>
                <ExpenseItem></ExpenseItem>
            </div>
        </div>
    );
}

export default ExpenseList;