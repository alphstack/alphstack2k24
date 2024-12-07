import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
  } from "@nextui-org/react";
  import { useState } from "react";
  import { useAuthContext } from "../hooks/useAuthContext";
  import { useLogout } from "../hooks/useLogout";
  import { useNavigate, useLocation  } from "react-router-dom";
  
  import { Shell } from "lucide-react";

  const NavBar = ({ navType = 0, setSlideIndex=()=>{} }) => {
    const navigate = useNavigate();
    const location = useLocation();
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

      const isActiveLink = (path) => {
        return location.pathname === path;
      };

    return (
        
        <Navbar isBordered maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
                <p className="font-bold text-inherit">HOME</p>
            </NavbarBrand>
            {navType==0 && <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isActiveLink("/")}>
          <Link color={isActiveLink("/") ? "" : "foreground"} aria-current="page" href="./">
            About
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActiveLink("/subscriptions")}>
          <Link color={isActiveLink("/subscriptions") ? "" : "foreground"} href="/subscriptions">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActiveLink("/contact")}>
          <Link color={isActiveLink("/contact") ? "" : "foreground"} href="/contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>}
            {navType==0 &&
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
                }
                {navType==1 && <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isActiveLink("/")}>
          <Link color={isActiveLink("/") ? "" : "foreground"} aria-current="page" href="./">
            Tasks
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActiveLink("/subscriptions")}>
          <Link color={isActiveLink("/AIchat") ? "" : "foreground"} href="/AIchat">
            Chat
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActiveLink("/contact")}>
          <Link color={isActiveLink("/calendar") ? "" : "foreground"} href="/calendar">
            Calendar
          </Link>
        </NavbarItem>
      </NavbarContent>}
                {navType==1 &&
            <NavbarContent justify="end">
                <NavbarItem>
                <Button onClick={() => setSlideIndex(1)} color="primary" variant="flat">
                    <Shell/>
                </Button>
                </NavbarItem>
            </NavbarContent>
            }
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
