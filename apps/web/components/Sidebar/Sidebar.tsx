"use client";

import styles from "./Sidebar.module.css";
import Link, {LinkProps} from "next/link";
import {PropsWithChildren} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faClockRotateLeft, faChartSimple, faUser } from '@fortawesome/free-solid-svg-icons'
import {usePathname} from "next/navigation";
import {clsx} from "clsx";


export const Sidebar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <NavLink
                    href={"/discover"}
                    aria-label={"Discover"}>
                    <FontAwesomeIcon
                        icon={faHome}
                        size={"lg"}/>
                </NavLink>
                <NavLink
                    href={"/watchlist"}
                    aria-label={"Watchlist"}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        size={"lg"}/>
                </NavLink>
                <NavLink
                    href={"/history"}
                    aria-label={"History"}>
                    <FontAwesomeIcon
                        icon={faClockRotateLeft}
                        size={"lg"}/>
                </NavLink>
                <NavLink
                    href={"/statistics"}
                    aria-label={"Statistics"}>
                    <FontAwesomeIcon
                        icon={faChartSimple}
                        size={"lg"}/>
                </NavLink>
            </ul>
            <ul className={styles.ul}>
                <NavLink
                    href={"/profile"}
                    aria-label={"Profile"}>
                    <FontAwesomeIcon
                        icon={faUser}
                        size={"lg"}/>
                </NavLink>
            </ul>
        </nav>
    );
};

interface NavLinkProps extends PropsWithChildren, LinkProps {}

const NavLink = ({
     children,
     href,
     ...rest
}: NavLinkProps) => {
    const pathname = usePathname();
    const linkPathname = typeof href === "string" ? href : href.pathname ?? "/";
    const isActive = pathname.startsWith(linkPathname);

    return (
        <li className={styles.li}>
            <Link
                {...rest}
                href={href}
                className={clsx(styles.link, isActive && styles.link__active)}>
                <span>
                    {children}
                </span>
            </Link>
        </li>
    )
}