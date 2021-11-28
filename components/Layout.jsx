import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import ResponsiveNav from './ResponsiveNav';
import Footer from './Footer';
const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Real Estate Next</title>
            </Head>
            <Box maxW='1280px' m='auto'>
                <header>
                    <ResponsiveNav />
                </header>
                <main>{children}</main>
                <footer>
                    <Footer />
                </footer>
            </Box>
        </>
    );
};

export default Layout;
