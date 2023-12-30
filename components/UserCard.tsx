import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button, User} from "@nextui-org/react";
import {UserTwitterCard} from "./UserTwitterCard";

export default function UserCard() {
    return (
        <Popover showArrow placement="bottom">
            <PopoverTrigger>
                <User
                    as="button"
                    name="Zoe Lang"
                    description="Product Designer"
                    className="transition-transform"
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                    }}
                />
            </PopoverTrigger>
            <PopoverContent className="p-1">
                <UserTwitterCard/>
            </PopoverContent>
        </Popover>
    );
}