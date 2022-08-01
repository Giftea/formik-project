import React, { useState } from "react";
import { Form } from "formik";
import { Button, Stack, Step, StepLabel, Stepper } from "@mui/material";

export const FormStepper = ({ children }) => {
  const stepsArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = stepsArray[step];

  return (
    <Form>
      <Stepper alternativeLabel activeStep={step} sx={{ marginBottom: 5 }}>
        {stepsArray.map((child, index) => (
          <Step key={child.props.label} completed={step > index}>
            <StepLabel>{child.props.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {currentStep}
      <Stack direction="row" spacing={2} sx={{ marginTop: 5 }}>
        <Button
          variant="outlined"
          onClick={() => {
            step === 0 ? setStep(1) : setStep(0);
          }}
        >
          {step === 0 ? "Next" : "Back"}
        </Button>
        {step === 1 && (
          <Button variant="contained" type="submit">
            Submit
          </Button>
        )}
      </Stack>
    </Form>
  );
};
