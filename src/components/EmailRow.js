import React from 'react';
// import './App.css';
import {
  Box,
  Text, 
  Grid
} from 'grommet';
// import { Notification, SettingsOption } from 'grommet-icons';
import posed, { PoseGroup } from 'react-pose'
import { Base64 } from 'js-base64';


const HoverBox = posed.div({
  hoverable: true,
  pressable: true,
  focusable: true,
  enter: { 
    opacity: 1
  },
  exit: { opacity: 0 },
  init: {
    width: '100%',
    padding: 0,
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  hover: {
    scale: 1.01,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  },
  press: {
    scale: 1.02,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  }, 
  expanded: { 
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
    height: '90vh', 
    width: '80vw', 
    scale: 1.01,
  },
  normal: { 
    // height: '80px'
    padding: 0,
    margin: 5, 
    width: '100%'
  }
});


class EmailRow extends React.Component { 
  constructor(props) { 
    super(props)
    this.state = { 
      from: '', 
      unread: false, 
      expanded: false,
      focused: false, 
      email: {}
    }
  }

  componentDidMount = () => { 
    this.getInfo()
  }

  openEmail = () => { 
    // this.setState({expanded: true })
    console.log('Email,',this.state.expanded, this.props.email, this.state.email)

    let subject = this.state.email.messages[0].payload.headers.filter( email => { 
      return email.name == 'Subject'
    })
    subject = subject[0].value

    let date = this.state.email.messages[0].payload.headers.filter( email => { 
      return email.name == 'Date'
    })
    date = date[0].value.substring(0,10)

    let html = ''
    let body = this.state.email.messages[0].payload
    
    if (body.mimeType == "text/html" ) { 
      html = Base64.decode(body.body.data);
    } else if (body.mimeType == "multipart/alternative") {
      if (body.parts[0].mimeType == 'text/html') {
        html = Base64.decode(body.parts[0].body.data);
      } else if (body.parts[1].mimeType == 'text/html') { 
        html = Base64.decode(body.parts[1].body.data);
      }
    } else if (body.mimeType == "text/plain") { 
      html = Base64.decode(body.body.data);
    }
    
    this.props.selectEmail({subject: 'This is a subject',
     from : this.state.from, 
     email: this.state.email, 
     subject: subject, 
     date: date, 
     body: body, 
     html: html
    })
  }

  getInfo = () => { 

    let fullEmail = window.gapi.client.gmail.users.threads.get({
      'userId': 'me',
      'id': this.props.id, 
      // 'format' : 'metadata'
    })

    let allLabels = []
    
    fullEmail.execute( (response) => { 
        // console.log('Full', response)
        // console.log(response.result.messages[0].payload.headers[14].value)
        let labels = response.result.messages[0].labelIds ? response.result.messages[0].labelIds : []
        // console.log(response.result.messages[0])
        let unread = labels.includes("UNREAD")
        let focused = labels.includes("IMPORTANT")

        for (let label in labels) { 
            allLabels.push(label)
            // if (!allLabels.includes(label) ) { 
            //     allLabels.push(label)
            // }
        }

        // console.log(labels)

        let headers = response.result.messages[0].payload.headers

        for (let j in headers) { 
          if (headers[j].name == 'From') { 
            let from = headers[j].value
            let fromFinal = from.substr(0, from.indexOf('<')); 
            fromFinal = fromFinal.replace(/"/g,'');
            fromFinal = fromFinal.replace(/&#39;/g,"'");
            
            this.setState({from: fromFinal, unread: unread, focused: focused, email: response})
          }
        }
    });
  }

  render() { 
    let snippet = this.props.snippet.replace(/&#39;/g,"'");
    snippet = snippet.replace(/&quot;/, '"')
    let pose = 'normal'
  
  return (
       <HoverBox pose={pose} >
        {/* <Box
          justify='start'
          // width='large'
          align='center'
          background="light-3"
          pad="small"
          onClick={this.openEmail}
        >  
          <Grid
            fill
            areas={[
              { name: "nav", start: [0, 0], end: [0, 0] },
              { name: "main", start: [1, 0], end: [1, 0] }
            ]}
            columns={["small", "flex"]}
            rows={["flex"]}
            gap="small"
          >
            <Box gridArea="nav" >
            <Text size="small" truncate weight={this.state.unread ? 'bold' : 'normal'}>
              {this.state.from}</Text> 
            </Box> 
            <Box gridArea="main">
              <Text size="small" truncate  weight={this.state.unread ? 'bold' : 'normal'}>{snippet}</Text> 
            </Box>
          </Grid>
        </Box> */}
          <Box
            justify='start'
            align='start'
            background="light-3"
            pad="none"
            onClick={this.openEmail}
            direction="column"
            // margin="small"
            height="70px"
          >  
            <Box height="30" pad="xsmall" > 
            <Text size="small" truncate weight={this.state.unread ? 'bold' : 'normal'}>
                {this.state.from}
            </Text> 
            </Box>
            <Box  height="30" pad="xsmall">
            <Text size="small" truncate width="100" weight={this.state.unread ? 'bold' : 'normal'}>{snippet.substring(0,100)}</Text> 
            </Box>
          </Box>

        </HoverBox>


  )}
}


export default EmailRow;