import { ActionIcon, Header, Text, useMantineColorScheme } from '@mantine/core';
import AltenProjectSymbol from 'assets/altenproject/AltenProjectSymbol.svg';
import CommonStyles from 'common/styles/CommonStyles';
import { CgWebsite } from 'react-icons/cg';
import { TbMoonStars, TbSun } from 'react-icons/tb';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';

const UnRestrictedHeader = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });

    return (
        <Header height={'100%'} className="w-full px-2">
            <CommonScrollArea className="h-full w-full">
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex items-center ml-4">
                        {!isSmall && (
                            <div className="flex h-6 justify-center items-center">
                                <img
                                    className="h-full"
                                    src={AltenProjectSymbol}
                                />
                            </div>
                        )}
                        <div className="pl-2 flex justify-center items-center">
                            <div className="text-center">
                                <Text
                                    variant="gradient"
                                    gradient={{
                                        from: 'violet',
                                        to: 'yellow',
                                        deg: 100,
                                    }}
                                    fw={1000}
                                    fz={20}
                                >
                                    Alten Project
                                </Text>
                            </div>
                        </div>
                        <ActionIcon
                            variant="default"
                            onClick={() => toggleColorScheme()}
                            size={30}
                            className="ml-3"
                        >
                            {colorScheme === 'light' ? (
                                <TbSun size={16} />
                            ) : (
                                <TbMoonStars size={16} />
                            )}
                        </ActionIcon>
                    </div>

                    {!isSmall && (
                        <div className="flex">
                            <ActionIcon
                                component="a"
                                target="_blank"
                                href="https://www.alten.com"
                                radius="md"
                                className="mx-1"
                                variant="outline"
                                size="2.2rem"
                                color="cyan"
                            >
                                <CgWebsite size="1.4rem" />
                            </ActionIcon>
                        </div>
                    )}
                </div>
            </CommonScrollArea>
        </Header>
    );
};

export default UnRestrictedHeader;
