import styled from "styled-components";
import LoadingIcons from "react-loading-icons";

export const ProfileStyled = styled.div`
  display: flex;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: column;
  gap: 5px;
`;

export const UsernameStyled = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-align: center;
`;

export const NameStyled = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  color: gray;
  text-align: center;
`;

export const StatsContainerStyled = styled.div`
  display: flex;
  gap: 5px;
`;

export const StatTextStyled = styled.p`
  font-size: 1rem;
  font-weight: 200;
  color: gray;
`;

export const CreationDateStyled = styled.p`
  font-size: 1.3rem;
  font-weight: 200;
  color: white;
  text-align: center;
  opacity: 80%;
`;

export const ProfileLoadingIconStyled = styled(LoadingIcons.Puff)`
  align-self: center;
  justify-self: center;
  height: 95px;
  width: 95px;
`;
