'use client'
import {title} from "@/components/primitives";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useAuth} from "@/hooks/useAuth";

export default function DocsPage() {
    const {currentUser} = useAuth();
    // const user = useAppSelector(state => state.auth.user);
    return (
        <div>
            {
                currentUser && <h1 className={title()}>Docs</h1>
            }
        </div>
    );
}
