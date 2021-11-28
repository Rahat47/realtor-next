import {
    Box,
    Flex,
    Text,
    SimpleGrid,
    HStack,
    Tag,
    TagLabel,
    TagLeftIcon,
} from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { fetchApi, baseUrl } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';
import Contact from '../../components/Contact';

const PropertyDetails = ({ property }) => {
    const makeLocation = locationArr => {
        let locationString = '';

        // reverse the array and start a loop
        locationArr.forEach(location => {
            // add location.name to locationString
            locationString += `${location.name}, `;
        });

        // remove the last comma and space
        locationString = locationString.slice(0, -2);

        return locationString;
    };
    return (
        <Box maxW='1000px' m='auto' p='4'>
            {property.photos && <ImageScrollbar data={property.photos} />}
            <Box width='full' p='6'>
                <Flex py='5' alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center'>
                        <Box pr='3' color='green.400'>
                            {property.isVerified && <GoVerified />}
                        </Box>
                        <Text fontWeight='bold' fontSize='lg'>
                            AED {millify(property.price)}
                            {property.rentFrequency &&
                                `/${property.rentFrequency}`}
                        </Text>
                    </Flex>
                </Flex>

                <Flex
                    alignItems='center'
                    p='1'
                    justifyContent='space-between'
                    w='250px'
                    color='blue.400'
                >
                    <HStack spacing={8}>
                        <Tag colorScheme='blue' size='md'>
                            <TagLabel px={3}>
                                {property.rooms}{' '}
                                {property.rooms > 1 ? 'Rooms' : 'Room'}{' '}
                            </TagLabel>
                            <TagLeftIcon as={FaBed} boxSize='1rem' />
                        </Tag>
                        <Tag colorScheme='green' size='md'>
                            <TagLabel px={3}>
                                {property.baths}{' '}
                                {property.baths > 1 ? 'Baths' : 'Bath'}{' '}
                            </TagLabel>
                            <TagLeftIcon as={FaBath} boxSize='1rem' />
                        </Tag>

                        <Tag colorScheme='red' size='md'>
                            <TagLabel px={3}>
                                {millify(property.area)} sqft
                            </TagLabel>
                            <TagLeftIcon as={BsGridFill} boxSize='1rem' />
                        </Tag>
                    </HStack>
                </Flex>
                <Box mt='2'>
                    <Text fontSize='3xl' mb='2' fontWeight='bold'>
                        {property.title}
                    </Text>
                </Box>
                <Text mb={6} lineHeight={2} color='gray.600'>
                    {property.description}
                </Text>
                <Flex
                    flexWrap='wrap'
                    textTransform='uppercase'
                    justifyContent='space-between'
                >
                    <Flex
                        justifyContent='space-between'
                        w='400px'
                        borderBottom='1px'
                        borderColor='gray.200'
                        p='3'
                    >
                        <Text>Type</Text>
                        <Text fontWeight='bold'>{property.type}</Text>
                    </Flex>

                    <Flex
                        justifyContent='space-between'
                        w='400px'
                        borderBottom='1px'
                        borderColor='gray.200'
                        p='3'
                    >
                        <Text>Purpose</Text>
                        <Text fontWeight='bold'>{property.purpose}</Text>
                    </Flex>

                    {property.furnishingStatus && (
                        <Flex
                            justifyContent='space-between'
                            w='400px'
                            borderBottom='1px'
                            borderColor='gray.200'
                            p='3'
                        >
                            <Text>Furnishing Status</Text>
                            <Text fontWeight='bold'>
                                {property.furnishingStatus}
                            </Text>
                        </Flex>
                    )}
                </Flex>
                <Box>
                    {property?.amenities?.length && (
                        <Text
                            borderBottom='1px'
                            borderColor='gray.200'
                            py='2'
                            fontSize='2xl'
                            fontWeight='black'
                            mt='5'
                        >
                            Amenities
                        </Text>
                    )}
                    {property?.amenities?.length && (
                        <SimpleGrid
                            mt={4}
                            columns={{ base: 1, md: 2, lg: 3 }}
                            spacing={10}
                        >
                            {property.amenities.map(item => (
                                <Box
                                    key={item.text}
                                    p='2'
                                    border='1px'
                                    borderColor='gray.200'
                                    borderRadius='5px'
                                    boxShadow='0px 0px 5px rgba(0, 0, 0, 0.1)'
                                >
                                    <Text
                                        fontSize={'xl'}
                                        fontWeight='bold'
                                        mb={3}
                                        textAlign='center'
                                    >
                                        {item.text}
                                    </Text>
                                    {item.amenities.map(amenity => (
                                        <Text
                                            fontWeight='bold'
                                            color='blue.400'
                                            fontSize='lg'
                                            p={2}
                                            bg='gray.200'
                                            margin='1'
                                            borderRadius='5'
                                            cursor='pointer'
                                            transition='all 0.2s ease'
                                            _hover={{
                                                bg: 'blue.500',
                                                color: 'white',
                                            }}
                                            key={amenity.text}
                                        >
                                            {amenity.text}
                                        </Text>
                                    ))}
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </Box>
                {/* Amenities End Here */}

                <Box my='5'>
                    <Text fontSize='3xl' py='4' fontWeight='bold'>
                        Contact With Agent
                    </Text>
                    <Contact
                        contactPerson={property.contactName}
                        phone={property.phoneNumber.mobile}
                        address={
                            property.location.length &&
                            makeLocation(property.location)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(`${baseUrl}/properties/detail`, null, null, {
        externalID: id,
    });

    return {
        props: {
            property: data,
        },
    };
}
