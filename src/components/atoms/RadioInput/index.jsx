import React from "react";
import { Flex } from "../Flex";
import styled from "styled-components";

const Label = styled.label``;
const Input = styled.input`
  margin-right: 10px;
`;

export const RadioInput = ({ name, label, value, onChange }) => {
  return (
    <Flex margin="0 0 10px 0">
      <Label>
        <Input type="radio" value={value} name={name} onChange={onChange} />
        {label}
      </Label>
    </Flex>
  );
};
