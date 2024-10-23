import { Navbar } from '@mantine/core';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import { ActiveLink } from '.';
import NavbarPrimaryPage from './primary/NavbarPrimaryPage';
import NavbarUser from './user/NavbarUser';

interface CommonNavBarComponentProps {
    activeLink: ActiveLink;
    opened: boolean;
}

function CommonNavBarComponent({ opened }: CommonNavBarComponentProps) {
    return (
        <Navbar className="h-full">
            <div className="flex flex-col h-full w-full">
                <div className="flex-1">
                    <CommonScrollArea className="relative h-full w-full">
                        <NavbarPrimaryPage />
                    </CommonScrollArea>
                </div>
                <div className="h-auto max-h-40 overflow-hidden">
                    <NavbarUser opened={opened} />
                </div>
            </div>
        </Navbar>
    );
}
export default CommonNavBarComponent;
