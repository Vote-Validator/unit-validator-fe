import React from "react";
import styled from "styled-components";
// import Pdpimg from "./../../../assets/svgs/pdp.svg";
// import Apcimg from "./../../../assets/svgs/apc.svg";
// import Adpimg from "./../../../assets/svgs/adp.svg";
// import Apgaimg from "./../../../assets/svgs/apga.svg";
// import Lpimg from "./../../../assets/svgs/lp.svg";
// import Nnppimg from "./../../../assets/svgs/nnpp.svg";
import { getAllowedParties } from "../../../utils/getAllowedParties";
import { getPartyColor } from "../../../utils/getPartyColor";
// import { getAllowedParties } from "../../../utils/getAllowedParties";

const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  font-family: sans-serif;
  margin: 1rem;
  padding: 40px 80px;
  border-radius: 10px;
  background: #f4f4f4;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 20px 40px;
  }

  @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 30px 45px;
  }
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //   justify-content: space-between;
  width: 900px;
  margin-bottom: 0.5rem;

  @media only screen and (max-width: 768px) {
    width: 80vw;
  }

  @media only screen and (max-width: 1200px) {
    width: 80vw;
  }
`;

const BarLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-right: 60px;

  @media only screen and (max-width: 768px) {
    margin-right: 20px;
  }

  @media only screen and (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const Imgage = styled.img`
  width: 50px;
  margin-right: 13px;

  @media only screen and (max-width: 768px) {
    width: 24px;
    margin-right: 5px;
  }

  @media only screen and (max-width: 1200px) {
    width: 35px;
    margin-right: 7px;
  }
`;

const PartyLabel = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  width: 40px;
  white-space: nowrap;

  @media only screen and (max-width: 768px) {
    width: 15px;
    font-size: 10px;
  }

  @media only screen and (max-width: 1200px) {
    width: 28px;
    font-size: 15px;
  }
`;

const BarLabel = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  width: 40%;
  white-space: nowrap;

  @media only screen and (max-width: 768px) {
    width: 25%;
    font-size: 10px;
  }

  @media only screen and (max-width: 1200px) {
    width: 32%;
    font-size: 15px;
  }
`;

const Bar = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}%;
  height: 64px;
  margin-right: 19px;

  @media only screen and (max-width: 768px) {
    height: 32px;
  }

  @media only screen and (max-width: 1200px) {
    height: 45px;
  }
`;
export const initialBarData = [
  {
    party: "A",
    score: 4,
  },
  {
    party: "APC",
    score: 68,
  },
  {
    party: "LP",
    score: 588,
  },
  {
    party: "PDP",
    score: 64,
  },
  {
    party: "YPP",
    score: 20,
  },
  {
    party: "ZLP",
    score: 4,
  },
];
function BarChart({ chartData }) {
  const totalVotes = chartData.total_votes;
  const sortedResult = getAllowedParties(
    Array.from(Object.values(chartData.results)),
    "party"
  ).sort(function (a, b) {
    return b.score - a.score;
  });
  // const firstFiveParties = sortedResult.slice(0, 5);
  // const others = sortedResult.slice(5, sortedResult.length);

  return (
    <BarChartContainer>
      <h3>Total Votes: {totalVotes}</h3>
      {sortedResult.map((item, index) => {
        const percentageWidth = (item.score / totalVotes) * 100;

        return (
          <BarContainer key={index}>
            <BarLogo>
              <Imgage src={item.icon} alt="" />
              <PartyLabel>{item.party}</PartyLabel>
            </BarLogo>
            <Bar
              width={percentageWidth ? percentageWidth : 0}
              color={getPartyColor(item.party)}
            />
            <BarLabel>{`${item.score} votes`}</BarLabel>
          </BarContainer>
        );
      })}
    </BarChartContainer>
    // <div>

    //   <BarChartContainer>
    //     <details closed>
    //       <summary
    //         style={{
    //           fontSize: "1.2rem",
    //           marginBottom: "20px",
    //           fontWeight: "bold",
    //         }}
    //       >
    //         View Others
    //       </summary>
    //       {others.map((item, index) => {
    //         const percentageWidth = (item.score / totalVotes) * 100;

    //         return (
    //           <BarContainer key={index}>
    //             <BarLogo>
    //               <Imgage src={item.icon} alt="" />
    //               <PartyLabel>{item.party}</PartyLabel>
    //             </BarLogo>
    //             <Bar
    //               width={percentageWidth ? percentageWidth : 0}
    //               color={generateColor()}
    //             />
    //             <BarLabel>{`${item.score} votes`}</BarLabel>
    //           </BarContainer>
    //         );
    //       })}
    //     </details>
    //   </BarChartContainer>
    // </div>
  );
}

export default BarChart;
