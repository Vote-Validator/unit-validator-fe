import React from "react";
import { Flex } from "../Flex";
import styled from "styled-components";

const Label = styled.label`
  cursor: pointer;
`;
const Input = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

export const CheckBox = ({ name, label, value, onChange }) => {
  // const [value, setValue] = useState(false);

  // const handleInputChange = (e) => {
  //   setValue(e.target.value);
  // };

  return (
    <Flex margin="0 0 10px 0">
      <Label>
        <Input type="checkbox" value={value} name={name} onChange={onChange} />
        {label}
      </Label>
    </Flex>
  );
};
