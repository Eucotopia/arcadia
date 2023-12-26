import React, {ChangeEvent, useMemo, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Input, Checkbox, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem,
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
import {useLoginMutation} from "@/features/api/authApi";
import {useAuth} from "@/hooks/useAuth";
import {NavbarContent} from "@nextui-org/navbar";
import {Simulate} from "react-dom/test-utils";

export default function App() {
    const {currentUser} = useAuth()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const dispatch = useAppDispatch()

    const [formState, setFormState] = useState<LoginRequest>({
        username: '',
        password: '',
    })
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const [login, {isLoading}] = useLoginMutation()
    const isInvalid = useMemo(() => {
        if (formState.username === "") return false;
        return !validateEmail(formState.username);
    }, [formState.username]);

    const [isVisible, setIsVisible] = useState(false);
    const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({
        ...prev,
        [name]: value
    }))


    return (
        <>
            {
                currentUser ?
                    (
                        //TODO 需要完善
                        <NavbarContent as="div" justify="end">
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="success"
                                        name={currentUser.nickname}
                                        size={"sm"}
                                        src={currentUser.image}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">{currentUser.nickname}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">My Settings</DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">Analytics</DropdownItem>
                                    <DropdownItem key="system">System</DropdownItem>
                                    <DropdownItem key="configurations">Configurations</DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                    <DropdownItem key="logout" color="danger" onClick={() => {
                                        dispatch(setCredentials(null))
                                    }}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarContent>) :
                    (
                        <Button
                            variant="shadow"
                            size="sm"
                            onPress={onOpen}
                            color="primary"
                        >Login</Button>
                    )
            }
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton
                placement="top-center"
            >
                <ModalContent>
                    {(onClose: any) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 items-center">Log in Eucotopia</ModalHeader>
                            <ModalBody>
                                <form
                                    className="flex flex-col gap-4 h-[300px]"
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            const user = await login(formState).unwrap()
                                            dispatch(setCredentials(user?.data))
                                            onClose()
                                        }
                                    }}>
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
                                            onClick={async () => {
                                                const user = await login(formState).unwrap()
                                                dispatch(setCredentials(user?.data))
                                                onClose()
                                            }}
                                            isLoading={isLoading}
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
