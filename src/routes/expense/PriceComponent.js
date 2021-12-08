import React from 'react';
import './Expense.css';

function PriceComponent (props){
    return (
        <div className='priceComponent'>
            {props.price}
        </div>
    )
}

export default PriceComponent;