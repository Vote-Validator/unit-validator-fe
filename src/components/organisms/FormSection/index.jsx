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
import { storeTranscribedDataAsync } from "../../../store/features/transcribe";
import { toast } from "react-toastify";

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
const addScoreKeyToPartyInfo = (parties) => {
  const newParties = [...parties];
  return newParties?.map((party) => {
    return {
      ...party,
      score: "",
    };
  });
};

export const FormSection = ({ data }) => {
  const [state, setState] = useState("");
  const [lga, setLGA] = useState("");
  const [pollingUnit, setPollingUnit] = useState("");
  const [isFormCorrect, setIsFormCorrect] = useState(null);
  const [pollValues, setPollValues] = useState(
    addScoreKeyToPartyInfo(data.parties)
  );

  const [localGovernments, setLocalGovernments] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);
  const QueryClient = useQueryClient();

  const dispatch = useDispatch();

  const resetFormInput = () => {
    setState("");
    setLGA("");
    setPollingUnit("");
    setIsFormCorrect(null);
    setPollValues(addScoreKeyToPartyInfo(data.parties));
  };

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

  const handleIsFormCorrect = (e) => {
    setIsFormCorrect(e.target.value);
  };

  const prepareSubmissionData = async () => {
    if (!state) {
      toast.error("Please select state");
    } else if (!lga) {
      toast.error("Please select LGA");
    } else if (!pollingUnit) {
      toast.error("Please select polling unit");
    } else if (isFormCorrect === null) {
      toast.error("Please let us know if the form is intact or not");
    } else {
      const transcriptionData = {
        polling_unit_id: pollingUnit,
        image_id: data.image.id,
        has_corrections:
          isFormCorrect === "true" || isFormCorrect === true ? true : false,
        is_unclear: false,
        parties: serializePartiesDataForSubmission(pollValues),
      };

      const response = await dispatch(
        storeTranscribedDataAsync(transcriptionData)
      );
      if (response.payload) {
        toast.success("Data submitted successfully");
        resetFormInput();
      } else {
        toast.error("An error occured!");
      }
    }
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
          value={true}
          onChange={handleIsFormCorrect}
        />
        <RadioInput
          name="form_correctness"
          label="No, the form is intact"
          value={false}
          onChange={handleIsFormCorrect}
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
