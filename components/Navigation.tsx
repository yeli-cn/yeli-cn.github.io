import Link from "next/link"


type Props = {
  tabs: Array<{ name: string, href: string, current?: boolean }>
}


export const Navigation = ({ tabs }: Props) => (
  <nav className="w-9/12 m-auto mt-8 mb-8">
    <ul>
      {tabs.map(tab => (
        <li className="inline-block w-10 h-10 border-2 border-red border-opacity-40 mr-10 relative" key={tab.name}>
          <div className="top-5 left-3 absolute text-gray-800 text-xl font-bold z-10">
            <Link href={tab.href}>{String(tab.name).toUpperCase()}</Link>
          </div>
        </li>
      ))}
    </ul>
  </nav>
)
