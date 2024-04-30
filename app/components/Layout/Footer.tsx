import './footer.css';
import { Logo } from '@app/components/Logo/Logo';
import testIds from '@app/utils/test-ids';
import { FacebookIcon } from '../Icons/Facebook';

const Footer = () => (
  <footer
    className="font-site p-8 grid grid-cols-[1fr_2fr]"
    data-testid={testIds.LAYOUT.FOOTER}
  >
    <div className="col-start-1 flex flex-col gap-y-2">
      <Logo className="w-1/3 h-1/3" />
      <p className="text-xs ml-1">© 2024 Beauvoir Holiday Villa</p>
      {/* <h3>chezbeauvoir@gmail.com</h3> */}
      <a
        href="https://www.facebook.com/beauvoirboutenac/"
        target="__blank"
        className="mt-12"
      >
        <FacebookIcon />
      </a>
    </div>
  </footer>
);

export default Footer;
