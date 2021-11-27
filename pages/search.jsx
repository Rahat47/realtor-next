import { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Icon, Text } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import NotFound from '../components/NotFound';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export default function Search({ properties }) {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();
    return (
        <Box>
            <Flex
                cursor={'pointer'}
                bg='gray.100'
                borderBottom='1px'
                borderColor='gray.200'
                p='2'
                fontWeight='black'
                fontSize='lg'
                justifyContent='center'
                alignItems='center'
                onClick={() => setSearchFilters(prev => !prev)}
            >
                <Text>Search Property By Filters</Text>
                <Icon pl='2' w='7' as={BsFilter} size='20px' />
            </Flex>

            {searchFilters && <SearchFilters />}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {properties?.map(property => (
                    <Property key={property?.id} property={property} />
                ))}
            </Flex>
            {!properties ||
                (properties?.length === 0 && (
                    <Flex
                        my='5'
                        justifyContent='center'
                        alignItems='center'
                        flexDir='column'
                    >
                        <NotFound />
                    </Flex>
                ))}
        </Box>
    );
}

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await fetchApi(`${baseUrl}/properties/list`, null, null, {
        locationExternalIDs,
        purpose,
        rentFrequency,
        minPrice,
        maxPrice,
        roomsMin,
        bathsMin,
        sort,
        areaMax,
        categoryExternalID,
    });

    return {
        props: {
            properties: data.hits,
        },
    };
}
