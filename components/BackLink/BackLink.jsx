import { NavLink } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Link from "next/link";

const BackLink = (props) => {
    return (
        <Link href="/">
            <NavLink icon={<IconArrowLeft />} component="a" label="Back" />
        </Link>
    )
}

export default BackLink