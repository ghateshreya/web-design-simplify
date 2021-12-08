import React, { useState } from 'react';
import { Row } from 'simple-flexbox';
import CardComponent from 'components/cards/CardComponent';
import ChartComponent from './ChartComponent';
import './Expense.css';


function TasksComponent(props) {

    return (
        <div className='chartContainer'>
            <ChartComponent/>
        </div>
        
    );
}



export default TasksComponent;
