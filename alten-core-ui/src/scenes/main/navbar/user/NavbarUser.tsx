import NavbarUserComponent from './NavbarUserComponent';

interface NavbarUserProps {
    opened: boolean;
}

const NavbarUser = ({ opened }: NavbarUserProps) => {
    return <NavbarUserComponent opened={opened} />;
};

export default NavbarUser;
