import Link from "next/link";
import React from "react";

interface CustomLinkProps {
  href: string;
  as: string;
  className?: string;
  children: React.ReactNode;
}

const CustomLink = ({ className, href, as, children, ...restProps }: CustomLinkProps) => (
  <Link href={href} as={as} passHref>
    <a className={className || ""} {...restProps}>{children}</a>
  </Link>
);

export default CustomLink;
