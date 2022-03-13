import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import logo from '../../../assets/logo.svg';
import Paths from './paths';
import NavigateButton from '../components/NavigationButton';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
`;

const LoginButtonContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SubtitleContainer = styled.div`
  width: 425px;
`;

const ActionsContainer = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export default function Landing() {
  return (
    <Container>
      <LogoContainer>
        <img width="64px" alt="logo" src={logo} />
      </LogoContainer>
      <LoginButtonContainer>
        <NavigateButton path={Paths.LOGIN} label="Sign In" />
      </LoginButtonContainer>
      <ContentContainer>
        <Typography color="#000000" variant="h3" component="div" gutterBottom>
          Own Your Content, Own Yourself
        </Typography>
        <SubtitleContainer>
          <Typography color="#000000" variant="h5" gutterBottom component="div">
            The essential Web3 platform for writing and reading anything
          </Typography>
        </SubtitleContainer>
        <ActionsContainer>
          <NavigateButton path={Paths.SIGNUP} label="Try Prism" />
          <NavigateButton path={Paths.SEARCH} label="Search Now" />
        </ActionsContainer>
      </ContentContainer>
    </Container>
  );
}
