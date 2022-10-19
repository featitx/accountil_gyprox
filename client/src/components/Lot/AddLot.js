 /* eslint-disable */
 import React, { useEffect, useState } from 'react';
 import { withStyles } from '@material-ui/core/styles';
 import Button from '@material-ui/core/Button';
 import Dialog from '@material-ui/core/Dialog';
 import MuiDialogTitle from '@material-ui/core/DialogTitle';
 import MuiDialogContent from '@material-ui/core/DialogContent';
 import MuiDialogActions from '@material-ui/core/DialogActions';
 import IconButton from '@material-ui/core/IconButton';
 import CloseIcon from '@material-ui/icons/Close';
 import Typography from '@material-ui/core/Typography';
 import Grid from '@material-ui/core/Grid';
 import { useDispatch } from 'react-redux'
 import { createClient } from '../../actions/clientActions'
 import { useLocation } from 'react-router-dom';
 import TextField from '@material-ui/core/TextField';
 import FormControlLabel from '@material-ui/core/FormControlLabel';
 import Checkbox from '@material-ui/core/Checkbox';
 import Container from '@material-ui/core/Container'
 import { useSnackbar } from 'react-simple-snackbar'
 import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {initialState} from '../../initialState'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

 const styles = (theme) => ({
   root: {
     margin: 0,
     padding: theme.spacing(2),
     backgroundColor: '#1976D2',
     marginLeft: 0,
   },
   closeButton: {
     position: 'absolute',
     right: theme.spacing(1),
     top: theme.spacing(1),
     color: 'white',
   },
   table: {
    minWidth: 650,
  },

headerContainer: {
    // display: 'flex'
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(1),
}
 });
 
 const DialogTitle = withStyles(styles)((props) => {
   const { children, classes, onClose, ...other } = props; //destructing
   return (
     <MuiDialogTitle disableTypography className={classes.root} {...other}>
       <Typography variant="h6">{children}</Typography>
       {onClose ? (
         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
           <CloseIcon />
         </IconButton>
       ) : null}
     </MuiDialogTitle>
   );
 });
 
 const DialogContent = withStyles((theme) => ({
   root: {
     padding: theme.spacing(4),
   },
 }))(MuiDialogContent);
 
 const DialogActions = withStyles((theme) => ({
   root: {
     margin: 0,
     padding: theme.spacing(1),
   },
 }))(MuiDialogActions);
 
 const AddLot = ({  }) => {
 
  
     const location = useLocation()
     const [lotData, setLotdata] = useState({ name: '', email: '', phone: '', address: '', userId: [] })
     const dispatch = useDispatch()
     const user = JSON.parse(localStorage.getItem('profile'))
        // eslint-disable-next-line 
        const [openSnackbar, closeSnackbar] = useSnackbar()
        const [invoiceData, setInvoiceData] = useState(initialState)
 
     useEffect(() => {
       var checkId = user?.result?._id
       if(checkId !== undefined) {
        setLotdata({...lotData, userId: [checkId]})
       } else {
        setLotdata ({...lotData, userId: [user?.result?.googleId]})
       }
     },[location])
    
     const handleAddField = (e) => {
      e.preventDefault()
      setLotdata((prevState) => ({...prevState, items: [...prevState.items,  {itemName: '', unitPrice: '', quantity: '', discount: '', amount: '' }]}))
  }
 
     const handleSubmitClient =(e)=> {
         e.preventDefault()
           dispatch(createClient(lotData, openSnackbar))
         
         clear()
         handleClose()
     }
 
   const clear =() => {
     setClientData({ name: '', email: '', phone: '', address: '', userId: [] })
   }
     
   const handleClose = () => {
     setOpen(false);
   };
 
 
   const inputStyle = {
       display: "block",
       padding: "1.4rem 0.75rem",
       width: "100%",
       fontSize: "0.8rem",
       lineHeight: 1.25,
       color: "#55595c",
       backgroundColor: "#fff",
       backgroundImage: "none",
       backgroundClip: "padding-box",
       borderTop: "0",
       borderRight: "0",
       borderBottom: "1px solid #eee",
       borderLeft: "0",
       borderRadius: "3px",
       transition: "all 0.25s cubic-bezier(0.4, 0, 1, 1)"
   }
 
   const focus = {
     "input:focus, textarea:focus": { outline: "0", borderBottomColor: "#ffab00" }
   }
   
 
   return (
     <div>
         {/* <div> */}
       {/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
             <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
                 New LOT
             </DialogTitle>
             <DialogContent dividers> */}
            
 
           <div className={styles.pageLayout}>
           <Container style={{width: '50%'}}>
           <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="invoiceNumber"
            name="invoiceNumber"
            label="Invoice Number"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={16}>
          <TextField
            required
            id="companyName"
            name="Company Name"
            label="Company Name"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            // fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="blNumber"
            name="blNumber"
            label="BL Number"
            // fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="quntityInContainer"
            name="quntity in container"
            label="Quntity in container"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="quntityInPiece"
            name="quntity in pieces"
            label="Quntity in pieces"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lotExpenses"
            name="lot expanses"
            label="Lot expenses"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item lg={16}>
        <TableContainer  component={Paper} className="tb-container" >
<Table className={styles.table} aria-label="simple table">
    <TableHead>
    <TableRow>
        <TableCell>Type</TableCell>
        <TableCell >companyName</TableCell>
        <TableCell>Price</TableCell>
        <TableCell >Disc(%)</TableCell>
        <TableCell >Credit</TableCell>
        <TableCell >Debit</TableCell>
        <TableCell >Total Amount</TableCell>
        <TableCell >Action</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {invoiceData.items.map((itemField, index) => (
        <TableRow key={index}>
        <TableCell  scope="row" style={{width: '40%' }}> <InputBase style={{width: '100%'}} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="itemName" onChange={e => handleChange(index, e)} value={itemField.itemName} placeholder="Item name or description" /> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" onChange={e => handleChange(index, e)} value={itemField.quantity} placeholder="0" /> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" onChange={e => handleChange(index, e)} value={itemField.unitPrice} placeholder="0" /> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount"  onChange={e => handleChange(index, e)} value={itemField.discount} placeholder="0" /> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" onChange={e => handleChange(index, e)} value={itemField.unitPrice} placeholder="0" /> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" onChange={e => handleChange(index, e)} value={itemField.unitPrice} placeholder="0" /> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount" onChange={e => handleChange(index, e)}  value={(itemField.quantity * itemField.unitPrice) - (itemField.quantity * itemField.unitPrice) * itemField.discount / 100} disabled /> </TableCell>
        <TableCell align="right"> 
            <IconButton onClick={() =>handleRemoveField(index)}>
                <DeleteOutlineRoundedIcon style={{width: '20px', height: '20px'}}/>
            </IconButton>
        </TableCell>
        
        </TableRow>
    ))}
    </TableBody>
</Table>
</TableContainer>
</Grid>
    <div className={styles.addButton}>
        <button onClick={handleAddField}>+</button>
    </div>
      </Grid>
      </Container>

    
           </div>
           
 
             {/* </DialogContent> */}
             <DialogActions>
             <Button autoFocus onClick={handleSubmitClient} variant="contained" style={{marginRight: '25px'}} >
                 Save LOT
             </Button>
             </DialogActions>
       {/* </Dialog> */}
         {/* </div> */}
     </div>
   );
 }
 
 export default AddLot