import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import imgApi from "enl-api/images/photos";
import { ProductCard } from "../index";

const styles = (theme) => ({
  divider: {
    display: "block",
    margin: `${theme.spacing(3)}px 0`,
    padding: "10px",
  },
});

function DetailModal(props) {
  const [open, setOpen] = useState(false);
  const { classes, category, categoryData } = props;
  const [item, setItem] = useState(category);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
console.log('111',item.description)
  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Show More
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{item.name}</DialogTitle>

        <Grid item md={12} className={classes.divider}>
          <ProductCard
            thumbnail={item.image}
            name={item.name}
            desc={item.description}
            oper={item.operation}
            list
            detailCategory={true}
            categoryData={categoryData}
            setItem={setItem}
          />
        </Grid>
        <Button onClick={handleClose} color="primary" autoFocus>
          close
        </Button>
      </Dialog>
    </div>
  );
}

DetailModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailModal);
