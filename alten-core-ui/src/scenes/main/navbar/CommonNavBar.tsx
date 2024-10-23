import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import CommonNavBarComponent from './CommonNavBarComponent';

interface CommonNavBarProps {
    opened: boolean;
}

const CommonNavBar = (props: CommonNavBarProps) => {
    // Map State To Props
    const { activeLink } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    return (
        <>
            <CommonNavBarComponent
                opened={props.opened}
                activeLink={activeLink}
            />
        </>
    );
};

export default CommonNavBar;