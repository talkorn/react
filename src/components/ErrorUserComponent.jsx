import { Fragment } from "react";
import { Alert } from "@mui/material";
const ErrorUserComponent = (erorrArr) => {
  const descriptions = erorrArr.description;
  const inputStates = erorrArr.inputStates;
  const inputsErrorsStates = erorrArr.inputsErrorsStates;
  return (
    <Fragment>
      {inputsErrorsStates &&
        inputStates[descriptions] &&
        inputsErrorsStates[descriptions] && (
          <Alert severity="warning">
            {inputsErrorsStates[descriptions].map((item) => (
              <div key={descriptions + "-errors" + item}>{item}</div>
            ))}
          </Alert>
        )}
    </Fragment>
  );
};
export default ErrorUserComponent;
