import Title from "./Title";

interface NavigationHeaderProps {}

export default function NavigationHeader() {
  return (
    <nav className="flex items-center justify-between p-4 rounded mb-8">
      <Title />
      <ul className="flex justify-between w-1/2 text-steel-azure font-bold">
        <li className="mr-6">
          <a href="/" className="">
            Home
          </a>
        </li>
        <li className="hover:text-baltic-blue mr-6">
          <a href="#" className="hover:text-baltic-blue">
            Tandem Graph
          </a>
        </li>
        <li className="mr-6">
          <a href="#" className="hover:text-baltic-blue">
            View Database
          </a>
        </li>
        <li className="mr-6">
          <a href="/upload" className="hover:text-baltic-blue">
            Upload Data
          </a>
        </li>
      </ul>
    </nav>
  );
}
