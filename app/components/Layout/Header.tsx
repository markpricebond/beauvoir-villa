import { NavBar } from '@app/components/Layout/NavBar/NavBar';
import { Logo } from '@app/components/Logo/Logo';
import testIds from '@app/utils/test-ids';

const Header = () => (
  <header
    className="sm:px-8 w-full flex sm:items-center fixed z-50 h-20 justify-between py-4"
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

export default Header;
