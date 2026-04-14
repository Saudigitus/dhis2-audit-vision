import style from "../layout.module.css"
import { Center, CircularLoader } from "@dhis2/ui";
import { SimpleLayoutProps } from '../../../types/layout/LayoutProps';

export default function SimpleLayout(props: SimpleLayoutProps) {
    const { children, loading } = props;

    if (loading) {
        return (
            <Center>
                <CircularLoader />
            </Center>
        )
    }

    return (
        <div className={style.layoutContainer}>
            <main className={style.mainContentContainer}>{children}</main>
        </div>
    )
}
