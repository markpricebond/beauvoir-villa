import { useCallback, useState } from 'react';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@app/components/Logo/Logo';
import { Hamburger } from './Hamburger';
import classNames from 'classnames';
import Link from 'next/link';

const navbarItems = [
  { slug: '/', label: 'Home' },
  { slug: '/#about', label: 'About' },
  { slug: '/rooms', label: 'Rooms' },
  { slug: '/availability', label: 'Availability' },
  { slug: '/contact', label: 'Contact' },
];

export function NavBar() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const pathname = usePathname();
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
          'max-md:h-screen z-60 right-0 top-0 md:top-4 md:right-8 absolute',
          'pr-8 pl-6 pb-8 pt-10',
          'bg-black md:rounded-md'
        )}
      >
        <ul className="flex flex-col items-center md:items-start gap-8 max-sm:pt-8">
          {navbarItems.map(({ slug, label }) => (
            <li key={slug} className="relative">
              <Link
                className={classNames(
                  pathname === slug && 'underline',
                  'btn-main'
                )}
                href={slug}
              >
                {label}
              </Link>
            </li>
          ))}
          <Logo className="block md:hidden w-1/2 h-1/2 mt-8 mix-blend-difference" />
        </ul>
      </nav>
    </>
  );
}
