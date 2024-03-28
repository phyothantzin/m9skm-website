interface Props {
  href: string;
  title: string;
}

const NavLink = ({ href, title }: Props) => {
  return (
    <a
      href={href}
      className="block py-2 pl-3 pr-4 text-black text-sm lg:text-lg rounded md:p-0 hover:text-[#F2ECC7]"
    >
      {title}
    </a>
  );
};

export default NavLink;
