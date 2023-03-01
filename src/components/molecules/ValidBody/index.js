import React from 'react'
import UploadBody from '../../atoms/UploadBody';
import Parties from '../../atoms/LoadParties';
import styled from 'styled-components';

const ValidBody = () => {
  return (

   <Container>
    <Main>
      <UploadBody/>
    </Main>

    <Aside>  
   
    <Parties/>

    <LowForm>
    
    <div>
      <span>Do you think this form has been tampered with? </span>

<CheckContainer>
      <CheckBox>
        <label htmlFor="yes">Yes, there are corrections on this form.</label>
        <input type="checkbox" name="yes" id="" />
      </CheckBox>

      <CheckBox>
      <label htmlFor="yes">No, the form is intact.</label>
        <input type="checkbox" name="yes" id="" />
      </CheckBox>

      </CheckContainer>


    </div>

    <form>
      
      <span> Registration</span>
  <FieldForm>
  <Select>
  <label for="my-select">Select State:</label>
  <select id="my-select">
  </select> 
  
  </Select>
  
  <Select>
  <label for="my-select">State LGA:</label>
  <select id="my-select">
  </select> 
  
  </Select>
  
  <Select>
  <label for="my-select">Identity Polling Unit:</label>
  <select id="my-select">
  </select> 
  
  </Select>
  </FieldForm>
  
  <Buttons className="button">
  
    <RedButton> Unclear Image</RedButton>
    <GreenButton> SUBMIT</GreenButton>
  
  </Buttons>
     </form>
  
    </LowForm>
    </Aside>
    </Container>
  )
}
const  Container = styled.div`
display:grid;
grid-template-columns:1fr .6fr;
width:100%;
min-height:80vh;


@media (max-width: 768px) {
  display:flex;
flex-direction:column;
  }

`
const Main = styled.main`
min-height:50vh;
height:100%;
padding:1em 3.5em;
border-right:1px solid #E5E2ED;
`
const Aside = styled.aside`
padding:2em 1.5em;
display:flex;
flex-direction:column;
`
const Select = styled.div`
display:flex;
justify-content:space-between;
border:1px solid #147B5C;
padding:1em .5em;
`
const CheckContainer = styled.div`

display:flex;
flex-direction:column;
gap:1em;
padding:1em 0;

`
const LowForm= styled.div`
margin-top: 1em;
`
const RedButton= styled.button`
all: unset;
border: 1px solid #D10C0C;
color: #D10C0C;
padding:1em .5em;
width:40%;

`
const GreenButton= styled.button`
all: unset;
background:#147B5C;
padding:1em .5em;
width:40%;
color:white;
cursor:pointer;
`
const Buttons = styled.div`
all: unset;
display:flex;
justify-content:space-between;
text-align:center;
cursor:pointer;
`


const CheckBox = styled.div`
display:flex;
flex-direction:row-reverse;
justify-content:start;
`
const SelectBox = styled.div`
display:flex;
flex-direction:row-reverse;
justify-content:start;
`

const FieldForm = styled.div`
display:flex;
flex-direction:column;
gap:1em;
padding:1em 0;
`

export default ValidBody