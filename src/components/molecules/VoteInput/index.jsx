import React from "react";
import styled from "styled-components";
import { Flex } from "../../atoms";

const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 160px;
  padding: 10px;
  background-color: #147b5c;
  color: white;
  margin-right: 6px;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #147b5c;
  width: 100%;

  &::placeholder {
    font-size: 0.75rem;
  }
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export const VoteInput = ({
  keyValue,
  name,
  partyName,
  icon,
  type,
  value,
  onChange,
}) => {
  return (
    <Flex key={keyValue} margin="0 0 10px 0">
      <Label htmlFor={name}>
        <Logo src={icon} alt={`${partyName}-logo`} /> {partyName}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        value={value < 0 ? "" : value}
        onChange={onChange}
        min="0"
      />
    </Flex>
  );
};
