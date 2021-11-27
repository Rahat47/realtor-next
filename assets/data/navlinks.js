import { FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';


export const navlinks = [
    {
        id: 'home',
        name: 'Home',
        url: '/',
        Icon: <FcHome />,
    },
    {
        id: 'search',
        name: 'Search',
        url: '/search',
        Icon: <BsSearch />,
    },
    {
        id: 'for-sale',
        name: 'For Sale',
        url: '/search?purpose=for-sale',
        Icon: <FcAbout />,
    },
    {
        id: 'for-rent',
        name: 'For Rent',
        url: '/search?purpose=for-rent',
        Icon: <FiKey />,
    }
]