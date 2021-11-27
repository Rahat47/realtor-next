import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

export default function NotFound({ message, title }) {
    return (
        <Box textAlign='center' py={10} px={6}>
            <Box display='inline-block'>
                <Flex
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    bg={'red.500'}
                    rounded={'50px'}
                    w={'55px'}
                    h={'55px'}
                    textAlign='center'
                >
                    <AiOutlineClose size='2rem' color={'white'} />
                </Flex>
            </Box>
            <Heading as='h2' size='xl' mt={6} mb={2}>
                {title ? title : 'No Result Found'}
            </Heading>
            <Text color={'gray.500'}>
                {message
                    ? message
                    : `Please try again with different search criteria or Filters. If
                you are still having trouble, please contact us.`}
            </Text>
        </Box>
    );
}
