import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { ActiveLink } from '../navbar';
import routeActions from '../navbar/redux/actions';
import CommonShell from '../shell/CommonShell';

interface CommonRoutesHocProps {
    children: any;
    activeLink: ActiveLink;
}

const CommonRoutesHoc = ({ children, activeLink }: CommonRoutesHocProps) => {
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            routeActions.setActiveLink({
                ...activeLink,
            }),
        );
    }, [location]);

    return (
        <CommonShell>
            <div
                key={location.pathname}
                className="w-full h-full flex flex-col"
            >
                {children}
            </div>
        </CommonShell>
    );
};

export default CommonRoutesHoc;
