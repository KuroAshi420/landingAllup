import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "enl-components/deals/formStyle-jss";
import PropTypes from "prop-types";

// @material-ui/core components

import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {
  Input,
  FormHelperText,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

// @material-ui/icons
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Close from "@material-ui/icons/Close";
// core components
import { GridContainer, GridItem, Button } from "enl-components";

// form validation
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { addDeal } from "../../../../redux/actions/DealAction";
import { fetchCategories } from "../../../../redux/actions/CategoryAction";

const validationSchema = Yup.object().shape({
  deal_label: Yup.string().required("label required"),
  deal_description: Yup.string().required("description required"),
  deal_price: Yup.number()
    .typeError("price should be a number")
    .required("price required"),
  deal_category: Yup.string().required("category required"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
const useStyles = makeStyles(styles);

function ModalSection(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.get("categories"));
  const { user } = useSelector((state) => state.get("authentification"));

  const [classicModal, setClassicModal] = React.useState(false);

  const handleAddDeal = async (values) => {
    values.enterprise_id = user.enterprise._id;
    dispatch(addDeal(values));
    setClassicModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategories());
      } catch (e) {
        console.log("An error occurred when we tried to fetch categories");
        console.log(e);
      }
    };
    console.log("useEffect");

    fetchData();
  }, []);

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={4}>
                <Button
                  className="BtnColorGreen"
                  block
                  onClick={() => setClassicModal(true)}
                >
                  <AddCircleIcon className={classes.icon} />
                  Add new deal
                </Button>
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
                    <h4 className={classes.modalTitle}>Add Deal</h4>
                  </DialogTitle>

                  <Formik
                    initialValues={{
                      deal_label: "",
                      deal_description: "",
                      deal_price: "",
                      deal_picture: "",
                      deal_category: undefined,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                      handleAddDeal(values);
                      setSubmitting(false);
                      resetForm();
                    }}
                  >
                    {(formik) => {
                      const {
                        handleSubmit,
                        values,
                        handleChange,
                        setFieldValue,
                        handleBlur,
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
                            <TextField
                              label="Deal Label*"
                              type="text"
                              fullWidth
                              onChange={handleChange("deal_label")}
                              onBlur={handleBlur}
                              name="deal_label"
                              variant="outlined"
                              margin="normal"
                              autoComplete="deal_label"
                            />
                            <ErrorMessage
                              name="deal_label"
                              component="span"
                              className={classes.errorValidation}
                            />

                            <TextField
                              label="Deal Description *"
                              type="text"
                              fullWidth
                              onChange={handleChange("deal_description")}
                              onBlur={handleBlur}
                              name="deal_description"
                              multiline={true}
                              rows={2}
                              variant="outlined"
                              margin="normal"
                              autoComplete="deal_description"
                            />
                            <ErrorMessage
                              name="deal_description"
                              component="span"
                              className={classes.errorValidation}
                            />

                            <TextField
                              label="Price en DT *"
                              type="text"
                              fullWidth
                              onChange={handleChange("deal_price")}
                              onBlur={handleBlur}
                              name="deal_price"
                              variant="outlined"
                              margin="normal"
                              autoComplete="deal_price"
                            />
                            <ErrorMessage
                              name="deal_price"
                              component="span"
                              className={classes.errorValidation}
                            />

                            <FormControl
                              variant="outlined"
                              fullWidth
                              margin="normal"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Category *
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="Category*"
                                id="demo-simple-select"
                                value={
                                  values.deal_category
                                    ? values.deal_category
                                    : ""
                                }
                                name="deal_category"
                                onChange={handleChange("deal_category")}
                                onBlur={handleBlur}
                              >
                                {categories.map((category, index) => (
                                  <MenuItem key={index} value={category._id}>
                                    {category.category_name}
                                  </MenuItem>
                                ))}
                              </Select>
                              <ErrorMessage
                                name="deal_category"
                                component="span"
                                className={classes.errorValidation}
                              />
                            </FormControl>

                            <FormControl>
                              <Input
                                name="deal_picture"
                                aria-describedby="my-helper-text"
                                type="file"
                                onChange={(event) => {
                                  setFieldValue(
                                    "deal_picture",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                required
                                accept="image/*"
                              />
                              <FormHelperText id="my-helper-text">
                                Upload image for deal
                              </FormHelperText>
                            </FormControl>
                          </DialogContent>
                          <DialogActions className={classes.modalFooter}>
                            <Button color="warning" type="submit" simple>
                              Save
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
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default ModalSection;
