import { useEffect, useState } from 'react';
import Head from 'next/head'
import {
  Box,
  Heading,
} from "@chakra-ui/react";
import { BackButton } from '../../components/backButton';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../libs/firebase';
import { useRouter } from 'next/router';

const TodoShow = () => {

  const router = useRouter();
  const todoId = router.query.id;

  const [state, setState] = useState({
    title: "",
    detail: ""
  });
  
  const setFields = (newTitle, newDetail) => {
    setState(prevState => ({
      ...prevState,
      title: newTitle,
      detail: newDetail
    }));
  };
  


  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "todos", todoId);
      const docSnap = await getDoc(docRef);
      setFields(docSnap.data().title, docSnap.data().detail);
      // console.log(docSnap.data().title)
    }; 
    if (todoId) {
      fetchData();
    }
  },[todoId])

  // console.log(detail)

  return (
    <>
      <Head>
        <title>Show</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Box bg='yellow.200' w='100%' p={3}>
        <Heading as='h1' size='4xl' maxW='1080px' m="0 auto">NEXT TODO</Heading>
      </Box>

      <Box maxW="1080px" margin="0 auto">
        <Box mt="3" pb='15px' h='63' display='flex' justifyContent="space-between" >
          <Heading as='h2' size='2xl' mt="2">SHOW TODO</Heading>
          <BackButton />
        </Box>

        <Box w='100%' mt="5">
          <Box mb='20px' borderRadius={"10px"}
          border={"1px"}
          borderColor={"blackAlpha.800"}>
            <Box
              fontSize='24px'
              fontWeight='bold'
              lineHeight={1}
              bg={'yellow.300'}
              textAlign="center"
            >
              TITLE
            </Box>
            <Box
              h='70px'
              fontSize='20px'
              type='text'
              borderColor='blackAlpha.800'
            >
              {state.title}
            </Box>
          </Box>
          <Box mb='20px' borderRadius={"10px"}
          border={"1px"}
          borderColor={"blackAlpha.800"}>
            <Box
              fontSize='24px'
              fontWeight='bold'
              lineHeight={1}
              bg={'yellow.300'}
              textAlign="center"
            >
              DETAIL
            </Box>
            <Box
              h='320px'
              borderColor='blackAlpha.800'
              fontSize='20px'
            >
              {state.detail}
            </Box>
          </Box>            
        </Box>
      </Box>       
    </>
  );
};

export default TodoShow;