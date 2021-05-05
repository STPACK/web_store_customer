import React,{useEffect} from 'react'

import *as actions from '../../store/actions/index';
import {statusFilter,statusColor} from '../../shared/utility'
import { Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './Orders.module.css';

const Orders = (props) => {
  const {fetchOrderHandler,orderList} = props

  useEffect(() => {
    fetchOrderHandler()
  }, [fetchOrderHandler])
    return (
        <>
            <div className="container">
        <div className="row ">
            <div className="col-12 my-3">
            <h3>My Account</h3>
            </div>
           
            <div className="col-12 my-3">
              <ul className="nav nav-tabs ">
                <li className="nav-item">
                  <h5> <Link to="/account" className="nav-link " >account</Link> </h5>
                </li>
                <li className="nav-item">
                <h5> <Link to="/orders"  className="nav-link active">order</Link> </h5>
                </li>
              </ul>
            </div>

            <div className="col-12">
                <Table  hover >
                    <thead className={classes.tableHead}>
                        <tr>
                            <th>Order number</th>
                            <th>subTotal</th>
                            <th>Order date</th>
                            <th>status</th>
                            <th>detail</th>
                        </tr>
                    </thead>
                    <tbody className={classes.tableBody}>
                      {orderList.map(res=>(
                        <tr key= {res.orderNumber}>
                          <th> <span>{res.orderNumber}</span> </th>
                            <th>฿{res.summaryPrice.toFixed(2)}</th>
                            <th>{res.orderDate}</th>
                            <th className={statusColor(res.status)} >{statusFilter(res.status)}</th>
                            <th>
                              {res.status === 0 ? <Link to={"/confirm_payment/"+res.orderNumber}>detail</Link>
                              
                              :<Link to={"/orders/"+res.orderNumber}>detail</Link>
                            }
                            
                             </th>
                        </tr>
                      ))}
                        
                    </tbody>

                </Table>
            </div>
       
        
        </div>
      </div>
            
        </>
    )
}

const mapStateToProps =state =>{
  return{
    orderList : state.orderList.orderList
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchOrderHandler: ()=> dispatch(actions.fetchOrderList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders)
