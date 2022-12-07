import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Calculator from './Calculator';
import Login from './Login';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionStorage = localStorage.getItem('session');

    if (!sessionStorage) {
      return;
    }

    const currentSession = JSON.parse(sessionStorage);
    setSession(currentSession);
  }, []);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box rounded={'md'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={10}>
        {session === null ? <Login setSession={setSession} /> : <Calculator session={session} setSession={setSession} />}
      </Box>
    </Flex>
  );
  return;
}

export default App;
