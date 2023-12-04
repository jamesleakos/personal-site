import styled from 'styled-components';
import '../../styles/constants.css';

export const VisitsSummaryStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; // Adjust this value as needed

  h2 {
    font-size: 1.5em; // Adjust this value as needed
  }

  table {
    text-align: left;

    tr {
      border-bottom: 1px solid #ccc; // Add a border to each row
      &:nth-child(even) {
        background-color: #f2f2f2; // Color every other row for better readability
      }
    }
  }
`;
