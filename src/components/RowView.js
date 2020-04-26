import React, { useState, useEffect } from 'react';
import {
  Box,
  Grommet,
  Heading,
  Button,
  Image, 
  Text, 
  TextInput,
  Layer 
} from 'grommet';
import { PoseGroup } from 'react-pose'

import EmailRow from './EmailRow.js'
import SingleEmail from './SingleEmail.js'


function RowView(props) { 
    return(
      <Box flex align='center' pad="medium" background='light-2'>
      <Box
        justify='start'
        width='medium'
        align='center'
        background="light-1"
        round="small"
      >   
          <TextInput  placeholder="search anything..." 
            focusIndicator={false}
            plain
          />
      </Box>
  
      <Box pad="medium"> 
      <PoseGroup> 
      {
        props.emails.map( (email) => { 
          return (
            <EmailRow key={email.key} from={email.from} snippet={email.snippet} id={email.key} email={email}
              selectEmail={props.selectEmail}
            />
        )})
      }
      </PoseGroup>
      </Box>
      {
        props.showEmail && 
        <SingleEmail 
          onClose={props.closeSingleEmail} 
          singleEmail={props.singleEmail}
        />
      }
      </Box>
    )
  }

  export default RowView