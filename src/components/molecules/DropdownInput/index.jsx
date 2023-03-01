import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export const DropDownInput = ({ label, options, onChange, value }) => {
  // const [value, setValue] = useState("");

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
        style={{ border: "1px solid #147b5c", borderRadius: "0", outline: "0" }}
      >
        {options.map((v) => (
          <MenuItem key={v.key} value={v.value}>
            {v.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
