import React, {useState} from 'react';
import {
    Box,
} from 'grommet';
import EmailRow from './EmailRow.js'
import { PoseGroup } from 'react-pose';
import SingleEmail from './SingleEmail.js'

function SplitView (props) { 
    return(
    <Box flex direction="row" height="100vh">
        <Box
            flex
            width='medium'
            background='light-2'
            align='center'
            justify='between'
            style={{ overflowX: 'hidden', maxWidth: 350, overflowY: 'auto'}}
            pad="small"
        >   
            {
            props.emails.map( (email) => { 
                return (
                    <EmailRow 
                        key={email.key} 
                        from={email.from} 
                        snippet={email.snippet} 
                        id={email.key} 
                        email={email}
                        selectEmail={props.selectEmail}
                    />
                )})
            }
        </Box>

        <Box flex background="light-1" fill>
            { props.showEmail && 
            <SingleEmail 
            onClose={props.closeSingleEmail} 
            singleEmail={props.singleEmail}
            />
            }

        </Box>
        
    </Box>
    )
}

const SingleRow = (props) => { 
    
}

export default SplitView;