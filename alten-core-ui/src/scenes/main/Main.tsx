import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import settingsActions from 'scenes/settings/redux/actions';
import MainComponent from './MainComponent';

const Main = () => {
    // Map State To Props
    const { isHealthCheckPending } = useSelector((store: ReduxStore) => {
        return {
            isHealthCheckPending: store.settingsReducer.isHealthCheckPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const checkBackendHealth = () =>
        dispatch(settingsActions.checkBackendHealth());

    const retryCountRef = useRef(0);
    const [retryCount, setRetryCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string>(null);

    function doCheckBackendHealth() {
        checkBackendHealth().catch(err => {
            retryCountRef.current++;
            setRetryCount(retryCountRef.current);
            setErrorMessage(CommonUtils.getRestErrorMessage(err));
            setTimeout(() => {
                doCheckBackendHealth();
            }, 4000);
        });
    }

    useEffect(() => {
        doCheckBackendHealth();
    }, []);

    return (
        <MainComponent
            isHealthCheckPending={isHealthCheckPending}
            retryCount={retryCount}
            errorMessage={errorMessage}
        />
    );
};

export default Main;
