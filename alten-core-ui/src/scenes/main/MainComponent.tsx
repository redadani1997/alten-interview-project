import { Alert, Paper, Text } from '@mantine/core';
import classNames from 'classnames';
import CommonStyles from 'common/styles/CommonStyles';
import { BrowserRouter } from 'react-router-dom';
import CommonLoader from 'scenes/common/loading/CommonLoader';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import UnRestrictedHeader from './header/UnRestrictedHeader';
import CommonRoutes from './routes/CommonRoutes';

interface MainComponentProps {
    isHealthCheckPending: boolean;
    retryCount: number;
    errorMessage: string;
}

function computeFontSize(isSmall, isMedium) {
    if (isSmall) {
        return 25;
    }
    if (isMedium) {
        return 27;
    }
    return 32;
}

function computeWidth(isSmall, isMedium) {
    if (isSmall) {
        return 'w-full mx-2';
    }
    if (isMedium) {
        return 'w-2/3';
    }
    return 'w-1/2';
}

function renderMainBody(
    isHealthCheckPending: boolean,
    retryCount: number,
    isSmall,
    isMedium,
) {
    if (isHealthCheckPending) {
        if (retryCount === 0) {
            return <LoadingSpinner isLoading />;
        } else if (retryCount < 14) {
            return (
                <div className="h-full w-full flex flex-col">
                    <div className="h-16 w-full">
                        <UnRestrictedHeader />
                    </div>
                    <CommonScrollArea className="w-full h-full">
                        <div className="w-full h-full flex items-center justify-center">
                            <div
                                className={classNames(
                                    'h-1/2',
                                    computeWidth(isSmall, isMedium),
                                )}
                            >
                                <Alert radius="md">
                                    <div className="flex flex-col items-center">
                                        <Text
                                            fz={computeFontSize(
                                                isSmall,
                                                isMedium,
                                            )}
                                            className="text-center"
                                        >
                                            Initializing Alten Project, thanks
                                            for waiting...
                                        </Text>

                                        <CommonLoader
                                            className="pt-5"
                                            type="bars"
                                            loaderSize="lg"
                                        />
                                    </div>
                                </Alert>
                            </div>
                        </div>
                    </CommonScrollArea>
                </div>
            );
        }
        return (
            <div className="h-full w-full flex flex-col">
                <div className="h-16 w-full">
                    <UnRestrictedHeader />
                </div>
                <CommonScrollArea className="w-full h-full">
                    <div className="w-full h-full flex items-center justify-center">
                        <div
                            className={classNames(
                                'h-1/2',
                                computeWidth(isSmall, isMedium),
                            )}
                        >
                            <Alert radius="md" color="red">
                                <div className="flex flex-col items-center">
                                    <Text
                                        fz={computeFontSize(isSmall, isMedium)}
                                        className="text-center"
                                    >
                                        Initializing Alten Project, thanks for
                                        waiting...
                                    </Text>
                                    <Text className="text-center italic pt-2">
                                        It seems like its taking longer than
                                        usual. If the application fails to
                                        initialize, verify the Alten Project
                                        Server logs and rerun the application.
                                    </Text>

                                    <CommonLoader
                                        className="pt-5"
                                        type="bars"
                                        loaderSize="lg"
                                        color="red"
                                    />
                                </div>
                            </Alert>
                        </div>
                    </div>
                </CommonScrollArea>
            </div>
        );
    } else {
        return (
            <BrowserRouter>
                <CommonRoutes />
            </BrowserRouter>
        );
    }
}

const MainComponent = ({
    isHealthCheckPending,
    retryCount,
}: MainComponentProps) => {
    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });
    const isMedium = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.MEDIUM_END})`,
    });
    return (
        <Paper className="h-full rounded-none">
            {renderMainBody(
                isHealthCheckPending,
                retryCount,
                isSmall,
                isMedium,
            )}
        </Paper>
    );
};

export default MainComponent;
