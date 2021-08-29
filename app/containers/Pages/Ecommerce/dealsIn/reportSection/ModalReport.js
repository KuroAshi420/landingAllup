import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { TextField } from '@material-ui/core';

import './Modal.css'

// @material-ui/icons
import CommentIcon from '@material-ui/icons/Comment';
import Close from "@material-ui/icons/Close";
// core components

import { Button } from "enl-components";
import Tooltip from "@material-ui/core/Tooltip";

// form validation
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";



import { sendReport } from '../../../../../redux/actions/ReportAction'


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


import styles from "enl-components/deals/formStyle-jss";

const useStyles = makeStyles(styles);


const validationSchema = Yup.object().shape({

  comment: Yup.string().required("comment required"),

});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function ModalReport({ id }) {

  const dispatch = useDispatch()


  const enterprise = useSelector(state => state.get("authentification"));

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

  const handleAddComment = async (values) => {

    await dispatch(sendReport(id, user.enterprise._id, values.comment)).then(result => {

      if (result === false) {

        setMessage("error in send report ");
        setTypeMessage("error")
        setOpen(true);


      }
      else {
        setMessage("Success send comment");
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

      <Tooltip
        id="tooltip-left"
        title="Report bad behavior"
        placement="bottom"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton onClick={() => setClassicModal(true)} >
          <CommentIcon className="btnColorDelete" />

        </IconButton>
      </Tooltip>




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
            comment: "",



          }}

          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleAddComment(values)

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

                  <TextField label="Comment*" type="text" fullWidth

                    value={values.comment}
                    onChange={handleChange('comment')}
                    onBlur={handleBlur}
                    name="comment"
                    multiline={true}
                    rows={4}
                    variant="outlined" margin="normal" />
                  <ErrorMessage name="comment" component="span" className="errorValidation" />



                </DialogContent>
                <DialogActions className={classes.modalFooter}>

                  <Button color="warning" type="submit" simple>
                    Send report
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
