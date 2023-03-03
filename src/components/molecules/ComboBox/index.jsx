import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const ComboBox = ({ value, onChange, data, label }) => {
  return (
    <Autocomplete
      fullWidth
      disablePortal
      id="combo-box-demo"
      value={value}
      onChange={onChange}
      options={data}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField color="success" {...params} label={label} />
      )}
    />
  );
};
