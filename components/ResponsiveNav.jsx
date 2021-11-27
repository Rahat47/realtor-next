import Link from 'next/link';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Menu,
    chakra,
    MenuItem,
} from '@chakra-ui/react';
import { FcMenu } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import { navlinks } from '../assets/data/navlinks';

const ChakraLink = chakra(Link);

const NavLink = ({ children, href }) => (
    <ChakraLink
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={href || '/'}
    >
        {children}
    </ChakraLink>
);

export default function ResponsiveNav() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    w='100%'
                >
                    <HStack
                        spacing={8}
                        alignItems={'center'}
                        justifyContent='space-between'
                        w='100%'
                    >
                        <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
                            <ChakraLink href='/' pl='2'>
                                Next
                            </ChakraLink>
                        </Box>
                        <HStack
                            ml='auto'
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {navlinks.map(link => (
                                <NavLink key={link.id} href={link.url}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <IconButton
                        icon={isOpen ? <AiOutlineClose /> : <FcMenu />}
                        size={'md'}
                        aria-label={'Open Menu'}
                        display={{ md: 'none', base: 'flex' }}
                        onClick={isOpen ? onClose : onOpen}
                        justifyContent='center'
                        alignItems='center'
                    />
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Menu spacing={4}>
                            {navlinks.map(link => (
                                <MenuItem icon={link.Icon} key={link.id}>
                                    <NavLink key={link.id} href={link.url}>
                                        {link.name}
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
