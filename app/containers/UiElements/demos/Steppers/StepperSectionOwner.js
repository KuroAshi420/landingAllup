import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { FormUserDetails } from './FormUserDetails';
import { FormCompanyDetails } from './FormCompanyDetails';
import { FormAccountDetails } from './FormAccountDetails';
import { Success } from './Success';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));








function getSteps() {
  return ['User Info', 'Company Info', 'Account Info'];
}




export default function StepperSectionOwner() {



  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    position: '',
    userName: '',
    password: '',
    confirmPassword: '',
    matricule_fiscale: '',
    company_name: '',
    company_address: '',
    company_phoneNumber: '',
    company_email: '',
    company_fax: '',
    logo: ''
  });


  const nextStep = () => {
    setStep(prev => prev + 1);

  }
  const prevStep = () => {
    setStep(prev => prev - 1);

  }


  const classes = useStyles();

  const steps = getSteps();

  const handleReset = () => {
    setStep(0);
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <FormUserDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      case 1:
        return <FormCompanyDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      case 2:
        return <FormAccountDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep} />
      default:
        return 'Unknown stepIndex';
    }
  }


  return (
    <div className={classes.root}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {step === steps.length ? (
          <div>
            <h3>Thank You For Your Submission</h3>

            <p>You will receive an email when your submission is accepted </p>


          </div>
        ) : (
            <div>
              {getStepContent(step)}
            </div>
          )}
      </div>
    </div>
  );
}