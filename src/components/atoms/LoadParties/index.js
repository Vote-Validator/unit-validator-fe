import React, { useState } from "react";
import { partiesInfo } from "../../../utils";
import styled from "styled-components";

const Parties = () => {
  // eslint-disable-next-line no-unused-vars
  const [partydata, setPartyData] = useState(partiesInfo);
  return (
    <div>
      {partydata.map((party) => {
        return (
          <PollVotes>
            <Party>
              <Img src={party.img} alt="party logo" />
              <span>{party.name} </span>
            </Party>
            <div>
              <Input
                type="number"
                name="polling votes"
                placeholder="Enter Polling Votes"
              />
            </div>
          </PollVotes>
        );
      })}

      <div></div>
    </div>
  );
};

const Party = styled.div`
  display: flex;
  align-items: center;
  background-color: #147b5c;
  padding: 0.1em 0.5em 0.1em 0.5em;
  gap: 1em;
  color: white;
  margin-bottom: 1em;
  width: 30%;
  height: 30px;
`;
const Img = styled.img`
  background-color: #147b5c;
  width: 25px;
  height: 20px;
`;
const Input = styled.input`
  border: 1px solid #147b5c;
  padding: 0.1em 0.3em 0.3em 0.5em;
  text-align: center;
`;
const PollVotes = styled.div`
  display: flex;
  gap: 3em;
`;

export default Parties;
