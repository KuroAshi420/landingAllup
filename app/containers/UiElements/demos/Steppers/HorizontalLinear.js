import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Type from 'enl-styles/Typography.scss';
import FormUserDetails from "./FormUserDetails";
import FormAccountDetails from "./FormAccountDetails";



const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

function getSteps() {
  return ['User Info', 'Company Info', 'Account Info'];
}

function getStepContent(step) {
  switch (step){
    case 0:
      return <FormUserDetails
      formData={formData}
      setFormData={setFormData}
      nextStep={nextStep}
    />
    case 1:
      return  <FormCompanyDetails
      formData={formData}
      setFormData={setFormData}
      nextStep={nextStep}
      prevStep={prevStep}
    />
    case 2:
      return  <FormAccountDetails 
      formData={formData} 
      setFormData={setFormData}
      nextStep={nextStep} 
      prevStep={prevStep} />
    default:
      return 'Unknown stepIndex';
  }
}

class HorizontalLinear extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    activeStep: 0,
    altLabel: false,
    skipped: new Set(),
    formdata :{firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    position: '',
    userName: '',
    password: '',
    confirmPassword: '',
    matricule_fiscale :'',
    company_name:'',
    company_address :'',
    company_phoneNumber :'',
    company_email :'',
    company_fax: '',
    logo :''}
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep, skipped } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const skippedConst = new Set(skipped.values());
    skipped.add(activeStep);
    this.setState({
      activeStep: activeStep + 1,
      skipped: skippedConst,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  isStepOptional = step => (step === 1);

  isStepSkipped(step) {
    const { skipped } = this.state;
    return skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, altLabel } = this.state;

    return (
      <div className={classes.root}>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Switch
                checked={altLabel}
                onChange={this.handleChange('altLabel')}
                value="altLabel"
              />
            )}
            label="Alternative Design"
          />
        </FormGroup>
        <Divider />
        <Stepper activeStep={activeStep} alternativeLabel={altLabel}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography className={altLabel ? Type.textCenter : ''} variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Divider />
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLinear);
