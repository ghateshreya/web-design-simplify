import { FaHamburger } from 'react-icons/fa';

const ExpenseItem = () =>{
    return (
        <div className='expense-item'>
            <div className='icon'><FaHamburger fontSize='2x'/></div>
            <div className='name'>Hamburger</div>
            <div className='date'>Nov 27, 2021</div>
            <div className='price'>$8.99</div>
        </div>
    );
}

export default ExpenseItem;