import {
    Navbar,
    NavbarBrand,
    NavbarContent,
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
import { useNavigate, useLocation } from "react-router-dom";
import mainLogo from'../assets/AlphaStack(1).png';
const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100" style={{ height: 'calc(100vh - 96px)' }}>
            <div class="text-6xl" style={{fontFamily: "Avenir"}}>Turn every task into a milestone with</div>
            <img  src={mainLogo} alt="alphstack"/>
            <div className="flex space-x-8">
            <Button
              onClick={() => navigate("/signup")}
              color="primary"
              variant="ghost"
              size="lg"
            >
              Sign Up
            </Button>
            </div>
        </div>
    );
};

export default WelcomePage;