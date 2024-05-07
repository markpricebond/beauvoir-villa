'use client';
import { NavBar } from '@app/components/Layout/NavBar/NavBar';
import { Logo } from '@app/components/Logo/Logo';
import useScrollPosition from '@app/utils/scroll-position';
import testIds from '@app/utils/test-ids';
import classNames from 'classnames';

const Header = () => {
  const scrollPosition = useScrollPosition();

  return (
    <header
      className={classNames(
        scrollPosition < 385
          ? 'bg-transparent border-transparent'
          : 'bg-black border-white',
        'sm:px-8 w-full flex sm:items-center fixed  z-50 h-20 justify-between py-4 bg-black duration-1000 transition-all ease-in-out border-b'
      )}
      data-testid={testIds.LAYOUT.HEADER}
    >
      <a
        href="/"
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6"
      >
        <Logo className="w-1/3 h-1/3 my-4 fill-white" />
      </a>
      <div>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
