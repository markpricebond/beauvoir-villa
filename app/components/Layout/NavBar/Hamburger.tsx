import classNames from 'classnames';

export const Hamburger = ({
  showMenu,
  handleToggle,
}: {
  showMenu?: boolean;
  handleToggle: () => void;
}) => {
  const hamburgerLineClassName =
    'block h-[3px] w-6 transform transition duration-500 ease-in-out bg-white';
  return (
    <button className="relative z-50" onClick={handleToggle}>
      <div className="space-y-2 hover:bg-black hover:bg-opacity-60 p-2 rounded-md">
        <span
          className={classNames(
            showMenu && 'rotate-45 translate-y-[13px]',
            hamburgerLineClassName
          )}
        ></span>
        <span
          className={classNames(
            showMenu && 'opacity-0 h-0',
            hamburgerLineClassName
          )}
        ></span>
        <span
          className={classNames(
            showMenu && '-rotate-45 translate-y-[-13px]',
            hamburgerLineClassName
          )}
        ></span>
      </div>
    </button>
  );
};
