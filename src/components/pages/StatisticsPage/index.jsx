import React from "react";
import { StatisticsTemplate } from "../../templates";
import { Footer } from "../../molecules/Footer";
import { NavBar } from "../../molecules";
import BarChart from "../../molecules/Chart";
import apiService from "../../../api-utils/api-service";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../atoms/Loader";
import { SilentLink } from "../../atoms/SilentLink";

const fetchResultsData = async (stateId) => {
  const response = await apiService(`/api/v1/results`, "GET");
  return response?.data?.data;
};

export const StatisticsPage = () => {
  const { stateId } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["results", stateId],
    () => fetchResultsData(stateId),
    {
      refetchInterval: false,
      refetchOnMount: false,
    }
  );

  return (
    <StatisticsTemplate
      header={<NavBar justifyContent="center" />}
      footer={<Footer />}
    >
      <h4 style={{ color: "#147B5C", margin: "6px 0 16px 0" }}>
        Current Results
      </h4>
      <h5 style={{ margin: 0 }}>Kindly note the following</h5>
      <ul style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
        <li>The results displayed here are yet to be validated</li>
        <li>This page will be updated with new data every 15mins</li>
      </ul>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p style={{ color: "red" }}>An error occured while fetching data.</p>
      ) : (
        <BarChart chartData={data} />
      )}

      <SilentLink to={`/`}>
        <h3 style={{ color: "#147B5C", margin: "6px 0" }}>&#x2190; Back</h3>
      </SilentLink>
    </StatisticsTemplate>
  );
};
