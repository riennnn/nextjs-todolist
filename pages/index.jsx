import { Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

function index() {
  return (
    <div>
      <Box bg='yellow.200' w='100%' p={3}>
        <Heading as='h1' size='4xl' maxW='1080px' m="0 auto">NEXT TODO</Heading>
      </Box>
      <Link href="/home"><p>todoリストへ</p></Link>
    </div>
  )
}

export default index
