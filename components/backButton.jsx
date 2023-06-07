import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";
import "../pages/create"

export const BackButton = () => {
  const router = useRouter();
  
  return (
    <>
      <Button
        bg="yellow.500"
        color="white"
        borderRadius="full"
        w="112px"
        mt="15px"
        onClick={() => router.push('/home')}
      >
        Back
      </Button>
    </>
  )
}