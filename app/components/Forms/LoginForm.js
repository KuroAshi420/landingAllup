import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.svg';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { closeMsgAction } from 'enl-redux/actions/authActions';
import { CheckboxRedux, TextFieldRedux } from './ReduxFormMUI';
import MessagesForm from './MessagesForm';
import messages from './messages';
import styles from './user-jss';
import { login } from '../../redux/actions/UserAction'
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom"
import { Formik, ErrorMessage } from "formik";

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function LoginForm(props) {
  const {
    classes,
    //handleSubmit,
    pristine,
    submitting,
    intl,
    messagesAuth,
    closeMsg,
    loading
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({

    userName: Yup.string().required("userName required"),
    password: Yup.string().required("password required").min(4, "Password must contain at least 4 characters")
  });
  const dispatch = useDispatch()

  const history = useHistory()
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = event => event.preventDefault();
  const handleLogin = async (values) => {

    dispatch(login(values.userName, values.password)).then(result => {
      if (result) {

        if (result.role === "ADMIN") {

          history.push({
          //  pathname: `/admin/home-admin`,
          pathname: `/app`,

          });
        }

        else if (!result.enterprise.isVerified) {
          setOpen(true);
          setMessage("Your account is not not verified yet");
          setTypeMessage("error")
        }
        else {
          if (!result.isActive) {
            setOpen(true);
            setMessage("Your account is not active");
            setTypeMessage("warning")
          } else if (result.role === "RH_OWNER" || result.role === "OWNER") {

            history.push({
             // pathname: `/owner/home-owner`,
             pathname: `/app`,
            });

          } else if (result.role === "RH") {

            history.push({
             // pathname: `/rh/home-rh`,
             pathname: `/app`,

            });

          } else {
            history.push({
             // pathname: `/employee/home-employee`,
              pathname: `/app`,

            });
          }

        }



      }
      else {
        setOpen(true);
        setMessage("userName or password incorrect");
        setTypeMessage("error")
      }
    })


  }
  return (
    <Paper className={classes.sideWrap}>
      <Hidden mdUp>
        <div className={classes.headLogo}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </div>
      </Hidden>
      <div className={classes.topBar}>
        <Typography variant="h4" className={classes.title}>
          <FormattedMessage {...messages.login} />
        </Typography>
        <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
          <Icon className={classNames(classes.icon, classes.signArrow)}>arrow_forward</Icon>
          <FormattedMessage {...messages.createNewAccount} />
        </Button>
      </div>
      {
        messagesAuth !== null || ''
          ? (
            <MessagesForm
              variant="error"
              className={classes.msgUser}
              message={messagesAuth}
              onClose={closeMsg}
            />
          )
          : ''
      }
      <section className={classes.pageFormSideWrap}>

        <Formik
                  initialValues={{
                    userName: "",
                    password: "",
                  }}

                  validationSchema={validationSchema}
                  onSubmit={values => {
                    handleLogin(values)
                  }}
                >
       
          {(formik) => {
                    const { handleSubmit, values, handleChange, handleBlur } = formik;
                    return (<form /**onSubmit={handleSubmit}*/ onSubmit={(e) => {
                        e.preventDefault();
                        
                        handleSubmit();
                      }}>
          <div>
          <FormControl className={classes.formControl}>
              <InputLabel htmlFor="UserName">UserName</InputLabel>
              <Input 
                           id="userName"
                           name="userName"
                           onChange={
                           handleChange('userName')}
                           
                           formControlProps={{
                            fullWidth: true,
                          }}

                          inputProps={{
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                              </InputAdornment>
                            ),
                          }} />
           
            
                           </FormControl>

                           <ErrorMessage name="userName" component="span" className={classes.errorValidation} />

           
          </div>
          <div>
          <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                            id="password"
                            name="password"
                            onChange={handleChange('password')}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "password",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputIconsColor}>
                                    lock_outline
                            </Icon>
                                </InputAdornment>
                              ),
                              autoComplete: "off",
                            }}/>
           
            
                           </FormControl>
                           <ErrorMessage error name="password" component="span" className={classes.errorValidation} />

          </div>
          <div className={classes.optArea}>
          <FormControlLabel

              className={classes.label}

              control={ <Checkbox name ="checkbox"value="checkedC"  />}

              label={"loginRemember"}

            />
          
            <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>
              <FormattedMessage {...messages.loginForgotPassword} />
            </Button>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" disabled={loading} fullWidth color="primary" size="large" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              <FormattedMessage {...messages.loginButtonContinue} />
              {!loading && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} disabled={submitting || pristine} />}
            </Button>
          </div>
        </form> );
                  }}
                  </Formik>
     
      </section>
      <h5 className={classes.divider}>
        <FormattedMessage {...messages.loginOr} />
      </h5>
      <section className={classes.socmedSideLogin}>
        <Button
          variant="contained"
          className={classes.redBtn}
          type="button"
          size="large"
        >
          <i className="ion-logo-google" />
          Google
        </Button>
        <Button
          variant="contained"
          className={classes.cyanBtn}
          type="button"
          size="large"
        >
          <i className="ion-logo-twitter" />
          Twitter
        </Button>
        <Button
          variant="contained"
          className={classes.greyBtn}
          type="button"
          size="large"
        >
          <i className="ion-logo-github" />
          Github
        </Button>
      </section>
    </Paper>
  );
}

/*LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  messagesAuth: PropTypes.string,
  loading: PropTypes.bool,
  closeMsg: PropTypes.func.isRequired,
};*/

LoginForm.defaultProps = {
  messagesAuth: null,
  loading: false
};

/*const LoginFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(LoginForm);*/

/*const mapDispatchToProps = {
  closeMsg: closeMsgAction
};

const reducerAuth = 'authReducer';
const mapStateToProps = state => ({
  messagesAuth: state.get(reducerAuth).message,
  loading: state.get(reducerAuth).loading,
  ...state,
});

const LoginFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormReduxed);*/

export default withStyles(styles)(LoginForm);
