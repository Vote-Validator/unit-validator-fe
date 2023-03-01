import React, { useState } from "react";
import { HomeTemplate } from "../../templates/HomeTemplate";
import { Footer } from "../../molecules/Footer";
import { ShowResults } from "../../molecules/ShowResults";
import { Header } from "../../organisms";
import { VoteInput } from "../../molecules/VoteInput";
import pdpImg from "../../../assets/svgs/pdp.svg";
import apcImg from "../../../assets/svgs/apc.svg";
import adpImg from "../../../assets/svgs/adp.svg";
import apgaImg from "../../../assets/svgs/apga.svg";
import lpImg from "../../../assets/svgs/lp.svg";
import nnpcImg from "../../../assets/svgs/nnpp.svg";
import styled from "styled-components";
// import ValidBody from "../../molecules/ValidBody";
import { Flex } from "../../atoms";
import { screen } from "../../theme/utils";
import { DropDownInput } from "../../molecules/DropdownInput";
import { Button } from "../../atoms/Button";
import apiService from "../../../api-utils/api-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { serializeStatesData } from "../../../utils/serializeData";
import { useDispatch } from "react-redux";
import { getLocalGovernmentsAsync } from "../../../store/features/localGovernment";
import { pollingUnitsAsync } from "../../../store/features/pollingUnit";
import { RadioInput } from "../../atoms/RadioInput";
import { CustomScrollBar } from "../../atoms/CustomScrollBar";
import { Loader } from "../../atoms/Loader";

export const partiesInfo = [
  {
    id: "1",
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

const ContentWrapper = styled(Flex)`
  padding: 30px;
  gap: 1em;
  @media only screen and (${screen.sm}) {
    display: block;
    padding: 10px;
  }
`;
const RightContent = styled(Flex)`
  width: 70%;
  padding: 0 1.5em;
  border-right: 1px solid #e5e2ed;

  @media only screen and (${screen.sm}) {
    padding: 30px 0;
    width: 100%;
  }
`;
const LeftContent = styled(Flex)`
  width: 30%;

  @media only screen and (${screen.sm}) {
    padding: 30px 0;
    width: 100%;
  }
`;
const DroopdownWrapper = styled.div`
  margin-bottom: 10px;
`;
const FormImage = styled.img`
  width: 100%;
`;
const PartiesInputSection = styled.section`
  min-height: 60px;
  max-height: 60vh;
  overflow: auto;
  padding-right: 6px;

  ${CustomScrollBar};
`;

export const fetchInitialData = async () => {
  const response = await apiService("/api/v1/transcribe", "GET");
  return response.data;
};

const serializePartyInfo = (parties) => {
  return parties?.map((party) => {
    delete party.name;
    delete party.img;

    return {
      ...party,
      score: "",
    };
  });
};

export const HomePage = () => {
  const {
    data: initialData,
    isLoading,
    isError,
  } = useQuery(["transcribe"], fetchInitialData);
  const [state, setState] = useState("");
  const [lga, setLGA] = useState("");
  const [pollingUnit, setPollingUnit] = useState("");
  const [formCorrectness, setFormCorrectness] = useState(true);
  const [pollValues, setPollValues] = useState(serializePartyInfo(partiesInfo));

  const [localGovernments, setLocalGovernments] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);
  const QueryClient = useQueryClient();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setPollValues((prev) => {
      const partyIndex = pollValues.findIndex((party) => {
        return party.id === e.target.name;
      });
      const newArray = [...prev];
      newArray[partyIndex].score = +e.target.value;
      console.log("new array", newArray);
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
    console.log("submission data", {
      polling_unit_id: pollingUnit,
      image_id: 4,
      has_corrections: formCorrectness,
      is_unclear: false,
      parties: [...pollValues],
    });
    return {
      polling_unit_id: pollingUnit,
      image_id: 4,
      has_corrections: formCorrectness,
      is_unclear: false,
      parties: [...pollValues],
    };
  };

  // if (isLoading) return <div>Loading...</div>;

  // if (isError) return <p>An error occured while fetching data.</p>;

  return (
    <HomeTemplate header={<Header />} footer={<Footer />}>
      <ContentWrapper>
        <RightContent width="70%">
          {isLoading ? (
            <Loader type="circle" />
          ) : isError ? (
            <div>An error occured while fetching image</div>
          ) : (
            initialData && <FormImage src={initialData.data.image.url} />
          )}
        </RightContent>
        <LeftContent width="30%" direction="column">
          <PartiesInputSection>
            {isLoading ? (
              <Loader type="circle" />
            ) : isError ? (
              <div>An error occured while fetching party data</div>
            ) : (
              initialData &&
              pollValues.map((data, idx) => (
                <VoteInput
                  type="number"
                  key={idx}
                  name={data.id}
                  partyData={data}
                  value={data.score}
                  onChange={handleInputChange}
                />
              ))
            )}
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
                options={
                  initialData
                    ? serializeStatesData(initialData.data.states)
                    : []
                }
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
            <Button
              onClick={invalidateQuery}
              color="red"
              text="Unclear Image"
            />
            <Button
              onClick={prepareSubmissionData}
              color="black"
              text="SUBMIT"
            />
          </Flex>
        </LeftContent>
      </ContentWrapper>
      {/* <Flex>
        <ValidBody />
      </Flex> */}
      <ShowResults />
    </HomeTemplate>
  );
};
