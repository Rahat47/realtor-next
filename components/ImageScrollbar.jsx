import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
        <Flex justify='center' alignItems='center' mr='1'>
            <Icon
                onClick={() => scrollPrev()}
                as={FaArrowAltCircleLeft}
                fontSize='2xl'
                cursor='pointer'
                display={['none', 'none', 'none', 'block']}
            />
        </Flex>
    );
};

const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return (
        <Flex justify='center' alignItems='center' ml='1'>
            <Icon
                onClick={() => scrollNext()}
                as={FaArrowAltCircleRight}
                fontSize='2xl'
                cursor='pointer'
                display={['none', 'none', 'none', 'block']}
            />
        </Flex>
    );
};

const ImageScrollbar = ({ data }) => {
    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            style={{
                overflow: 'hidden',
            }}
        >
            {data?.map(image => (
                <Box
                    width='910px'
                    itemID={image.id}
                    overflow='hidden'
                    p='1'
                    key={image.id}
                >
                    <Image
                        title={image.title}
                        placeholder='blur'
                        blurDataURL={image.url}
                        src={image.url}
                        width={1000}
                        height={500}
                        alt={image.title}
                        sizes='(max-width:500px) 100px, (max-width:1024px) 400px, 1000px'
                    />
                </Box>
            ))}
        </ScrollMenu>
    );
};

export default ImageScrollbar;
