import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  max-width: 400px;
  width: 100%;
  border: none;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  text-align: left;
  background-color: white;
  font-size: 11px;
  color: rgba(41, 52, 98, 1);
  margin: 0 auto;

  :focus {
    outline: none;
  }

  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

export const Description = styled.div<any>`
  padding-top: 8px;
  padding-right: 8px;
  position: ${props => (props.floating ? 'absolute' : 'static')};
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

export const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia
augue. Nullam tincidunt magna id ante eleifend, sed gravida magna pulvinar. Etiam ac
iaculis est. Integer tortor leo, iaculis a ipsum a, semper fermentum purus.
Pellentesque iaculis, diam vel tempus tincidunt.`;

export const shortText = 'Getting help with your requests';
