import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Fragment } from "react";
const UserComponent = (userArr) => {
  const descriptions = userArr.description;
  const inputStates = userArr.inputStates;
  const onChanges = userArr.onChanges;
  const inputsErrorsStates = userArr.inputsErrorsStates;
  const requireds = userArr.required;
  /*  const inputsErrorsStates = userArr.inputsErrorsStates.descriptions;
  console.log("userArr.inputsErrorsStates", userArr.inputsErrorsStates); */

  return (
    <Fragment>
      <TextField
        required={requireds}
        fullWidth
        id={descriptions}
        label={descriptions}
        name={descriptions}
        autoComplete={descriptions}
        value={inputStates.descriptions}
        onChange={onChanges}
      />

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
export default UserComponent;
