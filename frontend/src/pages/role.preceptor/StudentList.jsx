import React, { useState, useEffect, useCallback } from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import {
  TableComponent,
  StyledTableItem,
  StyledTableItemExpand,
  StyledTableBody
} from '../../components/TableComponent'

import { API_ROUTES } from '../../Constants/apiRoutes'

import { StyledH2 } from '../../styles/StyledH2'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpan } from '../../styles/StyledSpan'
import { Navigation } from '../../layout/Navigation'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledContainer } from '../../styles/StyledContainer'
import { requestService } from '../../services/requestService'
import { defaultColors } from '../../Constants/statusColor'
import { NoDataComponent } from '../../components/NoDataComponent'
import { LoadingComponent } from '../../components/LoadingComponent'
import { ButtonComponent } from '../../components/ButtonComponent'
import { axios } from '../../plugins/axios'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { StyledTypography } from '../../styles/StyledTypography'
import { TextLabelContent } from '../../components/TextLabelContent'

export const StudentList = () => {
  const [blockAll, setBlockAll] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const test = useCallback(() => {
    let block = []
    let result
    students.map(student => {
      student['status'] === 'penalized' ? block.push(true) : block.push(false)
    })
    for (var i in block) {
      if (block[i] === true) {
        result = true
        break
      } else {
        result = false
        break
      }
    }
    return result
  }, [students])

  const fetchData = () => {
    requestService(
      API_ROUTES.getStudents.method,
      API_ROUTES.getStudents.url.base,
      setStudents,
      setLoading,
      setError
    )
  }

  // TODO:
  const penalizedHandler = () => {
    try {
      const response = axios({
        method: API_ROUTES.penalizeUser.method,
        url: API_ROUTES.penalizeUser.url,
        data: {}
      })
      const { status } = response
      if (status === 201 || status === 200) {
      }
    } catch (err) {
      console.log(`student list Ln 76 = ${err}`)
    }
  }

  useEffect(() => {
    fetchData()
    return () => {
      setStudents([])
      setLoading(false)
      setError(false)
    }
  }, [])

  useEffect(() => {
    setBlockAll(test())
    return () => {
      setBlockAll(false)
    }
  }, [test])

  const tableheader = [
    {
      size: '100px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#00A7CA'
    },
    {
      size: '320px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#00A7CA'
    },
    {
      size: '180px',
      title: 'Phone',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#00A7CA'
    },
    {
      size: '90px',
      title: '',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#00A7CA'
    }
  ]

  const statusColor = status =>
    status === 'in'
      ? defaultColors.primary
      : status === 'out'
      ? defaultColors.green
      : defaultColors.red

  const studentInfo = (
    <>
      <StyledSpacer height="90px" />
      <StyledCard flexDirection="column" width="400px">
        <StyledBackButton>
          <ArrowBackIosIcon
            onClick={() => {
              setSelected(false)
            }}
            fontSize="small"
            style={{ marginTop: '5px' }}
          />
        </StyledBackButton>
        <StyledTypography
          fontSize="24px"
          fontWeigth="600"
          fontFamily="Segoe UI"
          color="#007991"
          style={{ margin: '0 0 8px 0' }}
        >
          Details of {selected.firstName}
        </StyledTypography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%'
          }}
        >
          <TextLabelContent
            label="Status:"
            content={selected.status}
            colorLabel="#007991"
            // colorContent={
            //   selected.status === 'penalized'
            //     ? defaultColors.red
            //     : selected.status === 'in'
            //     ? '#007991'
            //     : defaultColors.green
            // }
          />

          <TextLabelContent
            label="Code:"
            content={selected.code}
            colorLabel="#007991"
          />

          <TextLabelContent
            label="Complete name:"
            content={`${selected.firstName} ${selected.lastName}`}
            colorLabel="#007991"
          />

          <TextLabelContent
            label="Phone Number:"
            content={selected.phone || 'none'}
            colorLabel="#007991"
          />
        </div>
        {/* TODO: */}
        {/* <StyledSpacer height="40px" /> */}
        {/* <ButtonComponent
          background={defaultColors.red}
          width="360px"
          height="40px"
          margin="0"
          click={() => penalizedHandler()}
        >
          Penalize
        </ButtonComponent> */}
      </StyledCard>
    </>
  )

  const blockerHandler = async () => {
    try {
      const response = await axios({
        method: API_ROUTES.blockAll.method,
        url: API_ROUTES.blockAll.url,
        data: { block: blockAll ? '0' : '1' }
      })
      // console.log(response)
      fetchData()
      // setBlockAll(test())
    } catch (err) {
      console.log(err)
    }
    setBlockAll(test())
  }

  const tableContent = (code, firstName, lastName, phone, status) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledSpan
          fontFamily="Segoe UI"
          fontWeigth="600"
          color={statusColor(status)}
        >
          {code}
        </StyledSpan>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#007991">
          {firstName} {lastName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#007991">
          {phone || 'none'}
        </StyledH2>
      </StyledTableItem>

      <StyledTableItem
        className="last-item"
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <ButtonComponent
          background="#A1C010"
          width="90px"
          height="40px"
          margin="0"
          click={() =>
            setSelected({
              status: `${status.charAt(0).toUpperCase() + status.slice(1)}`,
              code,
              firstName,
              lastName
            })
          }
        >
          More
        </ButtonComponent>
      </StyledTableItem>
    </StyledTableBody>
  )

  const tableExpand = (lastName, phone) => (
    <StyledTableItemExpand paddingLerft={tableheader[0].size}>
      <StyledTableItem
        width={tableheader[3].size}
        displayMd="none"
        displaySm="flex"
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#00A7CA">
          {tableheader[2].title}
        </StyledSpan>
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#007991">
          {lastName}
        </StyledSpan>
        <StyledSpacer height="28px" />
      </StyledTableItem>

      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#00A7CA">
        {tableheader[3].title}
      </StyledSpan>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#007991">
        {phone || 'none'}
      </StyledSpan>
    </StyledTableItemExpand>
  )

  return (
    <StyledContainer>
      <Navigation />
      {!selected && (
        <TableComponent
          title="Students"
          titleColor="#007991"
          tableheader={tableheader}
          subtitle={
            <ButtonComponent
              background={blockAll ? defaultColors.green : defaultColors.red}
              color="#fff"
              width="90px"
              height="40px"
              margin="0"
              click={() => blockerHandler()}
            >
              {blockAll ? 'Unlock' : 'Block'}
            </ButtonComponent>
          }
        >
          {loading && <LoadingComponent color="#007991" />}
          {(students.length &&
            students.map(
              ({
                code,
                status,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone
              }) => (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={code}
                >
                  {tableContent(code, firstName, lastName, phone, status)}
                  {expanded && tableExpand(lastName, phone)}
                </StyledCard>
              )
            )) ||
            (!loading && <NoDataComponent color="#007991" />)}
        </TableComponent>
      )}
      {selected && studentInfo}
    </StyledContainer>
  )
}
