import { Box, SimpleGrid } from '@chakra-ui/react';

import { baseUrl, fetchApi } from '../utils/fetchApi';
import HeroBanner from '../components/HeroBanner';
import PropertyCard from '../components/PropertyCard';

// const Banner = ({
//     purpose,
//     imageUrl,
//     title1,
//     title2,
//     desc1,
//     desc2,
//     linkName,
//     buttonText,
// }) => (
//     <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
//         <Image src={imageUrl} width={500} height={300} alt='Banner Product' />
//         <Box p='5'>
//             <Text color='gray.500' fontSize='sm' fontWeight='medium'>
//                 {purpose}
//             </Text>
//             <Text fontSize='3lx' fontWeight='bold'>
//                 {title1} <br /> {title2}
//             </Text>
//             <Text fontSize='lg' py='3' color='gray.700'>
//                 {desc1} <br /> {desc2}
//             </Text>

//             <Button fontSize='xl' bg='blue.300' color='white'>
//                 <Link href={linkName}>{buttonText}</Link>
//             </Button>
//         </Box>
//     </Flex>
// );

export default function Home({ propertiesForSale, propertiesForRent }) {
    return (
        <Box>
            <HeroBanner
                purpose='Rent A Home'
                title1='Rental Homes For'
                title2='Everyone'
                description='Explore Apartments, Villas, Homes and more'
                buttonText='Explore Renting'
                buttonUrl='/search?purpose=for-rent'
                imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
            />
            <SimpleGrid columns={[1, 1, 2, 3]} gap={10}>
                {propertiesForRent.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </SimpleGrid>

            <HeroBanner
                title1='Find, Buy & Own Your'
                title2='Dream Home'
                description='Explore Apartments, Villas, Homes and more'
                buttonText='Explore Buying'
                buttonUrl='/search?purpose=for-sale'
                imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
                purpose='Buy a Home'
            />
            <SimpleGrid columns={[1, 1, 2, 3]} gap={10}>
                {propertiesForSale.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </SimpleGrid>
        </Box>
    );
}

export async function getStaticProps() {
    const propertyForSale = await fetchApi(
        `${baseUrl}/properties/list`,
        null,
        null,
        {
            locationExternalIDs: '5002',
            purpose: 'for-sale',
            hitsPerPage: 6,
        }
    );

    const propertyForRent = await fetchApi(
        `${baseUrl}/properties/list`,
        null,
        null,
        {
            locationExternalIDs: '5002',
            purpose: 'for-rent',
            hitsPerPage: 6,
        }
    );

    return {
        props: {
            propertiesForSale: propertyForSale?.hits,
            propertiesForRent: propertyForRent?.hits,
        },
    };
}
