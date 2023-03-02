import styled from "styled-components";
import { CustomScrollBar } from "../../atoms/CustomScrollBar";
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
import { storeTranscribedDataAsync } from "../../../store/features/transcribe";
import { toast } from "react-toastify";
import { ComboBox } from "../../molecules";

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
  // const [state, setState] = useState("");
  // const [lga, setLGA] = useState("");
  // const [pollingUnit, setPollingUnit] = useState("");
  const [isPresidentialForm, setIsPresidentialForm] = useState(false);
  const [isImageClear, setIsImageClear] = useState(false);
  const [state, setState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [pollingUnit, setPollingUnit] = useState(null);
  const [isFormCorrect, setIsFormCorrect] = useState(null);
  const [pollValues, setPollValues] = useState(
    addScoreKeyToPartyInfo(data.parties)
  );

  const [localGovernments, setLocalGovernments] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);

  const dispatch = useDispatch();

  const reloadPage = () => {
    window.setTimeout(() => window.location.reload(false), 3000);
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

  const handleStateChange = async (e, newValue) => {
    setState(newValue);
    const result = await dispatch(getLocalGovernmentsAsync(newValue.id));
    if (result.payload) {
      setLocalGovernments(result.payload);
    }
  };

  const handleLGAChange = async (e, newValue) => {
    setLGA(newValue);
    const result = await dispatch(pollingUnitsAsync(newValue.id));
    if (result.payload) {
      setPollingUnits(result.payload);
    }
  };

  const handlePollingUnitChange = async (e, newValue) => {
    setPollingUnit(newValue);
  };

  const handleIsFormCorrect = (e) => {
    setIsFormCorrect(e.target.value);
  };

  const handleIsPresidentialForm = (e) => {
    setIsPresidentialForm(e.target.value);
  };

  const handleIsImageClear = (e) => {
    setIsImageClear(e.target.value);
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
        is_unclear: false,
        parties: serializePartiesDataForSubmission(pollValues),
      };

      const response = await dispatch(
        storeTranscribedDataAsync(transcriptionData)
      );
      if (response.payload) {
        // const resolveAfter2Sec = new Promise((resolve) =>
        //   setTimeout(resolve, 2000)
        // );
        // await toast.promise(resolveAfter2Sec, {
        //   success: "Data submitted successfully",
        // });
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
            name="isPresidentialForm"
            label="This is not a Presidential form"
            value={isPresidentialForm}
            onChange={handleIsPresidentialForm}
          />
          <CheckBox
            name="isImageClear"
            label="This is not a Presidential form"
            value={isImageClear}
            onChange={handleIsImageClear}
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

      <Flex justifyContent="center">
        <Button
          onClick={prepareSubmissionData}
          borderColor="#C8C8C8"
          backgroundColor="#C8C8C8"
          color="#ffffff"
          text="SUBMIT"
          margin="16px 0 0 0"
        />
      </Flex>
    </>
  );
};
