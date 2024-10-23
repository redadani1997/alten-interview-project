import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import NavbarPrimaryPageComponent from './NavbarPrimaryPageComponent';

const NavbarPrimaryPage = () => {
    // Map State To Props
    const { activeLink } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    return (
        <>
            <NavbarPrimaryPageComponent activeLink={activeLink} />
        </>
    );
};

export default NavbarPrimaryPage;
