import React, {ChangeEvent, useMemo, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Input, Checkbox,
} from "@nextui-org/react";
import {LoginRequest} from "@/types";
import {
    EyeFilledIcon,
    EyeSlashFilledIcon,
    MailIcon,
    SendFilledIcon
} from "@nextui-org/shared-icons";
import {Link} from "@nextui-org/link";
import {useAppDispatch} from "@/types/store";
import {setCredentials} from "@/features/auth/authSlice";

export default function App() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const dispatch = useAppDispatch()

    const [formState, setFormState] = useState<LoginRequest>({
        username: '',
        password: '',
    })
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = useMemo(() => {
        if (formState.username === "") return false;
        return !validateEmail(formState.username);
    }, [formState.username]);

    const [isVisible, setIsVisible] = useState(false);
    const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({
        ...prev,
        [name]: value
    }))

    const Login = async () => {
        dispatch(setCredentials({
            id: 1,
            nickname: "string",
            username: "string",
            token: "string",
            image: "string"
        }))
    }
    return (
        <>
            <Button
                variant="flat"
                className="text-sm font-normal text-default-600 bg-default-100"
                onPress={onOpen}
                color="primary"
            >Login</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton
                placement="top-center"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 items-center">Log in Eucotopia</ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-4 h-[300px]">
                                    <Input
                                        isRequired
                                        autoFocus
                                        label="Email"
                                        name={"username"}
                                        value={formState.username}
                                        errorMessage={isInvalid && "Please enter a valid email"}
                                        variant={"bordered"}
                                        onChange={handleChange}
                                        isInvalid={isInvalid}
                                        placeholder="Enter your username"
                                        endContent={
                                            <MailIcon
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                        }
                                        color={isInvalid ? "danger" : "success"}
                                        type="email"/>

                                    <Input
                                        endContent={
                                            <button className="focus:outline-none" type="button"
                                                    onClick={() => setIsVisible(!isVisible)}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon
                                                        className="text-2xl text-default-400 pointer-events-none"/>
                                                ) : (
                                                    <EyeFilledIcon
                                                        className="text-2xl text-default-400 pointer-events-none"/>
                                                )}
                                            </button>
                                        }
                                        label="Password"
                                        placeholder="Enter your password"
                                        name={"password"}
                                        value={formState.password}
                                        onChange={handleChange}
                                        type={isVisible ? "text" : "password"}
                                        variant="bordered"
                                    />
                                    <div className="flex py-2 px-1 justify-between">
                                        <Checkbox
                                            classNames={{
                                                label: "text-small",
                                            }}
                                        >
                                            Remember me
                                        </Checkbox>
                                        <Link color="primary" href="#" size="sm">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="flex gap-2 justify-center">
                                        <Button
                                            isIconOnly color="primary"
                                            variant={"shadow"}
                                            onClick={Login}
                                        >
                                            <SendFilledIcon/>
                                        </Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
