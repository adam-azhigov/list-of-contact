import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, loadContact, postContact } from '../../redux/features/contacts';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  Fab, TextField,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import EditContact from './EditContact';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});




function Main(props) {
  const dispatch = useDispatch()
  const classes = useStyles();

  const contacts = useSelector((state) => {
    const { contacts } = state;

    if(contacts.filter === '') {
      return contacts.items
    }

    return contacts.items.filter(contact => {
      return contact.name.toLowerCase().indexOf(contacts.filter.toLowerCase()) !== -1
    })
  })

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadContact())
  }, [dispatch])

  function handleDelete(id) {
    return dispatch(deleteContact(id));
  }

  function handleName(e) {
    setName(e.target.value)
  }


  const  handlePostContact = () => {
    dispatch(postContact({name: name}))
  }


  return (
    <>
     <span>Добавить контакт</span> {' '}
    <Fab variant="outlined" color="primary" onClick={handleClickOpen}>
      <PersonAddIcon/>
    </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить новый контакт</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            margin="dense"
            id="name"
            label="Ведите ФИО контакта"
            type="email"
            fullWidth
            onChange={handleName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handlePostContact} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">ФИО</StyledTableCell>
            <StyledTableCell align="right"><EditIcon/></StyledTableCell>
            <StyledTableCell align="right"><DeleteSweepIcon/></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((item, index ) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {index + 1}
                {console.log(contacts)}
              </StyledTableCell>
              <StyledTableCell align="right">{item?.name}</StyledTableCell>
              <StyledTableCell align="right">
               <EditContact contact={item}/>
              </StyledTableCell>
                <StyledTableCell align="right">
                <Button variant="contained" color="secondary" onClick={() => handleDelete(item._id)} >
                  удалить
                </Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default Main;