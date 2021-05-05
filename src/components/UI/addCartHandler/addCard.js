import React from 'react'
import classes from './addCart.module.css';

const addCard = (props) => {
    let alert =null
    if(props.event){
        alert=(
            <div className={`alert alert-danger show fade ${classes.alert}`}   >
            <strong>ADD TO CART</strong>
            </div>
        )
    }
    return (
        <>
            {alert}
        </>
    )
}

export default addCard
