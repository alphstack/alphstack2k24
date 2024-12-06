import {Checkbox, Button} from "@nextui-org/react";

const Home = () => {
    return (
        <div className="App">
            <div className="w-[50px] h-[50px] bg-gray-950">
                test
                <Checkbox defaultSelected>Option</Checkbox>
                <Button color="primary">Button</Button>
            </div>
        </div>
    );
}
 
export default Home