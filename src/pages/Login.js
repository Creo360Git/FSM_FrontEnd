import React from 'react';

import {
    Box,
    Card,
    Typography,
    Button,
    FormControlLabel,
    Checkbox
  } from "@mui/material";

  import {makeStyles} from "@mui/styles";

  const useStyles1 = makeStyles((theme) => ({
    background: {
        flexGrow: 1,
        backgroundColor:theme.palette.secondary.main,
        padding: theme.spacing(1),
    },
    card: {
        position: "absolute",
        height: "497px",
        width: "479px",
        left: "485px",
        top: "176px",
        background: "linear-gradient(109.46deg, #457CCE 1.4%, rgba(196, 196, 196, 0.1) 190%)",
        borderRadius:"25px"
    },
    frame: {
        position: "absolute",
        width: "271.09px",
        height: "10.46px",
        color: "black",
        borderRadius: "14px",
    },
    line:   {
         width: "110px",
         position:"absolute",
         left: "25px",
         top:"60px",
         border: "0.5px solid white"
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
    }
  }));

const Login = () => {
    const classes = useStyles1();
    return(
        <main className={classes.background}>
            <Box height="737px" width="100.55%" className={classes.background}>
                <form>
                    <Card 
                    className={classes.card} 
                    style={{borderRadius:"25px",opacity:"0.9"}}>
                    <Typography
                    color="#FFFFFF"
                    variant="h1"
                    gutterBottom
                    style={{ fontFamily: "IceLand", paddingLeft: "25px", marginTop:"30px"}}>
                        <label>Login</label>
                    </Typography>
                    <hr className={classes.line}></hr>
                    <Typography
                    variant="subtitle1"
                    color="#FFFFFF"
                    gutterBottom
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
                    <p><span style={{color: 'white',marginLeft:"250px",marginTop:"2px"}}>Forgot Password?</span>
                    <a href="/" style={{color:"#FFFFFF", fontWeight:"600", textDecoration:"none"}}>Contact Us</a></p>
                    <Button 
                    variant='outlined'
                    sx={{width:'419px', height:'45px',marginLeft:'35px',background:'#FFFFFF',borderRadius:'7px'}}>
                    <Typography
                    variant="button"
                    gutterBottom
                    style={{ fontFamily: "Roboto"}}>LOGIN
                    </Typography>
                    </Button>
                    <div style={{left:'2000px'}}>
                    <FormControlLabel control={<Checkbox/>} style={{color:'white'}} label="Remember my login" /></div>
                    </Card>
                </form>
            </Box>
        </main>
    )
}

export default Login;
