import React, { useEffect, useState } from 'react';

// css
import { VisitsSummaryStyled } from './styles/VisitsSummary.styled.js';

const VisitsSummary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/visits/summary')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <VisitsSummaryStyled>
      <h2>Overall Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Identified User</th>
            <th>Total Visits</th>
            <th>Visits Last Week</th>
            <th>Visits Last Month</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.identifiedUser}</td>
              <td>{user.totalVisits}</td>
              <td>{user.visitsLastWeek}</td>
              <td>{user.visitsLastMonth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </VisitsSummaryStyled>
  );
};

export default VisitsSummary;
