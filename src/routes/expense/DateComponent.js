import React from 'react';
import './Expense.css';

function DateComponent (props){
    return (
        <div className='dateComponent'>
            {props.date}
        </div>
    )
}

export default DateComponent;