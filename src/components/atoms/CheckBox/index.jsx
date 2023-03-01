import React, { useState } from "react";
import { Flex } from "../Flex";
import styled from "styled-components";

const Label = styled.label``;
const Input = styled.input`
  margin-right: 10px;
`;

export const CheckBox = ({ name, label }) => {
  const [value, setValue] = useState(false);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Flex margin="0 0 10px 0">
      <Label>
        <Input
          type="checkbox"
          value={value}
          name={name}
          onChange={handleInputChange}
        />
        {label}
      </Label>
    </Flex>
  );
};
