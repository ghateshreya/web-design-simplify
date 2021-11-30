import ExpenseDashboard from "./ExpenseDashboard";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";
import TotalExpense from "./TotalExpense";
import ChartComponent from './ChartComponent';

const Expense = () => {
    return (
        <div className='expense'>
            <div className='expense-main'>
                <h1>Expense Dashboard</h1>
                <ExpenseDashboard></ExpenseDashboard>
                <ExpenseList></ExpenseList>
            </div>
            <div className='expense-sidebar'>
                <AddExpense></AddExpense>
                <TotalExpense></TotalExpense>
                <ChartComponent></ChartComponent>
            </div>
        </div>
    );
}

export default Expense;