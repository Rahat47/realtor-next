import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner({
    imageUrl,
    title1,
    title2,
    description,
    buttonText,
    buttonUrl,
}) {
    return (
        <Stack
            direction={{ base: 'column', md: 'row' }}
            my={5}
            py={4}
            borderBottom='1px'
            borderColor='gray.100'
            bg='gray.100'
        >
            <Flex flex={1} pl={4}>
                <Image alt={title1} src={imageUrl} width={500} height={300} />
            </Flex>
            <Flex flex={1} p={4} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({
                                    base: '20%',
                                    md: '30%',
                                }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'blue.300',
                                zIndex: -1,
                            }}
                        >
                            {title1}
                        </Text>
                        <br />{' '}
                        <Text color={'blue.400'} as={'span'}>
                            {title2}
                        </Text>{' '}
                    </Heading>
                    <Text
                        fontSize={{ base: 'md', lg: 'lg' }}
                        color={'gray.500'}
                    >
                        {description}
                    </Text>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        spacing={4}
                    >
                        <Button
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            <Link href={buttonUrl}>{buttonText}</Link>
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </Stack>
    );
}
