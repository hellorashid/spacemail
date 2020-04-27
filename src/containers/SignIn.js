import React, {useState} from 'react';
import {
    Box,Button
} from 'grommet';
import LogoCircle from '../assets/logo_circle.png'

const SignIn = (props) => { 
    return(
        <Box flex background="#03214B" style={{width: '100vw', height: '100vh'}} animation="fadeIn"
        align="center" justify="center"
        >   

            <img src={LogoCircle} alt="Logo" width="150" />
            { props.loading == false &&  
            <Box 
            width="200px" 
            height="80px" 
            // background="#efefef" 
            elevation="large"
            justify="center" align="center"   
            onClick={props.signIn}
            hoverIndicator={true}
            round="small"          
            style={{cursor: "pointer"}}
            margin={{top: "small"}}
            >
                <h3>Sign In</h3>
            </Box>
            }


        </Box>
    )
}

export default SignIn
