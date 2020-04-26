const AppBar = (props) => (
  
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='large'
    style={{ zIndex: '1'}}
  >
  <Heading level='3' margin='none'>{props.title}</Heading>
  <Button icon={<Notification />} onClick={() => {}} />
  </Box>
);