import Link from "next/link"


type Props = {
  tabs: Array<{ name: string, href: string, current?: boolean }>
}


export const Navigation = ({ tabs }: Props) => (
  <nav>
    <ul className="h-12 flex items-center">
      {tabs.map(tab => (
        <li className='flex-auto' key={tab.name}>
          <Link href={tab.href}>{tab.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
)
