import { Box, Button, Step, StepButton, Stepper } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import AddDetails from './addDetails/AddDetails'
import AddImages from './addImages/AddImages'
import AddLocation from './addLocation/AddLocation'

const AddRoom = () => {
   
   const{state:{images}}=  useValue()
    const [activeStep, setActiveStep] = useState(0)
    const [steps, setSteps] = useState([
        { label: 'Location', completed: false },
        { label: 'Details', completed: false },
        { label: 'Images', completed: false },

    ])



    const handleNext = ()=>{
        if(activeStep<steps.length-1){
             setActiveStep(activeStep=>activeStep+1)
        }else{
            const stepIndex = findUnfinished()
            setActiveStep(stepIndex)
        }
    }

    //Habilita o botao de voltar se o step de adicionar for maior do que 1 
    const checkDisabled = () => {
        if (activeStep < steps.length - 1) return false;
        const index = findUnfinished()
        if (index !== -1) return false
        return true

    }

//verifica o limite dos steps para adicionar um local
    const findUnfinished = ()=>{
return steps.findIndex(step=>!step.completed)
    }
useEffect(()=>{
if(images.length){
if(!steps[2].completed) setComplete(2,true)
}else{
    if(steps[2].completed) setComplete(2,false)
}

},[images])

const setComplete= (index, status)=>{
    setSteps(steps=>{steps[index].completed= status
        return[...steps];
    
    
    })
}
    return (
        <Container sx={{ my: 4 }}>
            <Stepper
                alternativeLabel
                nonLinear
                activeStep={activeStep}
                sx={{ mb: 3 }}
            >
                {steps.map((step, index) => {
                    <Step key={step.label} completed={step.completed}>
                        <StepButton onClick={() => setActiveStep(index)}>
                            {step.label}
                        </StepButton>

                    </Step>
                })}
            </Stepper>

                <Box>
                    {{
                       0:<AddLocation/>,
                       1:<AddDetails/>,
                       2:<AddImages/>


                    }[activeStep]}
                </Box>

            <Stack
                direction='row'
                sx={{ pt: 2, pb: 7, justifyContent: 'space-around' }}
            >
                <Button color='inherit'
                    disabled={!activeStep}
                    onClick={() => setActiveStep(activeStep => activeStep - 1)}
                >
                    Voltar
                </Button>

                <Button
                    disabled={checkDisabled()}
                    onClick={handleNext}
                >
                    Próximo
                </Button>
            </Stack>
        </Container>

    )
}

export default AddRoom