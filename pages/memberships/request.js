import { Card, CardActions, CardContent, Container, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import React from 'react'
import ElevateAppBar from '../../components/General/layouts/NavBar';
const useStyles=makeStyles(theme=>({
    container:{
        marginTop:'20vh'
    }
}))
const MembershipRequestPage=props=>{
    const classes=useStyles();
    return (
        <>
            <ElevateAppBar/>
            <Container className={classes.container} >
                <Grid container spacing={3} justify='center' alignContent='center' alignItems='center' >
                    <Grid item xs={3} >
                        <Card elevation={4} >
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Daily Member
                                </Typography>
                                <Typography variant="h5" component="h2">
                                7.5 $/day
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                adjective
                                </Typography>
                                <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3} >
                        <Card elevation={4} >
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Annual Member
                                </Typography>
                                <Typography variant="h5" component="h2">
                                100 $/year
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                adjective
                                </Typography>
                                <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default MembershipRequestPage;