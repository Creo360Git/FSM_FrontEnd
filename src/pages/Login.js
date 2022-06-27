import React from 'react';

import {
    Box,
    Card,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
    Grid,
  } from "@mui/material";

  import {makeStyles} from "@mui/styles";
  const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        position: "absolute",
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.main,
    },
    card: {
        width: "479px",
        height: "497px",
        background: "linear-gradient(109.46deg, #457CCE 1.4%, rgba(196, 196, 196, 0.1) 300%)",
        borderRadius:"25px",

      [theme.breakpoints.up(theme.breakpoints.values.md)]: {
        marginTop:"10vw"
      },
      [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
        marginTop:"9vw"
      }, 
      [theme.breakpoints.up(theme.breakpoints.values.xl)]: {
        marginTop:"12vw"
      },
    },
    inputfield: {
        width: "419px",
        height: "50px",
        left: "515px",
        top: "373px",
        marginLeft: "34px",
        background: "linear-gradient(109.46deg, rgba(201, 201, 201, 0.8) 1.57%, rgba(196, 196, 196, 0.1) 100%)",
        opacity: "0.9",
        borderRadius:"7px"
    },
  }));

const Login = () => {
    const classes = useStyles();
    return(
        <main className={classes.root}>
            <Box className={classes.root}>  
                <Grid container direction="column" justifyContent="center"  alignItems="center">
                    <Card className={classes.card} style={{borderRadius:"25px",opacity:"0.9"}} >
                    <Typography
                    color="#FFFFFF"
                    variant="h1"
                    gutterBottom
                    style={{ fontFamily: "IceLand", paddingLeft: "25px", marginTop:"30px", textDecoration:"underline 2px",textUnderlineOffset:"10px"}}>
                        <label>Login</label>
                    </Typography>
                    <Typography
                    gutterBottom
                    variant="subtitle1"
                    color="#FFFFFF"
                    style={{ fontFamily: "Montserrat", paddingLeft:"35px",marginTop:"10px"}}>
                        <label>Welcome to FSM</label>
                    </Typography>
                    <Typography
                    color="#FFFFFF"
                    variant="h4"
                    gutterBottom 
                    style={{ fontFamily: "Roboto",margin:"15px 35px"}}>
                        <label>Username</label>
                    </Typography>
                    <input id='username' type='text' className={classes.inputfield} placeholder='Enter your username'></input>
                    <Typography
                    color="#FFFFFF"
                    variant="body1"
                    gutterBottom
                    style={{ fontFamily: "Roboto",margin:"15px 35px"}}>
                        <label>Password</label>
                    </Typography>
                    <input id='password' type="password" className={classes.inputfield} placeholder='Enter your password'></input>
                    <p><span style={{color: 'white',marginLeft:"250px",marginTop:"2px",fontFamily: "Montserrat"}}>Forgot Password?</span>
                    <a href="/" style={{color:"#FFFFFF", fontWeight:"400", textDecoration:"none",fontFamily: "Montserrat"}}>Contact Us</a></p>
                    <Button 
                    variant='outlined'
                    sx={{width:'419px', height:'45px',marginLeft:'35px',background:'#FFFFFF',borderRadius:'7px'}}>
                    <Typography
                    variant="button"
                    gutterBottom
                    style={{ fontFamily: "Roboto"}}>LOGIN
                    </Typography>
                    </Button>
                    <FormControlLabel control={<Checkbox/>} style={{color:'white',marginLeft:"150px"}} label="Remember my login"/>
                    </Card>
                 </Grid>
            </Box>
        </main>
    )
}

export default Login;
