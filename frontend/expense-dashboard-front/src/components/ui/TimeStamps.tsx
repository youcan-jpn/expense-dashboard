import React from "react";
import { styled } from "@mui/system";


const TimeStampsDiv = styled('div')({
  color: 'darkslategray',
  textAlign: "right",
  paddingRight: "15px",
});

interface IProps {
  created_at: string,
  modified_at: string,
}

export const TimeStamps: React.FC<IProps> = (props: IProps) => {
  const {created_at, modified_at} = props;
  return (
    <TimeStampsDiv>
      <p>Created At: {created_at}</p>
      <p>Modified At: {modified_at}</p>
    </TimeStampsDiv>
  )
}