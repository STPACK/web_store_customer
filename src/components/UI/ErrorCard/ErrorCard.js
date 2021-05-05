import React from 'react'
import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import classes from './ErrorCard.module.css';

const ErrorCard = (props) => {
    let {error,closeHandler} = props
    return (
        <Card variant="outlined" className={classes.root} style={{backgroundColor:"#ffb3b3"}}>
            <CardContent>
                <Typography variant="subtitle1">{error}</Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="close" onClick={closeHandler}>
                <CancelIcon/>
                </IconButton>
            </CardActions>
            
        </Card>
    )
}

export default ErrorCard
