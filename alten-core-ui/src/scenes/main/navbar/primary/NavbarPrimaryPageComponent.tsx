import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { IoMdBasket } from 'react-icons/io';
import { MdManageAccounts, MdOutlineContactMail } from 'react-icons/md';

import { ActiveLink } from '..';
import CommonNavbarLink from '../common/CommonNavbarLink';

interface NavbarPrimaryPageComponentProps {
    activeLink: ActiveLink;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarPrimaryPageComponent({
    activeLink,
}: NavbarPrimaryPageComponentProps) {
    return (
        <div>
            <CommonNavbarLink
                activeLink={activeLink}
                icon={renderIcon(MdManageAccounts)}
                name="Admin"
                id="ADMIN"
                link="/admin"
            />

            <Divider />

            <CommonNavbarLink
                activeLink={activeLink}
                icon={renderIcon(IoMdBasket)}
                name="Basket"
                id="BASKET"
                link="/basket"
            />

            <Divider />

            <CommonNavbarLink
                activeLink={activeLink}
                icon={renderIcon(MdOutlineContactMail)}
                name="Contact"
                id="CONTACT"
                link="/contact"
            />
        </div>
    );
}

export default NavbarPrimaryPageComponent;
