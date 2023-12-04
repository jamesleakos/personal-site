import React, { useEffect, useState } from 'react';

// css
import { VisitsSummaryByPageStyled } from './styles/VisitsSummaryByPage.styled.js';

const VisitsSummaryByPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/visits/summary-by-page')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // if the data is not an array, return
        if (!Array.isArray(data)) return;

        // Sort the data by the number of visits by the "Unknown" user in the last week
        const sortedData = data.sort((a, b) => {
          const aUnknownUser = a.users.find(
            (user) => user.identifiedUser === 'Unknown'
          );
          const bUnknownUser = b.users.find(
            (user) => user.identifiedUser === 'Unknown'
          );
          return (
            (bUnknownUser?.visitsLastWeek || 0) -
            (aUnknownUser?.visitsLastWeek || 0)
          );
        });
        setData(sortedData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <VisitsSummaryByPageStyled>
      {data.map((page, index) => (
        <div key={index}>
          <h2>{page.pageVisited}</h2>
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
              {page.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.identifiedUser}</td>
                  <td>{user.totalVisits}</td>
                  <td>{user.visitsLastWeek}</td>
                  <td>{user.visitsLastMonth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </VisitsSummaryByPageStyled>
  );
};

export default VisitsSummaryByPage;
