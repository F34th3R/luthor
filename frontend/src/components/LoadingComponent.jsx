import React from 'react'
import { StyledTypography } from '../styles/StyledTypography'
import { StyledCard } from '../styles/StyledCard'

export const LoadingComponent = ({ color }) => (
  <StyledCard
    width="100%"
    flexDirection="column"
    alignItems="center"
    margin="0 0 16px 0"
  >
    <StyledTypography
      fontSize="14px"
      fontFamily="Segoe UI"
      fontWeigth="600"
      color={color}
    >
      Loading...
    </StyledTypography>
  </StyledCard>
)
