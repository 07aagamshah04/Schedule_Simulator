import React from "react";

const ShowTable = ({ resultHead, processID, arrivalTime, burstTime, completionTime, turnAroundTime, waitingTime,CPUtime }) => {
  let avgTAT = 0, avgWT = 0;

  // Create table header
  const tableHeader = resultHead.map((heading, index) => (
    <th key={index} style={{ border: "1px solid black", textAlign: "center" }}>{heading}</th>
  ));

  // Calculate average turn around time and average waiting time
  if (turnAroundTime.length > 0) {
    avgTAT = turnAroundTime.reduce((sum, tat) => sum + tat, 0) / turnAroundTime.length;
  }
  if (waitingTime.length > 0) {
    avgWT = waitingTime.reduce((sum, wt) => sum + wt, 0) / waitingTime.length;
  }

  // Create table rows
  const tableRows = processID.map((id, index) => (
    <tr key={index}>
      <td style={{ border: "1px solid black", textAlign: "center" }}>{id}</td>
      <td style={{ border: "1px solid black", textAlign: "center" }}>{arrivalTime[index]}</td>
      <td style={{ border: "1px solid black", textAlign: "center" }}>{burstTime[index]}</td>
      <td style={{ border: "1px solid black", textAlign: "center" }}>{completionTime[index]}</td>
      <td style={{ border: "1px solid black", textAlign: "center" }}>{turnAroundTime[index]}</td>
      <td style={{ border: "1px solid black", textAlign: "center" }}>{waitingTime[index]}</td>
    </tr>
  ));

  return (
    <div className="mt-5" style={{ textAlign: "center" }}>
      <table style={{ border: "1px solid black", margin: "0 auto" }}>
        <thead>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <h5 style={{ textAlign: "center" }}>Average Turn Around Time is {avgTAT.toFixed(2)} unit</h5>
      <h5 style={{ textAlign: "center" }}>Average Waiting Time is {avgWT.toFixed(2)} unit</h5>
      <h5 style={{ textAlign: "center" }}>CPU utilization is {CPUtime}</h5>
    </div>
  );
};

export default ShowTable;
