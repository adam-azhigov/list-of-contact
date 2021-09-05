import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle,
  TextField
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { editContact } from '../../redux/features/contacts';

function EditContact({contact}) {

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(contact?.name)
  const dispatch = useDispatch();


  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleEditName(e) {
    setFullName(e.target.value)
  }

  function handleEditFulfilled() {
    dispatch(editContact(contact._id, {fullName: fullName}))
  }

  return (
    <div>
      <button variant="outlined" color="primary" onClick={handleClickOpen}>
        изменить
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Изменить ФИО
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Комментарий"
            variant="outlined"
            value={fullName}
            name="text"
            onChange={handleEditName}
          />
          <Button onClick={handleEditFulfilled}>Сохранить</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            отмена
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export default EditContact;