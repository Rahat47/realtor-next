import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import { socialIcons } from '../assets/data/socialIcons';

const SocialButton = ({ children, label, href, iconColor }) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            target={'_blank'}
            rel={'noopener noreferrer'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: iconColor,
                transform: 'scale(1.1)',
                color: 'white',
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text
                    fontSize='sm'
                    textAlign={{ base: 'center', md: 'left' }}
                    transition={'all 0.3s ease'}
                    color={useColorModeValue('gray.700', 'gray.200')}
                >
                    &copy; {new Date().getFullYear()} Realtor Next. All rights
                    reserved
                </Text>
                <Stack direction={'row'} spacing={6}>
                    {socialIcons.map(icon => (
                        <SocialButton
                            key={icon.id}
                            label={icon.name}
                            href={icon.url}
                            iconColor={icon.color}
                        >
                            {icon.Icon}
                        </SocialButton>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}
