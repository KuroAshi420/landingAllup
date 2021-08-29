import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { TextField } from "@material-ui/core";

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// form validation
import { Formik } from "formik";
import * as Yup from "yup";

import { updateDeal } from "../../../../../redux/actions/DealAction";
import styles from "enl-components/deals/formStyle-jss";

const useStyles = makeStyles(styles);

const validationSchema = Yup.object().shape({
  deal_label: Yup.string().required("label required"),
  deal_description: Yup.string().required("description required"),
  deal_price: Yup.number()
    .typeError("price should be a number")
    .required("price required"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

function EditModal({ deal }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [classicModal, setClassicModal] = React.useState(false);

  const handleUpdateDeal = async (values) => {
    values.id = deal._id;

    dispatch(updateDeal(values));
    setClassicModal(false);
  };

  return (
    <>
      <Tooltip
        id="tooltip-left"
        title="Edit"
        placement="bottom"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton onClick={() => setClassicModal(true)}>
          <EditIcon className="btnColorEdit" />
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
          <h4 className={classes.modalTitle}>update Deal</h4>
        </DialogTitle>

        <Formik
          initialValues={{
            deal_label: deal.deal_label,
            deal_description: deal.deal_description,
            deal_price: deal.deal_price,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            handleUpdateDeal(values);
            setSubmitting(false);
            resetForm({});
          }}
        >
          {(formik) => {
            const {
              handleSubmit,
              values,
              handleChange,
              setFieldValue,
              handleBlur,
              errors,
            } = formik;

            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className={classes.form}
              >
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="deal_label"
                        label="Deal Label*"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        autoComplete="deal_label"
                        onBlur={handleBlur}
                        value={values.deal_label}
                        onChange={handleChange}
                        error={Boolean(errors.deal_label)}
                        helperText={errors.deal_label}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="text"
                        name="deal_price"
                        label="Price en DT *"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        autoComplete="deal_price"
                        onBlur={handleBlur}
                        value={values.deal_price}
                        onChange={handleChange}
                        error={Boolean(errors.deal_price)}
                        helperText={errors.deal_price}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Deal Description *"
                        type="text"
                        fullWidth
                        name="deal_description"
                        multiline={true}
                        rows={2}
                        variant="outlined"
                        margin="normal"
                        onBlur={handleBlur}
                        value={values.deal_description}
                        autoComplete="deal_description"
                        onChange={handleChange}
                        error={Boolean(errors.deal_description)}
                        helperText={errors.deal_description}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                  <Button color="warning" type="submit" simple>
                    Update
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

export default EditModal;
