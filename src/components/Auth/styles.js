import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    width:"100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  root: {
    '& .MuiTextField-root': {
      marginTop:"1rem",
    },
    marginTop:"7rem",
    borderRadius:"3px",
    
    
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
   
  },
  submit: {
    width:'100%',
    margin: theme.spacing(3, 0, 2),
  },
  already:{
    marginLeft:"100px",
  },
  googleButton: {
    textAlign:'center',
    width:'100%',
    marginBottom: theme.spacing(2),
  },
  head:{
    paddingTop:"2rem",
    textAlign:"center",
    alignItems:"center",
  }
}));