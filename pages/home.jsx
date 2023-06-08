import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import db from "../src/firebase"
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Heading, Select, Box, Flex, Container, Spacer } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

function Home() {
  const router = useRouter();

  const [todos, setTodos] = useState([]) 
  //初期のtodoリスト定義
  const [filter, setFilter] = useState('-------')
  // statusのフィルター自体の定義
  const [filteredTodos, setFilteredTodos] = useState([])
  // 絞り込んだ後のtodoリストのデータ定義
  const [status, setStatus]  = useState("")
  //firebaseから取得したステータスを保持

  //status欄の変更に応じてstatusを更新
  // const handleStatusListChange = (e) => {
  //   setStatus(e.target.value)
  // }

  // //firebaseからデータを呼び出す
  // useEffect(() => {
  //   const todoData = collection(db, "todos"); 
  //   getDocs(todoData).then((querySnapshot) => {
  //   // objectで返ってきたら、querySnapshotでデータを取ってくる
  //   // querySnapshotの中のdocs情報を見る→それをmap関数で一つずつ取り出し
  //   // ひとつずつ取り出したデータをdocという形で置く→そのdocの中のdata関数
  //     setTodos(querySnapshot.docs.map((doc) => {
  //       console.log(doc.data()) 
  //       return {...doc.data(), id: doc.id}}))

  //   })
    
  // },[])
  // console.log(todos)

  //firebaseからデータを呼び出す
  useEffect(() => {
    const todoData = collection(db, "todos");
     //collection関数をつかってfirebaseのtodosデータを取得する todoDataの値を取得
    onSnapshot(todoData, (snapshot) => {
     // onSnapshotでtodoData (collectionで取得したもの)を取得
     // objectで返ってきたら、snapshot(命名)でデータを取ってくる
     // onSnapshotにすることで更新した新しいtodoが入るようになる
      const newTodos = [];
      //新しいtodosリストは空配列と定義
      snapshot.docs.map((doc) => {
     // snapshotの中のdocs情報を見る→それをmap関数で一つずつ取り出し
     // ひとつずつ取り出したデータをdocという形で置く→そのdocの中のdata関数
     // documentの中が確認できるようになる
        const todo = {
          id: doc.id,
          // ドキュメントidを取得
          title: doc.data().title,
          detail: doc.data().detail, 
          status: doc.data().status,
          //data()はもう一つ下の階層、status,detail,titleなどのキーを指定し、その値を書く
          action: "icons",
        };
        newTodos.push({ ...todo });
        //新しいTodosリストにpush関数で各項目を追加
      });
      setTodos(newTodos);
      //setTodos関数にてtodosへ保持するようにする
    });
  }, []);
  // console.log(todos.map((todo) => todo));

  //更新したstatusを保持する
  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value)
  // }

  //Statusを変更して新しいtodoリストを作成
  const handleStatusListChange = (targetTodo, e) => {
    e.preventDefault();
    updateDoc(doc(db, "todos", targetTodo.id),{
      status:status
    });
    const newArray = todos.map((todo) => todo.id === targetTodo.id ? {...todo, status:e.target.value } : todo )
    setStatus(e.target.value)
    setTodos(newArray)
    console.log("ターゲット", (e.target.value))
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
  
    //対象のtodoを削除する
    const handleDeleteTodo = (targetTodo) => {
      deleteDoc(doc(db, "todos", targetTodo.id));
      //※第３引数−>deleteIconのところで(todo)を引数としてとっているため、idの取得ができている
      //よって、targetTodo.idとすることで対象のidを指定できる
      setTodos(todos.filter((todo) => todo !==targetTodo))
      // console.log("targetTodoです", targetTodo)
    }

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
            <Box ml='15px'>
              <p>STATUS</p>
              <Select variant='filled' value={filter} onChange={(e) => setFilter(e.target.value)}>
                {/* フィルターの中身を変えて保持 */}
                <option value='all'>-------</option>
                <option value='notStarted'>NOT STARTED</option>
                <option value='doing'>DOING</option>
                <option value='done'>DONE</option>
              </Select>
            </Box>
            <Spacer />
            <EditIcon 
              mt="10" 
              bg='pink'
              fontSize="30px"
              padding="5px"
              borderRadius="full"
              onClick={() => router.push('/create')}
              cursor="pointer"
            />
          </Box>

          <TableContainer>
            <Table size='sm' variant='simple'>
              <Thead size='3xl' bg='orange.200' height="16">
                <Tr>
                  <Th textAlign="center" fontSize="2xl" textTransform="none">Task</Th>
                  <Th textAlign="center" fontSize="2xl" textTransform="none">Status</Th>
                  <Th textAlign="center" fontSize="2xl" textTransform="none">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTodos.map((todo)=> (
                  <Tr key={todo.id}>
                  {/* todo.idはdoc.idからきてる */}
                    <Td fontWeight="bold">{todo.title}</Td>

                    <Td>
                      <Select 
                        bg="orange.400"
                        border='none'
                        borderRadius='full'
                        fontWeight="bold"
                        value={todo.status} 
                        // onChange={handleStatusChange}
                        onChange={(e) => handleStatusListChange(todo, e)}    
                      >
                        <option value="not started">NOT STARTED</option>
                        <option value="doing">DOING</option>
                        <option value="done">DONE</option>
                      </Select>
                    </Td>

                    <Td>
                      <Flex justifyContent="center">
                        <button style=
                          {{display: "inline-block", marginRight: "10px"}} 
                          ml='150px' 
                          onClick={() => router.push(
                            `show/${todo.id}`
                          )}
                        >
                          <ViewIcon />
                        </button>
                        <button style=
                          {{display: "inline-block", marginRight: "10px"}} 
                          ml='150px'  
                          onClick={() => router.push(
                            // pathname: '/edit/[todoId]',
                            // query: {todoId: doc.id},
                            `edit/${todo.id}`
                            // "edit/[1]"で確かめた
                            //指定したidを取得する
                          )}
                        >
                          <EditIcon />
                        </button>
                        <button 
                          onClick={() => handleDeleteTodo(todo)}
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