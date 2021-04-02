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
import { parse } from 'node-html-parser';

const batman = 'https://images-na.ssl-images-amazon.com/images/I/31x%2Bq3aNVKL._AC_SX425_.jpg'

const SingleEmail = (props) => { 
  const [html, setHtml] = React.useState(props.singleEmail.html)
  const test = () => { 
      console.log(props.singleEmail.html)
      console.log(root)
      console.log(root.querySelectorAll('img'))
      let images = root.querySelectorAll('img')
      images.map(image => { 
          let width = parseInt(image.attributes.width, 10)
          let height = parseInt(image.attributes.height, 10)
          if (width < 11 || height < 11) { 
              console.log( width, height)
              // console.log(image, width, height)
              image.setAttribute('src', batman)
              image.setAttribute('width', '50')
              image.setAttribute('height', '50')
            }
          })
          // setHtml(root)
    }
  
    let tracker = false
    const root = parse(props.singleEmail.html);
    root.querySelectorAll('img').map(image => { 
        let width = parseInt(image.attributes.width, 10)
        let height = parseInt(image.attributes.height, 10)
        if (width < 12 || height < 12) { 
          console.log(width, height)
          tracker = true
          image.setAttribute('src', batman)
          image.setAttribute('width', '50')
          image.setAttribute('height', '50')
      }
  })

  return (
    // <Layer
    //   // position="right"
    //   // animation="fade"
    //   // full="vertical"
    //   // modal
    //   onClickOutside={props.onClose}
    //   onEsc={props.onClose}
    //   // style={{filter: 'invert(100%) hue-rotate(180deg)', }}
    // > 
    <Box
      // style={{filter: 'invert(100%) hue-rotate(180deg)', }}
      animation="fadeIn"
      key={props.singleEmail.subject}
    >
        {/* {tracker && <p>Possible tracker detected - took care of it, don't worry ✌</p>} */}

        <Box flex={false} direction="row" justify="start">
          <Button icon={<Close />} onClick={props.onClose}  />
          <Heading level={3} margin="small">
            {props.singleEmail.subject}
          </Heading>
          <Heading level={4}>{props.singleEmail.date}</Heading>
        </Box>
        <Box
          fill="vertical"
          overflow="auto"
          width="xlarge"
          pad="medium"
        >
      
          <Box flex="grow" overflow="auto" pad={{ vertical: "small" }}  style={{backgroundColor: '#efefef', borderRadius: 20}}>
            <div dangerouslySetInnerHTML={{ __html: root }} />
          </Box>

          <Box flex={true} as="footer" align="start"
          >
            <Button
              onClick={() => console.log(props.singleEmail.body)}
              type="submit"
              label="Submit"
              primary
            />
            <Button
              label="Archive"
              primary
            />
          </Box>
        </Box>

    {/* </Layer> */}
    </Box>

  )
}

export default SingleEmail;