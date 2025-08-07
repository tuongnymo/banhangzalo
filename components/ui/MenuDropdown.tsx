import Link from 'next/link'
const MenuDropdown = ({ title, items }) => (
  <div className="relative group">
    <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
      {title}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <div className="absolute left-0 mt-2 hidden w-48 bg-white rounded-md shadow-lg group-hover:block z-50">
      <ul className="py-2">
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="block px-4 py-2 hover:bg-gray-100">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default MenuDropdown;