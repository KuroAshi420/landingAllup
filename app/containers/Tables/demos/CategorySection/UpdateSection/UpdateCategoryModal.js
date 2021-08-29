import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { TextField } from '@material-ui/core';

import './Modal.css'

// @material-ui/icons

import Close from "@material-ui/icons/Close";
// core components

import Button from "components/CustomButtons/Button.js";


// form validation
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { updateCategory } from 'redux/actions/CategoryAction'


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);


const validationSchema = Yup.object().shape({

  category_name: Yup.string().required("category_name required"),

});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function UpdateCategoryModal({ category }) {

  const dispatch = useDispatch()

  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleUpdateCategory = async (values) => {

    values.id = category._id;

    await dispatch(updateCategory(values)).then(result => {
      console.log(result)
      if (result === false) {

        setMessage("Category name exist ");
        setTypeMessage("error")
        setOpen(true);
        setClassicModal(false)


      }
      else {
        setMessage("Success update category");
        setTypeMessage("success")
        setOpen(true);
        setClassicModal(false)
      }
    })

  }


  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeMessage}>
          {message}
        </Alert>
      </Snackbar>
      <IconButton onClick={() => setClassicModal(true)} >
        <EditIcon className="btnColorEdit" />

      </IconButton>

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={classicModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setClassicModal(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setClassicModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>

        </DialogTitle>

        <Formik

          initialValues={{
            category_name: category.category_name
          }}

          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateCategory(values)

          }}
        >


          {(formik) => {
            const { handleSubmit, values, handleChange, setFieldValue, handleBlur } = formik;

            return (

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
                className={classes.form}
              >
                <DialogContent
                  id="classic-modal-slide-description"
                  className="modalReport"
                >

                  <TextField label="category_name*" type="text" fullWidth

                    value={values.category_name}
                    onChange={handleChange('category_name')}
                    onBlur={handleBlur}
                    name="category_name"

                    variant="outlined" margin="normal" />
                  <ErrorMessage name="category_name" component="span" className="errorValidation" />



                </DialogContent>
                <DialogActions className={classes.modalFooter}>

                  <Button color="warning" type="submit" simple>
                    Save category
                  </Button>
                  <Button
                    onClick={() => setClassicModal(false)}
                    color="danger"
                    simple
                  >
                    Close
                          </Button>

                </DialogActions>


              </form>


            );
          }}
        </Formik>




      </Dialog>





    </>
  );
}
