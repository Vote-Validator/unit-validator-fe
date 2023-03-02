import styled from "styled-components";
import { CustomScrollBar } from "../../atoms/CustomScrollBar";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getLocalGovernmentsAsync } from "../../../store/features/localGovernment";
import { pollingUnitsAsync } from "../../../store/features/pollingUnit";
import { Flex } from "../../atoms";
// import { Loader } from "../../atoms/Loader";
import { VoteInput } from "../../molecules/VoteInput";
import { RadioInput } from "../../atoms/RadioInput";
import { DropDownInput } from "../../molecules/DropdownInput";
import {
  serializePartiesDataForSubmission,
  serializeStatesData,
} from "../../../utils/serializeData";
import { Button } from "../../atoms/Button";

import pdpImg from "../../../assets/svgs/pdp.svg";
import apcImg from "../../../assets/svgs/apc.svg";
import adpImg from "../../../assets/svgs/adp.svg";
import apgaImg from "../../../assets/svgs/apga.svg";
import lpImg from "../../../assets/svgs/lp.svg";
import nnpcImg from "../../../assets/svgs/nnpp.svg";

export const partiesInfo = [
  {
    id: 1,
    name: "PDP",
    img: pdpImg,
  },
  {
    id: "2",
    name: "APC",
    img: apcImg,
  },

  {
    id: "3",
    name: "ADP",
    img: adpImg,
  },

  {
    id: "4",
    name: "APGA",
    img: apgaImg,
  },

  {
    id: "5",
    name: "LP",
    img: lpImg,
  },
  {
    id: "6",
    name: "NNPP",
    img: nnpcImg,
  },
];

const DroopdownWrapper = styled.div`
  margin-bottom: 10px;
`;
const PartiesInputSection = styled.section`
  min-height: 60px;
  max-height: 60vh;
  overflow: auto;
  padding-right: 6px;

  ${CustomScrollBar};
`;
// const serializePartyInfoForSubmission = (parties) => {
//   const newPartyData = [...parties];
//   return newPartyData?.map((party) => {
//     delete party.name;
//     delete party.icon;

//     return {
//       ...party,
//     };
//   });
// };
const addScoreKeyToPartyInfo = (parties) => {
  const newParties = [...parties];
  return newParties?.map((party) => {
    return {
      ...party,
      score: "",
    };
  });
};

// const ErrrorText = styled.p`
//   color: red;
// `;

export const FormSection = ({ data }) => {
  const [state, setState] = useState("");
  const [lga, setLGA] = useState("");
  const [pollingUnit, setPollingUnit] = useState("");
  const [formCorrectness, setFormCorrectness] = useState(true);
  const [pollValues, setPollValues] = useState(
    addScoreKeyToPartyInfo(data.parties)
  );

  const [localGovernments, setLocalGovernments] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);
  const QueryClient = useQueryClient();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setPollValues((prev) => {
      const partyIndex = pollValues.findIndex((party) => {
        return party.id + "" === e.target.name;
      });
      const newArray = [...prev];
      newArray[partyIndex].score = +e.target.value;
      return newArray;
    });
  };

  const handleStateChange = async (e) => {
    setState(e.target.value);
    const result = await dispatch(getLocalGovernmentsAsync(e.target.value));
    if (result.payload) {
      setLocalGovernments(result.payload);
    }
  };

  const handleLGAChange = async (e) => {
    setLGA(e.target.value);
    const result = await dispatch(pollingUnitsAsync(e.target.value));
    if (result.payload) {
      setPollingUnits(result.payload);
    }
  };

  const handlePollingUnitChange = async (e) => {
    setPollingUnit(e.target.value);
  };

  const invalidateQuery = () => {
    QueryClient.invalidateQueries("transcribe", {
      exact: true,
    });
  };

  const makeCorrectnessFalse = (e) => {
    setFormCorrectness(false);
  };

  const makeCorrectnessTrue = (e) => {
    setFormCorrectness(true);
  };

  const prepareSubmissionData = () => {
    console.log({
      polling_unit_id: pollingUnit,
      image_id: data.image.id,
      has_corrections: formCorrectness,
      is_unclear: false,
      parties: serializePartiesDataForSubmission(pollValues),
    });
    return {
      polling_unit_id: pollingUnit,
      image_id: data.image.id,
      has_corrections: formCorrectness,
      is_unclear: false,
      parties: serializePartiesDataForSubmission(pollValues),
    };
  };

  return (
    <>
      <PartiesInputSection>
        {pollValues.map((data, idx) => (
          <VoteInput
            type="number"
            key={idx}
            name={data.id}
            partyName={data.name}
            icon={data.icon}
            value={data.score}
            onChange={handleInputChange}
          />
        ))}
      </PartiesInputSection>

      <p>Do you think this form has been tampered with?</p>

      <div>
        <RadioInput
          name="form_correctness"
          label="Yes, there are corrections on this form"
          value={formCorrectness ? formCorrectness : false}
          onChange={makeCorrectnessFalse}
        />
        <RadioInput
          name="form_correctness"
          label="No, the form is intact"
          value={!formCorrectness ? false : formCorrectness}
          onChange={makeCorrectnessTrue}
        />
      </div>

      <section>
        <h3>Registration Area</h3>

        <DroopdownWrapper>
          <DropDownInput
            options={data ? serializeStatesData(data.states) : []}
            label="Select state"
            value={state}
            onChange={handleStateChange}
          />
        </DroopdownWrapper>
        <DroopdownWrapper>
          <DropDownInput
            options={
              localGovernments.length
                ? serializeStatesData(localGovernments)
                : []
            }
            label="Select LGA"
            value={lga}
            onChange={handleLGAChange}
          />
        </DroopdownWrapper>

        <DroopdownWrapper>
          <DropDownInput
            options={
              pollingUnits.length ? serializeStatesData(pollingUnits) : []
            }
            label="Identify polling unit"
            value={pollingUnit}
            onChange={handlePollingUnitChange}
          />
        </DroopdownWrapper>
      </section>

      <Flex justifyContent="space-between">
        <Button onClick={invalidateQuery} color="red" text="Unclear Image" />
        <Button onClick={prepareSubmissionData} color="black" text="SUBMIT" />
      </Flex>
    </>
  );
};
