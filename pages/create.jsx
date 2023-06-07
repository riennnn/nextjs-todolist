import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import db from "../src/firebase"
import {
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Box,
  Container,
} from "@chakra-ui/react";
import { BackButton } from '../components/backButton';

const CreateTodo = () => {
  const [todoTitle, setTodoTitle] = useState('') //title欄へのデータを保持する
  const [todoText, setTodoText] = useState('') //detail欄へのデータを保持する
  const [todos, setTodos] = useState([]) //入力したtodoをリスト管理する

  const router = useRouter();

  const handleSubmit = e => { 
    e.preventDefault()
    setTodos
    ({
      title: todoTitle,
      detail: todoText, 
    })
    addDoc(collection(db, "todos"), {
      title:todoTitle,
      detail: todoText,
      status: "not started",
    });
    setTodoTitle("");
    setTodoText("");
    // addTodo(todoTitle) //handleSubmitの中で呼ぶ
    router.push('/home')
  }

  // const addTodo = text => {
  //   const newTodos = [...todos, text]
  //   setTodos(newTodos)
  // }
  // //③formから新たに追加したtodoをいれる関数
  // //③新たなTodoリスト(newTodos)をsetTodosを使ってtodoStateへ保存
  // const handleAddTodo = () => {
  //   setTodos([...todos, {id: todoId, title: todoTitle, status:'not started'}])
  //   setTodoId(todoId + 1)
  //   // ④createボタンを押すと新規todoがリストへ追加される
  // }

  return (
    <>
      <Head>
        <title>Create</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Box bg='yellow.200' w='100%' p={3}>
        <Heading as='h1' size='4xl' maxW='1080px' m="0 auto">NEXT TODO</Heading>
      </Box>

      <Box maxW='1080px' m='0 auto'>
        <Container w='85%' maxW='1080px' pt='16px'>
          <Box pb="15px" h="63" display="flex" justifyContent="space-between">
            <Heading as='h2' size='2xl' mt="2">NEW TODO</Heading>
            <BackButton />
        </Box>

          <form onSubmit={handleSubmit}>
            <Box w="100%" margin="0 auto">
              <FormControl mb="20px">
                <FormLabel 
                  htmlFor="title" 
                  fontSize='24px'
                  fontWeight='bold'
                  lineHeight={1}
                >
                  TITLE
                </FormLabel>
                <Input
                  id="title" //ここのidと採番されるidの違い
                  type="text"
                  placeholder="Text"
                  h="70px"
                  fontSize='20px'
                  rounded='10px'
                  borderColor='blackAlpha.800'
                  value={todoTitle} //inputした値を入るよう紐付け
                  onChange={e => setTodoTitle(e.target.value)} //値が変更されるようにする
                />
              </FormControl>
              <FormControl mb="20px">
                <FormLabel 
                  htmlFor="description" 
                  fontSize='24px'
                  fontWeight='bold'
                  lineHeight={1}
                >
                  DETAIL
                </FormLabel>
                <Textarea 
                  id="detail" 
                  placeholder="Text" 
                  h='320px'
                  rounded='10px'
                  borderColor='blackAlpha.800'
                  fontSize='20px'
                  value={todoText}
                  onChange={e => setTodoText(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  box-sizing="border-box"
                  bg="yellow.200"
                  borderRadius="full"
                  w="112px"
                  // onClick={handleAddTodo} 
                >
                  CREATE
                </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default CreateTodo;