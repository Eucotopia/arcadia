import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type LoginRequest = {
    username: string;
    password: string;
}

export type UserV0 = {
    id: number
    nickname: string
    username: string
    token: string
    image: string
}
