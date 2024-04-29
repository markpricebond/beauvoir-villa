import './footer.css';
import { Logo } from '@app/components/Logo/Logo';
import testIds from '@app/utils/test-ids';

const Footer = () => (
  <footer
    className="font-site p-14 flex flex-col gap-y-12"
    data-testid={testIds.LAYOUT.FOOTER}
  >
    <div className="grid grid-cols-3 items-center">
      <h3>chezbeauvoir@gmail.com</h3>
      <div className="justify-self-center">
        <Logo />
      </div>
      <a href="https://www.facebook.com/beauvoirboutenac/" target="__blank">
        <h3 className="text-right">Facebook</h3>
      </a>
    </div>
    <p className="text-xs justify-self-center text-center">
      © 2024 Beauvoir Holiday Villa
    </p>
  </footer>
);

export default Footer;
