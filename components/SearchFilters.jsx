import { useEffect, useState } from 'react';
import {
    Flex,
    Select,
    Text,
    Box,
    Input,
    Spinner,
    Button,
    HStack,
    Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import NotFound from './NotFound';

export default function SearchFilters() {
    const [filters, setFilters] = useState(filterData);
    const [showLocations, setShowLocations] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [locationsData, setLocationsData] = useState([]);

    const router = useRouter();

    const searchProperties = filterValues => {
        const path = router.pathname;
        const query = router.query;

        const values = getFilterValues(filterValues);

        values.forEach(value => {
            query[value.name] = value.value;
        });

        router.push({
            pathname: path,
            query: query,
        });
    };

    useEffect(() => {
        // only fire this event after user stops typing
        if (searchTerm !== '') {
            setLoading(true);
            const fetchData = async () => {
                const data = await fetchApi(
                    `${baseUrl}/auto-complete`,
                    null,
                    null,
                    {
                        query: searchTerm,
                    }
                );
                setLocationsData(data?.hits);
                setLoading(false);
            };
            fetchData();
        }
    }, [searchTerm]);

    return (
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            <HStack wrap='wrap' justify='center' spacing={4}>
                {filters.map(filter => (
                    <Box key={filter.queryName} my={2}>
                        <Select
                            placeholder={filter.placeholder}
                            width='fit-content'
                            onChange={e =>
                                searchProperties({
                                    [filter.queryName]: e.target.value,
                                })
                            }
                        >
                            {filter?.items?.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                ))}
            </HStack>
            <Flex flexDir='column' mt='4'>
                <Button
                    onClick={() => setShowLocations(prev => !prev)}
                    colorScheme='twitter'
                    variant='outline'
                >
                    Search By Location
                </Button>
            </Flex>
            {showLocations && (
                <Flex flexDir='column' pos='relative' pt='4' ml='2'>
                    <Input
                        pos='relative'
                        placeholder='Search Location'
                        width='300px'
                        focusBorderColor='blue.500'
                        onChange={e => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />

                    {searchTerm !== '' && (
                        <Icon
                            as={MdCancel}
                            pos='absolute'
                            cursor='pointer'
                            right='5'
                            top='7'
                            zIndex={100}
                            onClick={() => setSearchTerm('')}
                        />
                    )}
                    {loading && <Spinner margin='auto' mt='3' />}
                    {showLocations && (
                        <Box height='300px' overflow='auto'>
                            {locationsData?.map(location => (
                                <Box
                                    onClick={() => {
                                        searchProperties({
                                            locationExternalIDs:
                                                location.externalID,
                                        });
                                        setShowLocations(false);
                                        setSearchTerm(location.name);
                                    }}
                                    key={location.id}
                                    my='2'
                                >
                                    <Text
                                        fontSize='sm'
                                        fontWeight='bold'
                                        cursor='pointer'
                                        color='blue.500'
                                    >
                                        {location.name}
                                    </Text>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {!loading && !locationsData.length && (
                        <NotFound
                            title='Waiting For Search'
                            message='Try to search for something...'
                        />
                    )}
                </Flex>
            )}
        </Flex>
    );
}
