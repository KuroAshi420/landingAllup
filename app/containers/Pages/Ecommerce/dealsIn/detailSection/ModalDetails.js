import React from "react";



// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";

import './ModalDetails.css'

// @material-ui/icons

import Close from "@material-ui/icons/Close";
import VisibilityIcon from '@material-ui/icons/Visibility';

// core components

import { Button } from "enl-components";

import styles from "enl-components/deals/formStyle-jss";

import styles2 from "enl-components/deals/formStyle-jss";

const useStyles = makeStyles(styles);

const useStyles2 = makeStyles(styles2);


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function ModalDetails({ deal }) {


  const classes = useStyles();
  const classes2 = useStyles2();
  const [classicModal, setClassicModal] = React.useState(false);


  return (
    <>
      <Tooltip
        id="tooltip-left"
        title="Show more details"
        placement="bottom"
        classes={{ tooltip: classes2.tooltip }}
      >
        <IconButton color="primary" onClick={() => setClassicModal(true)}>
          <VisibilityIcon />
        </IconButton>

      </Tooltip>

      <Dialog

        fullWidth
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

        <DialogContent
          id="classic-modal-slide-description"

        >
          <div className="imgDetailsContainer">
            <img src={deal.deal_picture} alt="..." />
          </div>


          <p><span className="deal_text">deal label :</span> {deal.deal_label}</p>
          <p><span className="deal_text">deal description :</span> {deal.deal_description}</p>
          <p><span className="deal_text">deal price : </span>{deal.deal_price} Dt</p>


        </DialogContent>
        <DialogActions className={classes.modalFooter}>


          <Button
            onClick={() => setClassicModal(false)}
            color="danger"
            simple
          >
            Close
                          </Button>

        </DialogActions>




      </Dialog>





    </>

  );
}
