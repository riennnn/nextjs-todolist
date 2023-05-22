import { Box, Button } from "@chakra-ui/react"

export const ResetButton = () => {
  return (
    <Box>
      <Button 
        bg='yellow.500' 
        variant='solid' 
        ml='30px' mt='5' 
        borderRadius='99'
        w='112px'
      >
        Reset
      </Button>
    </Box>
  )
}