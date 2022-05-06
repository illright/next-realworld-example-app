import Link from "next/link";
import { useRouter } from "next/router";
import type { ComponentPropsWithoutRef } from "react";

interface NavLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  as: string;
  children: React.ReactNode;
}

const NavLink = ({ href, as, children, ...restProps }: NavLinkProps) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <Link href={href} as={as} passHref>
      <a
        className={`nav-link ${
          encodeURIComponent(asPath) === encodeURIComponent(as) && `active`
          }`}
        {...restProps}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
