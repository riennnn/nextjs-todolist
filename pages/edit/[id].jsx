import { useEffect, useState } from 'react';
import Head from 'next/head'
import db from "../../libs/firebase"
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  Textarea, 
  Container 
} from '@chakra-ui/react';
import { BackButton } from '../../components/backButton';
import { useRouter } from 'next/router';

const Edit =()=>{

  const router = useRouter();
  const todoId = router.query.id;
  //動的ルートのurlが入ってくる
  //home.jsxページからの遷移コード、todo.idから渡された情報をrouter.query.idで受け取る
  //router.queryとすると動的ルーティングを取得できる
  // console.log(router)
  //routerだけだと色々入っている
  // console.log(router.query.id)
  //その中のquery->idを受け取る
  //ドキュメントのidが取得できている

  const [title, setTitle] = useState("");
  //firebase取得したタイトルを保持
  const [detail, setDetail] = useState("");
  //firebaseから取得した詳細を保持

  // title欄に入力した値に応じてstateを更新する
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  // detail欄に入力した値に応じてstateを更新する
  const handleDetailChange = (e) => {
    setDetail(e.target.value)
  }

  //doc,getDocにてfirebaseより単一のデータを取得する
  useEffect(() => {
    const fetchData = async () => {
      // console.log("doc.id",doc.id)
      //そもそもdocがないので取得できないことがわかる
      const docRef = doc(db, "todos", todoId);
      // 第一引数はdatabaseの設定しているdb、第二引数はコレクションのtodos、第三引数はドキュメントid
      const docSnap = await getDoc(docRef);
      //getDoc関数でdocRef内のデータを呼び出す関数
      //getDocの処理を終えたらfetchData関数の終わりまでの部分（setTitleとか）が実行される
      setTitle(docSnap.data().title);
      //docSnapにより読み込んだtitleをeditページの中に格納
      setDetail(docSnap.data().detail);
      //docSnapにより読み込んだdetailをeditページの中に格納
      // console.log("docSnapの中", docSnap.data())
    }; 
    if (todoId) {
      // もしtodoIdがあればfetchData関数を返す
      fetchData();
    }
  },[todoId])
  //useEffectの監視対象について
  //１データが空の状態でレンダリング
  //2 データが取得できたら再度レンダリング（監視対象に変化があった場合動く）

  //編集更新操作をしたときの関数
  const handleEditTodo = (e) => {
    e.preventDefault();
    //データ送信時にページ全体をリロードさせないため
    console.log(title, detail)
      updateDoc(doc(db, "todos", todoId), 
          {
          title: title,
          detail: detail,
        }
      )
      setTitle("")
      setDetail("")
      router.push('/home')
    }

  return (
    <>
      <Head>
        <title>Edit</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      
      <Box bg='yellow.200' w='100%' p={3}>
        <Heading as='h1' size='4xl' maxW='1080px' m="0 auto">NEXT TODO</Heading>
      </Box>
      
      <Box maxW='1080px' m='0 auto'>
        <Container w='85%' maxW='1080px' pt='16px'>
          <Box pb="15px" h="63" display="flex" justifyContent="space-between">
            <Heading as='h2' size='2xl' mt="2">EDIT TODO</Heading>
            <BackButton />
          </Box>

          <Box>
            <Box w='100%'>
              <form onSubmit={handleEditTodo}>
              {/* 編集ボタンを押すと関数が実行されるようにする */}

                <FormControl mb='20px'>
                  <FormLabel
                    fontSize='24px'
                    fontWeight='bold'
                    lineHeight={1}
                  >
                    TITLE
                  </FormLabel>
                  <Input
                    h='70px'
                    fontSize='20px'
                    rounded='10px'
                    type='text'
                    borderColor='blackAlpha.800'
                    value={title}
                    //編集したタイトルのstateを定義し紐付ける
                    onChange={handleTitleChange}
                    //handleTitleChange関数を呼び出して編集済みデータが更新される
                  />
                </FormControl>
                <FormControl mb='20px'>
                  <FormLabel
                    fontSize='24px'
                    fontWeight='bold'
                    lineHeight={1}
                  >
                    DETAIL
                  </FormLabel>
                  <Textarea
                    h='320px'
                    rounded='10px'
                    borderColor='blackAlpha.800'
                    fontSize='20px'
                    value={detail}
                    //編集した詳細のstateを定義し紐付ける
                    onChange={handleDetailChange}
                    //handleDetailChange関数を呼び出して編集済みデータが更新される
                  >
                  </Textarea>
                </FormControl>

                <Button
                    w={28}
                    bg='yellow.200'
                    rounded='full'
                    type='submit'
                    //ボタンを挙動させるために必要　デフォルトはbutton(onClick)の動作
                  >
                    UPDATE
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
    )

}
export default Edit;