import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, 
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import {useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import {useNavigate} from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const {logout} = useLogout();

    const handleLogoutClick = () =>{
        logout();
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
      ];

      const { user } = useAuthContext();
    return (
        
        <Navbar isBordered maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
                <p className="font-bold text-inherit">HOME</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                <Link color="foreground" href="#">
                    Features
                </Link>
                </NavbarItem>
                <NavbarItem isActive>
                <Link aria-current="page" href="#">
                    Customers
                </Link>
                </NavbarItem>
                <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {!user &&
                <NavbarItem>
                <Button onClick={() => navigate('/signin')} color="primary" variant="flat">
                    Sign In
                </Button>
                </NavbarItem>
                }
                {user &&
                    <NavbarItem>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                            <Avatar
                                isBordered
                                color = "primary"
                                showFallback
                                name = {user.username.charAt(0).toUpperCase()}
                                as="button"
                                className="transition-transform"
                            />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="logout" color="danger" className="text-danger" onClick={handleLogoutClick}>
                                Log Out
                            </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                }
            </NavbarContent>
            <NavbarMenu>
            {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                className="w-full"
                color={
                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
                >
                {item}
                </Link>
            </NavbarMenuItem>
            ))}
        </NavbarMenu>
        </Navbar>
    );
}
 
export default NavBar;