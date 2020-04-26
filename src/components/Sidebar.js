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
import { Notification, SettingsOption, Close } from 'grommet-icons';


function Sidebar (props) { 
    return(
        <Box
        animation={[
          { type: "fadeIn", duration: 250 },
          { type: "slideRight", size: "small", duration: 300 }
        ]}
        width='small'
        background='light-1'
        // elevation='large'
        align='center'
        justify='between'
        style={{height: '100vh',  position: 'sticky', top: 0}}
        pad="small"
      >
      <Box
        justify='start'
        style={{height: '70px'}}
        width='large'
        align='center'
      >   
        <Box
          justify='center'
          style={{height: '40px', width: '40px', }}
        > 
          <Image  fit="cover" style={{borderRadius: '20px', width: '40px', height: '40px'}} src={props.profile.imageUrl} />
        </Box>
        <Text size='small' margin='none' color="dark-5"
        >{props.profile.email}</Text>

        {/* <Button
          onClick={this.props.signIn}
        > Sign In</Button> */}
      </Box>


      <Box> 
        <Button hoverIndicator
        //   onClick={this.getEmails}
        >
          <Box pad={{ horizontal: "large", vertical: "small"}}  round="small">
            <Text size='small'>Inbox</Text>
          </Box>
        </Button>

        <Button hoverIndicator
        //   onClick={() => console.log(this.state.emails[0])}
        >
          <Box pad={{ horizontal: "large", vertical: "small"}}  round="small">
            <Text size='small'>Updates</Text>
          </Box>
        </Button>

        <Button href="#" hoverIndicator
        //   onClick={this.getLabels}
        >
          <Box pad={{ horizontal: "large", vertical: "small"}}  round="small">
            <Text size='small'>Other</Text>
          </Box>
        </Button>

        <Button href="#" hoverIndicator
        //   onClick={this.test}
        >
          <Box pad={{ horizontal: "large", vertical: "small"}}  round="small">
            <Text size='small'>Test</Text>
          </Box>
        </Button>
      </Box>

      <Box
        justify='end'
        style={{height: '70px', paddingLeft: '5px', paddingTop: '5px'}}
        width='large'
        align='center'
      >   
        <Button hoverIndicator icon={<SettingsOption size='small'/>} onClick={() => {}} />
      </Box>
      </Box>
    )
}

export default Sidebar;