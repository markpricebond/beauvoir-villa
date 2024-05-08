import { NavLink } from './NavLink';
import { useCallback, useState } from 'react';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@app/components/Logo/Logo';
import { Hamburger } from './Hamburger';
import classNames from 'classnames';

const navbarItems = [
  { ref: '/', label: 'Home' },
  { ref: '/#about', label: 'About' },
  { ref: '/rooms', label: 'Rooms' },
  { ref: '/availability', label: 'Availability' },
  { ref: '/contact', label: 'Contact' },
];

const StyledNavLink = ({
  isActive,
  className,
  ...linkProps
}: LinkProps & {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavLink
    className={`${className ?? ''} ${isActive ? 'active-btn' : 'md:btn-main'}`}
    {...linkProps}
  />
);

export function NavBar() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);
  const toggleOpen = useCallback(
    () => setIsMenuShown(!isMenuShown),
    [isMenuShown]
  );

  return (
    <>
      <Hamburger showMenu={isMenuShown} handleToggle={toggleOpen} />
      <nav
        className={classNames(
          isMenuShown ? 'block' : 'hidden',
          'max-md:h-screen z-40 right-0 top-0 md:top-4 md:right-8 absolute',
          'pr-8 pl-6 pb-8 pt-10',
          'bg-black md:rounded-md'
        )}
      >
        <ul className="flex flex-col items-center md:items-start gap-8 max-sm:pt-8">
          {navbarItems.map(({ ref, label }) => (
            <li key={ref} className="relative">
              <StyledNavLink
                isActive={ref === linkRef}
                href={ref}
                onClick={() => {
                  setLinkRef(ref);
                  setIsMenuShown(false);
                }}
              >
                {label}
              </StyledNavLink>
            </li>
          ))}
          <Logo className="block md:hidden w-1/2 h-1/2 mt-8 mix-blend-difference" />
        </ul>
      </nav>
    </>
  );
}
