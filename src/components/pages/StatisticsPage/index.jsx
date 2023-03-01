import React from "react";
import { StatisticsTemplate } from "../../templates";
import { Footer } from "../../molecules/Footer";
import { NavBar } from "../../molecules";
import BarChart from "../../molecules/Chart";
import apiService from "../../../api-utils/api-service";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchResultsData = async (stateId) => {
  const response = await apiService(`/api/v1/results/states/${stateId}`, "GET");
  return response.data?.results;
};

export const StatisticsPage = () => {
  const { stateId } = useParams();
  const { data, isLoading, isError } = useQuery(["results", stateId], () =>
    fetchResultsData(stateId)
  );

  if (isError) return <p>An error occured while fetching data.</p>;
  return (
    <StatisticsTemplate header={<NavBar />} footer={<Footer />}>
      <h4 style={{ color: "#147B5C", margin: "6px 0 16px 0" }}>
        Current Results
      </h4>
      {isLoading ? "Loading..." : <BarChart chartData={data} />}
    </StatisticsTemplate>
  );
};
