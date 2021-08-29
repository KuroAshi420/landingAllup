import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  Input,
  FormHelperText,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { injectIntl, intlShape } from "react-intl";
import { addDeal } from "../../../redux/actions/DealAction";
import { fetchCategories } from "../../../redux/actions/CategoryAction";

const validationSchema = Yup.object().shape({
  deal_label: Yup.string().required("label required"),
  deal_description: Yup.string().required("description required"),
  deal_price: Yup.number()
    .typeError("price should be a number")
    .required("price required"),
  deal_category: Yup.string().required("category required"),
});

const styles = (theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  errorValidation: {
    color: "#ff0000",
    fontSize: "13px",
  },
});

function CreateDeal(props) {
  const { intl, classes, history } = props;

  const categories = useSelector((state) => state.get("categories"));
  const { user } = useSelector((state) => state.get("authentification"));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategories());
      } catch (e) {
        console.log("An error occurred when we tried to fetch categories");
      }
    };

    fetchData();
  }, []);

  const handleAddDeal = async (values) => {
    try {
      values.enterprise_id = user.enterprise._id;
      await dispatch(addDeal(values));
      history.push("/company/MyDeals");
    } catch (e) {
      console.log("An error occurred when we tried to fetch categories");
    }
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        create deal
      </Typography>
      <Formik
        initialValues={{
          deal_label: "",
          deal_description: "",
          deal_price: "",
          deal_picture: "",
          deal_category: undefined,
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          await handleAddDeal(values);
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {(formik) => {
          const {
            handleSubmit,
            values,
            handleChange,
            setFieldValue,
            handleBlur,
            resetForm,
            errors,
          } = formik;
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
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
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">
                      Category *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Category*"
                      id="demo-simple-select"
                      value={values.deal_category ? values.deal_category : ""}
                      onChange={handleChange}
                      name="deal_category"
                      onBlur={handleBlur}
                      error={Boolean(errors.deal_category)}
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
                </Grid>

                <Grid item xs={12}>
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
                </Grid>
              </Grid>
              <div className={classes.buttons}>
                <Button
                  color="danger"
                  className={classes.button}
                  onClick={resetForm}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="large"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
}

CreateDeal.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(CreateDeal));
