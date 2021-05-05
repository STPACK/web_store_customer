import *as actionTypes from './actionTypes';
import {database} from '../../Firebase/Firebase';

export const fetchOrderList = ()=>{
    return (dispatch,getState)=>{
        dispatch(orderListStart())
        const uid = getState().auth.currentUser.uid
        database.ref('/orders/'+uid).once('value')
        .then(snapshot=>{
            const data = []
            snapshot.forEach(res=>{
                const result =res.val()
                data.push(result)
            })
            dispatch(orderListSuccess(data))
           
        })
        .catch(e=> dispatch(orderListFail(e.massage)))
    }
}

export const fetchDetail = (orderNumber)=>{
    return (dispatch,getState) =>{
        dispatch(orderListStart())
        const uid = getState().auth.currentUser.uid
        database.ref('/orders/'+uid+'/'+orderNumber).once('value')
        .then( snapshot => {
            const result = snapshot.val()
            dispatch(fetchDetailSuccess(result))
        })
        .catch(e=> dispatch(orderListFail(e.massage)))

    
    }
}
export const fetchDetailSuccess = (data)=>{
    return {
        type:actionTypes.ORDER_DETAIL_SUCCESS,
        data:data
    
    }
}



export const orderListStart =()=>{
    return{
        type:actionTypes.ORDER_LIST_START
    }
}
export const orderListSuccess =(data)=>{
    return{
        type:actionTypes.ORDER_LIST_SUCCESS,
        data:data
    }
}
export const orderListFail =(e)=>{
    return{
        type:actionTypes.ORDER_LIST_FAIL,
        error:e
    }
}