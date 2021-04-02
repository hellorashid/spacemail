import React, { useState, useEffect } from 'react';
import './App.css';
import theme from './theme.js'
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

import SignIn from './containers/SignIn.js'
import Sidebar from './components/Sidebar.js'
import RowView from './components/RowView.js'
import SplitView from './components/SplitView';


var CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
var API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

/**
 *  On load, called to load the auth2 library and API client library.
 */
// function handleClientLoad() {
//   window.gapi.load('client:auth2', initClient);
// }

class MainApp extends React.Component { 
  constructor(props) { 
    super(props)
    console.log('😀😀', process.env.REACT_APP_NOT_SECRET_CODE)
    window.gapi.load('client:auth2', this.initClient);

    this.state = { 
      loading: true,
      isSignedIn: false, 
      profile: {}
    }
  }

   initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then( () => {
      console.log("Gmail Lib Loaded")
      // Listen for sign-in state changes.
      // window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      console.log(window.gapi.auth2.getAuthInstance())
      // // Handle the initial sign-in state.
      // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get()  
      const profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
      let fullProfile = {}
      if (profile) { 
        fullProfile = { 
          id: profile.getId(),
          fullName: profile.getName(), 
          givenName: profile.getGivenName(),
          familyName:  profile.getFamilyName(), 
          imageUrl:  profile.getImageUrl(),
          email: profile.getEmail()
        }
      }

      this.setState({isSignedIn: isSignedIn, profile: fullProfile, loading: false})
    }, function(error) {
      console.log("Ohhh snap! :( ")
    });

  }

  signIn = () => { 
    console.log('Signing in...')
    window.gapi.auth2.getAuthInstance().signIn();
    this.initClient()
  }

  render() { 
  return (
    <div>
      { 
        this.state.isSignedIn ?
        <App signIn={this.signIn} profile={this.state.profile}  />
        : 
        <SignIn signIn={this.signIn} loading={this.state.loading}/>
      }
    </div>
  )}

}


class App extends React.Component {
    constructor(props) { 
      super(props)
      this.state = { 
        unicorn : '🦄', 
        emails: [], 
        showEmail : false, 
        singleEmail: {}
      }
    }

    componentDidMount = () => { 
      this.getEmails()
    }

    getLabels = () => { 
      window.gapi.client.gmail.users.labels.list({
        'userId': 'me'
      }).then(function(response) {
        var labels = response.result.labels;

        if (labels && labels.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            var label = labels[i];
            console.log(label)
          }
        } else {
          console.log('Nothing found...')
        }
      });
     }
 
    getEmails = () => { 
      console.log("Getting All Emails...")
      window.gapi.client.gmail.users.threads.list({
        'userId': 'me',
        // 'labelIds' : ['INBOX']
      }).then( (response) => {
        var threads = response.result.threads;
          let allEmails = []

          for ( let i in threads) { 
              // console.log('😀',threads[i])

              // let fullEmail = window.gapi.client.gmail.users.threads.get({
              //   'userId': 'me',
              //   'id': threads[i].id, 
              //   'format' : 'metadata'
              // })
              

              // console.log(fullEmail)
              // await fullEmail.execute( (response) => { 
              //   let labels = response.result.messages[0].labelIds
              //   console.log(labels)
              // })

              let tinyEmail = { 
                key: threads[i].id, 
                snippet: threads[i].snippet,
                from: 'test@example.com', 
              }
              allEmails.push(tinyEmail)
          }
          console.log('Got Emails!')
          this.setState({emails:allEmails })
      });
    }

    selectEmail = (email) => { 
      console.log("Email Selected", email)
      this.setState({showEmail: true, singleEmail: email })
    }

    test = () => { 
      const profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
      console.log(profile.getId())

    }


  render() { 
  return (
      <Grommet theme={theme} >
       <Box direction='row' flex >
    
          <Sidebar profile={this.props.profile} signIn={this.props.signIn}/>
          {/* 
          <RowView 
            emails={this.state.emails} 
            showEmail={this.state.showEmail}
            selectEmail={this.selectEmail}
            singleEmail={this.state.singleEmail}
            closeSingleEmail={() => this.setState({showEmail: false})}
          /> 
          */}
          <SplitView
            emails={this.state.emails} 
            showEmail={this.state.showEmail}
            selectEmail={this.selectEmail}
            singleEmail={this.state.singleEmail}
            closeSingleEmail={() => this.setState({showEmail: false})}
          />
        </Box>
      </Grommet>
  )};
}






export default MainApp;