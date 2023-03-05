import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getLocalGovernmentsAsync } from "../../../store/features/localGovernment";
import { pollingUnitsAsync } from "../../../store/features/pollingUnit";
import { CheckBox, Flex } from "../../atoms";
// import { Loader } from "../../atoms/Loader";
import { VoteInput } from "../../molecules/VoteInput";
import { RadioInput } from "../../atoms/RadioInput";
// import { DropDownInput } from "../../molecules/DropdownInput";
import {
  serializeLGAData,
  serializePartiesDataForSubmission,
  serializePollingUnitData,
  serializeStatesData,
} from "../../../utils/serializeData";
import { Button } from "../../atoms/Button";

import pdpImg from "../../../assets/svgs/pdp.svg";
import apcImg from "../../../assets/svgs/apc.svg";
import adpImg from "../../../assets/svgs/adp.svg";
import apgaImg from "../../../assets/svgs/apga.svg";
import lpImg from "../../../assets/svgs/lp.svg";
import nnpcImg from "../../../assets/svgs/nnpp.svg";
import {
  markImageAsUnclearAsync,
  storeTranscribedDataAsync,
} from "../../../store/features/transcribe";
import { toast } from "react-toastify";
import { ComboBox } from "../../molecules";
import { getAllowedParties } from "../../../utils/getAllowedParties";

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
const PartiesInputSection = styled.section``;
const addScoreKeyToPartyInfo = (parties) => {
  const newParties = [...parties];
  return newParties?.map((party) => {
    return {
      ...party,
      score: "",
      is_not_signed: false,
    };
  });
};

