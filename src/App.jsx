import { Box, Button, Container, Flex, Heading, Input, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import wNumb from 'wnumb';
import angkaTerbilang from '@develoka/angka-terbilang-js';

const operatorSymbol = {
  plus: '+',
  minus: '-',
  divide: '/',
  times: 'x',
};

function App() {
  const [position, setPosition] = useState('first');
  const [showTerbilang, setShowTerbilang] = useState(false);
  const [data, setData] = useState({ firstNumber: 0, operator: null, secondNumber: null });

  const existingChar = useMemo(() => {
    let existing = '';
    if (position == 'first') {
      existing = data.firstNumber.toString();
    } else {
      existing = data.secondNumber == null ? '0' : data.secondNumber.toString();
    }
    return existing;
  });

  const moneyFormat = wNumb({
    mark: ',',
    thousand: '.',
    prefix: '',
    suffix: '',
  });

  const resetData = () => {
    setPosition('first');
    setData({ firstNumber: 0, operator: null, secondNumber: 0 });
  };

  const addChar = (char) => {
    let existing = existingChar;

    const alreadyHasMark = existing.indexOf(',') >= 0;

    if (char == ',') {
      if (alreadyHasMark === false) {
        existing = existing == 0 ? '0,' : `${existing}${char}`;
        existing = existing.replace(',', '.');
      }
    } else {
      existing = existing == 0 ? char : `${existing}${char}`;
    }

    if (position == 'first') {
      setData((prev) => ({ ...prev, firstNumber: parseFloat(existing) }));
    } else {
      setData((prev) => ({ ...prev, secondNumber: parseFloat(existing) }));
    }
  };

  const setOperator = (operator) => {
    if (position == 'second') {
      calculate();
    }

    switch (operator) {
      case 'plus':
        setData((prev) => ({ ...prev, operator }));
        break;

      case 'minus':
        setData((prev) => ({ ...prev, operator }));
        break;

      case 'divide':
        setData((prev) => ({ ...prev, operator }));
        break;

      case 'times':
        setData((prev) => ({ ...prev, operator }));
        break;

      default:
        break;
    }

    setPosition('second');
  };

  const calculate = () => {
    if (data.operator == null || data.secondNumber == null) {
      return;
    }

    let result = 0;
    switch (data.operator) {
      case 'plus':
        result = data.firstNumber + data.secondNumber;
        break;

      case 'minus':
        result = data.firstNumber - data.secondNumber;
        break;

      case 'divide':
        result = data.firstNumber / data.secondNumber;
        break;

      case 'times':
        result = data.firstNumber * data.secondNumber;
        break;

      default:
        break;
    }

    setData((prev) => ({ operator: null, secondNumber: null, firstNumber: parseFloat(result) }));
    setPosition('first');
  };

  const currentDisplay = useMemo(() => {
    if (position == 'first') {
      return moneyFormat.to(data.firstNumber);
    }
    return moneyFormat.to(data.secondNumber ?? 0);
  }, [data]);

  const miniDisplay = useMemo(() => {
    if (position == 'first') {
      return '';
    }

    return `${moneyFormat.to(data.firstNumber)} ${operatorSymbol[data.operator]}`;
  }, [position, data]);

  const terbilang = useMemo(() => {
    if (data.firstNumber < 0) {
      return '(minus) ' + angkaTerbilang(data.firstNumber * -1);
    }
    return angkaTerbilang(data.firstNumber);
  }, [data.firstNumber]);

  const toggleTerbilang = () => {
    setShowTerbilang((prev) => !prev);
  };

  const deleteLastChar = () => {
    let existing = existingChar;

    existing = existing.length == 1 ? '0' : `${existing}`.substring(0, existing.length - 1);

    if (position == 'first') {
      setData((prev) => ({ ...prev, firstNumber: parseFloat(existing) }));
    } else {
      setData((prev) => ({ ...prev, secondNumber: parseFloat(existing) }));
    }
  };

  const togglePlusMinus = () => {
    if (position == 'first') {
      setData((prev) => ({ ...prev, firstNumber: prev.firstNumber * -1 }));
    } else {
      setData((prev) => ({ ...prev, secondNumber: prev.secondNumber * -1 }));
    }
  };

  useEffect(() => {
    console.log(data);
  });

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box rounded={'md'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={10}>
        <Text textAlign={'right'} fontSize={'medium'} mb="2" color={'gray'}>
          {miniDisplay}
        </Text>
        <Box rounded={'md'} border={'1px'} borderColor={'gray.300'} mb={2} textAlign="right" px={2} py={1}>
          <Text fontSize={'30'}>{currentDisplay}</Text>
        </Box>

        {showTerbilang && (
          <Text textAlign={'right'} fontSize={'medium'} mb="4" color={'gray'}>
            {terbilang}
          </Text>
        )}

        <SimpleGrid columns={4} spacing={2}>
          <div></div>
          <Button size={'lg'} colorScheme={'red'} onClick={() => resetData()}>
            C
          </Button>
          <Button size={'lg'} colorScheme={'gray'} onClick={() => deleteLastChar()}>
            DEL
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => setOperator('divide')}>
            <span>/</span>
          </Button>

          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(7)}>
            7
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(8)}>
            8
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(9)}>
            9
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => setOperator('times')}>
            <span>x</span>
          </Button>

          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(4)}>
            4
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(5)}>
            5
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(6)}>
            6
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => setOperator('minus')}>
            <span>-</span>
          </Button>

          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(1)}>
            1
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(2)}>
            2
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(3)}>
            3
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => setOperator('plus')}>
            <span>+</span>
          </Button>

          <Button size={'lg'} colorScheme={'gray'} onClick={() => togglePlusMinus()}>
            +/-
          </Button>
          <Button colorScheme={'gray'} size={'lg'} onClick={() => addChar(0)}>
            0
          </Button>
          <Button title="Tampilkan Angka Terbilang" variant={showTerbilang ? 'solid' : 'outline'} colorScheme={'telegram'} size={'lg'} onClick={() => toggleTerbilang()}>
            SPELL
          </Button>
          <Button colorScheme={'blue'} size={'lg'} onClick={() => calculate()}>
            =
          </Button>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default App;
