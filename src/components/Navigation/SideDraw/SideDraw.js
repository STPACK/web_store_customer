import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDraw.module.css';

const SideDraw = (props) => {
    const { cart, currentUser , } = props;
    const isAuth = currentUser !== null;
    let attachedClasses=[classes.sideDraw , classes.close]
    if(props.showSideDraw){
        attachedClasses=[classes.sideDraw , classes.open]
    }
    return (
        <>
        <div className={attachedClasses.join(' ')} onClick={props.closeSideDraw}>
            <nav>
            
            <NavigationItems
            totalCart={cart}
            isAuth={isAuth}
            display={currentUser}
            
          />
            </nav>
        </div>
            
        </>
    )
}

export default SideDraw
