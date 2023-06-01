import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { Heading, Select, Box, Flex, Container } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import { SearchInput } from './components/searchInput'
import db from "../src/firebase"
import { collection, getDocs } from "firebase/firestore";


function Home() {

  // const status = [
  //   {
  //     text: "not started",
  //     backgroundColor: "orange.100",
  //     color: "blackAlpha.800",
  //     word: "NOT STARTED"
  //   },
  
  //   {
  //     text: "doing",
  //     backgroundColor: "orange.500",
  //     color: "white",
  //     word: "DOING"
  //   },
  
  //   {
  //     text: "done",
  //     backgroundColor: "orange.300",
  //     color: "blackAlpha.800",
  //     word: "DONE"
  //   }
  // ];  

  const [todos, setTodos] = useState([]) //初期のtodoリスト定義
  const [filter, setFilter] = useState('-------')
  // statusのフィルター自体の定義
  const [filteredTodos, setFilteredTodos] = useState([])
  // 絞り込んだ後のtodoリストのデータ定義

  const [todoSearchTitle, setTodoSearchTitle] = useState('');
  // const [todoId, setTodoId] = useState(todos.length +1)
  //idの関係でいらない？
  // const [isEditable, setIsEditable] = useState(false)
  // const[editId, setEditId] = useState('')
  // const [newTitle, setNewTitle] = useState('')

  // const handleDeleteTodo = (targetTodo) => {
  //   setTodos(todos.filter((todo) => todo !==targetTodo))
  // }

  // const handleOpenEditPage = (todo) => {
  //   setIsEditable(true)
  //   setEditId(todo.id)
  //   setNewTitle(todo.title) //必要？
  // }

  //元々コメントアウト
  // const handleEditTodo = () => {
  //   const newArray = todos.map((todo) =>
  //   todo.id === editId? {...todo, title:newTitle} : todo)setTodos(newArray)
  //   setNewTitle('')
  //   setEditId('')
  // }
  //ここまで

  //firebaseからデータを呼び出す
  useEffect(() => {
    const todoData = collection(db, "todos"); 
    //collection関数をつかってfirebaseのtodosデータを取得する todoDataの値を取得
    getDocs(todoData).then((querySnapshot) => {
    // objectで返ってきたら、querySnapshotでデータを取ってくる
    // querySnapshotの中のdocs情報を見る→それをmap関数で一つずつ取り出し
    // ひとつずつ取り出したデータをdocという形で置く→そのdocの中のdata関数
      setTodos(querySnapshot.docs.map((doc) => doc.data()))
    })
  },[])

  //Statusを変更して新しいtodoリストを作成
  const handleStatusChange = (targetTodo, e) => {
    const newArray = todos.map((todo) => todo.id === targetTodo.id ? {...todo, status:e.target.value } : todo )
    setTodos(newArray)
  }

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case 'notStarted':
          // startedのことについて確認したい
          setFilteredTodos(todos.filter((todo) => todo.status === 'not started'))
          break
        case 'doing':
          setFilteredTodos(todos.filter((todo) => todo.status === 'doing'))
          break
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
          break
        default:
          setFilteredTodos(todos)
      }
    }
    filteringTodos()
  }, [filter, todos])
  // フィルター操作と、todoリストの変更時に実行
  
  //元々コメントアウト
  // const handleSearchFormChanges = (e) => {
  //   setTodoSearchTitle(e.target.value)
  // }
  //ここまで

  return (
    <div>
      <Head>
        <title>List</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Box bg='yellow.200' w='100%' p={3}>
        <Heading as='h1' size='4xl' maxW='1080px' m="0 auto">NEXT TODO</Heading>
      </Box>

      <Box maxW='1080px' m='0 auto'>
        <Container w='100%' maxW='1080px' pt='16px'>
          <Heading as='h2' size='2xl' mt="2">TODO LIST</Heading>
          <Box display='flex' mt='32px' mb='32px'> 
            <Box>
              <p>SEARCH</p>
              <SearchInput todoSearchTitle={todoSearchTitle} setTodoSearchTitle={setTodoSearchTitle} />
            </Box>

            <Box ml='15px'>
              <p>STATUS</p>
              <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                {/* フィルターの中身を変えて保持 */}
                <option value='all'>-------</option>
                <option value='notStarted'>NOT STARTED</option>
                <option value='doing'>DOING</option>
                <option value='done'>DONE</option>
              </Select>
            </Box>
          </Box>

          <TableContainer>
            <Table size='sm' variant='simple'>
              <Thead size='3xl' bg='orange.200' height="16">
                <Tr>
                  <Th textAlign="center" fontSize="2xl" textTransform="none">Task</Th>
                  <Th textAlign="center" fontSize="2xl" textTransform="none">Status</Th>
                  {/* <Th textAlign="center" fontSize="2xl" textTransform="none">Create</Th> */}
                  <Th textAlign="center" fontSize="2xl" textTransform="none">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTodos.map((todo)=> (
                // {todos.map((todo) => (
                  <Tr key={todo.id}>
                    
                    <Td fontWeight="bold">{todo.title}</Td>

                    <Td>
                      {/* <Select 
                        // bg={status.map((value) => todo.status === value.text && value.backgroundColor)}元々コメントアウト
                        bg={status.find((value) => todo.status === value.text).backgroundColor}
                        color={status.find((value) => todo.status === value.text).color}
                        borderColor='blackAlpha.800'
                        borderRadius='full'
                        value={todo.status} 
                        // セレクトボックスを操作時にhandleStatusChange関数が呼ばれる 元々コメントアウト
                        onChange={(e) => handleStatusChange(todo, e)}
                        fontWeight="bold"
                      >
                        {status.map((value, index) => (
                          <option key={index} value={value.text}>{value.word}</option>
                        ))}
                      </Select> */}
                      <Select 
                        bg="orange.400"
                        border='none'
                        borderRadius='full'
                        fontWeight="bold"
                        value={todo.status} 
                        onChange={(e) => handleStatusChange(todo, e)}    
                      >
                        <option value="not started">NOT STARTED</option>
                        <option value="doing">DOING</option>
                        <option value="done">DONE</option>
                      </Select>
                    </Td>

                    {/* <Td textAlign="center" fontWeight="bold">
                      {todo.createDate}
                    </Td> */}

                    <Td>
                      <Flex justifyContent="center">
                        <button style=
                          {{display: "inline-block", marginRight: "10px"}} 
                          ml='150px'  
                          // onClick={() =>handleOpenEditPage(todo)}
                        >
                          <EditIcon />
                        </button>
                        <button 
                          // onClick={() => handleDeleteTodo(todo)}
                          ml={5}
                        >
                          <DeleteIcon />
                        </button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </div>
  )
}

export default Home;