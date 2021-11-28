import Image from 'next/image';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    Flex,
    useColorModeValue,
    HStack,
    Tag,
    TagLabel,
    Spacer,
    TagLeftIcon,
} from '@chakra-ui/react';
import defaultImage from '../assets/images/house.jpg';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import millify from 'millify';
import moment from 'moment';

export default function PropertyCard({ property }) {
    return (
        <Link href={`/property/${property.externalID}`} passHref>
            <Center cursor='pointer' py={6}>
                <Box
                    w={'400px'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={4}
                    overflow={'hidden'}
                >
                    <Box mb={6} pos={'relative'} w={'full'}>
                        <Image
                            src={
                                property?.coverPhoto
                                    ? property.coverPhoto.url
                                    : defaultImage
                            }
                            alt='property'
                            width={400}
                            height={260}
                        />
                    </Box>
                    <Stack>
                        <Flex alignItems='center'>
                            <Box pr='3' color='green.400'>
                                {property.isVerified && (
                                    <GoVerified size={'1.4rem'} />
                                )}
                            </Box>
                            <Text fontWeight='bold' fontSize='lg'>
                                AED {millify(property.price)}
                                {property.rentFrequency &&
                                    `/${property.rentFrequency}`}
                            </Text>
                        </Flex>
                        <Flex
                            alignItems='center'
                            p='1'
                            justifyContent='space-between'
                            color='blue.400'
                        >
                            <HStack
                                wrap='wrap'
                                alignItems='center'
                                justify='center'
                                spacing={2}
                            >
                                <Tag my={2} colorScheme='blue' size='md'>
                                    <TagLabel px={2}>
                                        {property.rooms}{' '}
                                        {property.rooms > 1 ? 'Rooms' : 'Room'}{' '}
                                    </TagLabel>
                                    <TagLeftIcon as={FaBed} boxSize='1rem' />
                                </Tag>
                                <Tag my={2} colorScheme='green' size='md'>
                                    <TagLabel px={2}>
                                        {property.baths}{' '}
                                        {property.baths > 1 ? 'Baths' : 'Bath'}{' '}
                                    </TagLabel>
                                    <TagLeftIcon as={FaBath} boxSize='1rem' />
                                </Tag>

                                <Tag my={2} colorScheme='red' size='md'>
                                    <TagLabel px={2}>
                                        {millify(property.area)} sqft
                                    </TagLabel>
                                    <TagLeftIcon
                                        as={BsGridFill}
                                        boxSize='1rem'
                                    />
                                </Tag>
                            </HStack>
                        </Flex>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'xl'}
                            fontFamily={'body'}
                        >
                            {property?.title?.length > 25
                                ? property.title.substring(0, 25) + '...'
                                : property.title}
                        </Heading>
                    </Stack>
                    <Spacer />
                    <Stack
                        mt={6}
                        direction={'row'}
                        spacing={4}
                        align={'center'}
                    >
                        <Avatar
                            size='sm'
                            src={property?.agency?.logo?.url}
                            alt={property?.agency?.name}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>
                                {property?.agency?.name?.length > 20
                                    ? property?.agency?.name?.substring(0, 20) +
                                      '...'
                                    : property?.agency?.name}
                            </Text>
                            <Text color={'gray.500'}>
                                {/* Get date and format like MMM DD, YYYY */}
                                {property.updatedAt &&
                                    moment(property.updatedAt).format(
                                        'MMM DD, YYYY'
                                    )}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Center>
        </Link>
    );
}