export const FormSection = ({ data }) => {
  // const [state, setState] = useState("");
  // const [lga, setLGA] = useState("");
  // const [pollingUnit, setPollingUnit] = useState("");
  const ALLOWED_PARTIES = getAllowedParties(data.parties);
  const [isNotPresidentialForm, setIsNotPresidentialForm] = useState(false);
  // const [isUnclear, setIsUnclear] = useState(false);
  const [isNotStamped, setIsNotStamped] = useState(false);
  const [state, setState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [pollingUnit, setPollingUnit] = useState(null);
  const [isFormCorrect, setIsFormCorrect] = useState(null);
  const [pollValues, setPollValues] = useState(
    addScoreKeyToPartyInfo(ALLOWED_PARTIES)
  );
  const session_id = localStorage.getItem("session_id");
  const [localGovernments, setLocalGovernments] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);

  const dispatch = useDispatch();

  const reloadPage = () => {
    window.setTimeout(() => window.location.reload(false), 3000);
  };

  const handleInputChange = (e) => {
    setPollValues((prev) => {
      const partyIndex = prev.findIndex((party) => {
        return party.id + "" === e.target.name;
      });
      const newArray = [...prev];
      newArray[partyIndex].score = e.target.value ? +e.target.value : "";
      return newArray;
    });
  };

  const handleSignedInputChange = async (e) => {
    const partyIndex = pollValues.findIndex((party) => {
      return party.id + "" === e.target.name;
    });
    pollValues[partyIndex].is_not_signed =
      !pollValues[partyIndex].is_not_signed;
  };

  const handleStateChange = async (e, newValue) => {
    setState(newValue);
    const result = await dispatch(getLocalGovernmentsAsync(newValue.id));
    if (result.payload) {
      setLocalGovernments(result.payload);
    }
  };

  const markImageAsUnclear = async () => {
    const response = await dispatch(markImageAsUnclearAsync(data.image.id));
    if (response.payload) {
      toast.success("Fetching new image...");
      reloadPage();
    } else {
      toast.error("Failed to mark image as unclear");
    }
  };

  const handleLGAChange = async (e, newValue) => {
    setLGA(newValue);
    const result = await dispatch(pollingUnitsAsync(newValue.id));
    if (result.payload) {
      setPollingUnits(result.payload);
      // do polling unti preselection logic here and setPollingUnit here too
    }
  };

  const handlePollingUnitChange = async (e, newValue) => {
    setPollingUnit(newValue);
  };

  const handleIsFormCorrect = (e) => {
    setIsFormCorrect(e.target.value);
  };

  const handleisNotPresidentialForm = () => {
    setIsNotPresidentialForm((prev) => !prev);
  };

  // const handleisUnclear = () => {
  //   setIsUnclear((prev) => !prev);
  // };

  const handleisNotStamped = () => {
    setIsNotStamped((prev) => !prev);
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
        polling_unit_id: pollingUnit.id,
        image_id: data.image.id,
        has_corrections:
          isFormCorrect === "true" || isFormCorrect === true ? true : false,
        // is_unclear: isUnclear,
        is_invalid_form: isNotPresidentialForm,
        is_not_stamped: isNotStamped,
        parties: serializePartiesDataForSubmission(pollValues),
      };

      if (session_id) transcriptionData.session_id = session_id;

      const response = await dispatch(
        storeTranscribedDataAsync(transcriptionData)
      );
      if (response.payload) {
        if (!session_id)
          localStorage.setItem("session_id", response.payload.session_id);

        toast.success("Data submitted successfully");
        reloadPage();
      } else {
        toast.error("An error occured!");
      }
    }
  };

  return (
    <>
      <PartiesInputSection>
        {pollValues.map((data, idx) => (
          <div key={idx}>
            <VoteInput
              type="number"
              keyValue={`${idx}-input`}
              name={data.id}
              partyName={data.name}
              icon={data.icon}
              value={data.score}
              onChange={handleInputChange}
            />
            <CheckBox
              keyValue={`${idx}-checkbox`}
              name={data.id}
              onChange={handleSignedInputChange}
              label={`${data.name} representative did not sign this form.`}
              value={data.score}
            />
          </div>
        ))}
      </PartiesInputSection>

      <section style={{ margin: "30px 0 10px 0" }}>
        <p style={{ fontWeight: 500 }}>
          Do you think this form has been tampered with?
        </p>

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
          <CheckBox
            name="isNotPresidentialForm"
            label="This is not a presidential form"
            value={isNotPresidentialForm}
            onChange={handleisNotPresidentialForm}
          />
          {/* <CheckBox
            name="isUnclear"
            label="This document is unclear"
            value={isUnclear}
            onChange={handleisUnclear}
          /> */}
          <CheckBox
            name="isNotStamped"
            label="This form is not stamped"
            value={isNotStamped}
            onChange={handleisNotStamped}
          />
        </div>
      </section>

      <section>
        <h3>Registration Area</h3>

        {/* <DroopdownWrapper>
          <DropDownInput
            options={data ? serializeStatesData(data.states) : []}
            label="Select state"
            value={state}
            onChange={handleStateChange}
          />
        </DroopdownWrapper> */}
        <DroopdownWrapper>
          <ComboBox
            data={data ? serializeStatesData(data.states) : []}
            label="Select state"
            value={state}
            onChange={handleStateChange}
          />
        </DroopdownWrapper>
        {/* <DroopdownWrapper>
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
        </DroopdownWrapper> */}
        <DroopdownWrapper>
          <ComboBox
            data={
              localGovernments.length ? serializeLGAData(localGovernments) : []
            }
            label="Select LGA"
            value={lga}
            onChange={handleLGAChange}
          />
        </DroopdownWrapper>

        {/* <DroopdownWrapper>
          <DropDownInput
            options={
              pollingUnits.length ? serializeStatesData(pollingUnits) : []
            }
            label="Identify polling unit"
            value={pollingUnit}
            onChange={handlePollingUnitChange}
          />
        </DroopdownWrapper> */}
        <DroopdownWrapper>
          <ComboBox
            data={
              pollingUnits.length ? serializePollingUnitData(pollingUnits) : []
            }
            label="Identify polling unit"
            value={pollingUnit}
            onChange={handlePollingUnitChange}
          />
        </DroopdownWrapper>
      </section>

      <Flex justifyContent="space-between">
        <Button
          onClick={markImageAsUnclear}
          backgroundColor="#C8C8C8"
          color="red"
          text="Unclear Image"
          margin="16px 0 0 0"
        />
        <Button
          onClick={prepareSubmissionData}
          backgroundColor="#C8C8C8"
          text="SUBMIT"
          margin="16px 0 0 0"
        />
      </Flex>
    </>
  );
};
