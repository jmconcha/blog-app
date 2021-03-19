const theme =  {
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography : {
    useNextVariants: true
  },
  myCSS: {
    appIcon: {
      width: 50,
      height: 50,
    },
    appIconColor: {
      color: '#4267B2',
    },
    formContainer: {
      textAlign: 'center'
    },
    headerText: {
      margin: '15px auto 10px',
      fontSize: '2.5rem'
    },
    textField: {
      marginBottom: 20
    },
    customError: {
      marginBottom: 20,
      color: 'red',
      fontSize: '0.8rem'
    },
    small: {
      marginTop: 16,
      display: 'block',
      fontSize: '0.75rem',
      color: 'rgba(0,0,0,0.7)'
    },
    button: {
      position: 'relative',
      overflow: 'hidden',
    },
    progress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      border: 'none',
      marginBottom: 10,
    },
    visibleSeparator: {
      width: '100%',
      border: 'none',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    avatar: {
      height: 50,
      width: 50,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    messageIcon: {
      marginLeft: 15,
      marginRight: 10,
      verticalAlign: 'middle',
    },
  },
};

export default theme;