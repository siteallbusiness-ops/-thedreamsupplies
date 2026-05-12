'use client'
import { useState } from 'react'
import { ChevronDown, Tag } from 'lucide-react'
import Link from 'next/link'

const nav = [
  {
    label: 'Pound Lines & More', badge: '50p–£1', color: 'text-orange-500',
    href: '/products?category=Clearance',
    sub: [
      { label: '50p Lines',          href: '/products?category=Clearance' },
      { label: '75p Lines',          href: '/products?category=Clearance' },
      { label: '£1 Lines',           href: '/products?category=Clearance' },
      { label: '£2 Lines',           href: '/products?category=Clearance' },
      { label: 'Clearance Grab Bags',href: '/products?category=Clearance' },
    ],
  },
  {
    label: 'Home & Garden', href: '/products?category=Home+%26+Garden',
    sub: [
      { label: 'Kitchen',   href: '/products?category=Home+%26+Garden' },
      { label: 'Bathroom',  href: '/products?category=Home+%26+Garden' },
      { label: 'Bedroom',   href: '/products?category=Home+%26+Garden' },
      { label: 'Garden',    href: '/products?category=Home+%26+Garden' },
      { label: 'DIY & Tools', href: '/products?category=Home+%26+Garden' },
      { label: 'Electrical',  href: '/products?category=Home+%26+Garden' },
      { label: 'Storage',     href: '/products?category=Home+%26+Garden' },
    ],
  },
  {
    label: 'Health & Beauty', href: '/products?category=Health+%26+Beauty',
    sub: [
      { label: 'Skincare',       href: '/products?category=Health+%26+Beauty' },
      { label: 'Hair Care',      href: '/products?category=Health+%26+Beauty' },
      { label: 'Oral Care',      href: '/products?category=Health+%26+Beauty' },
      { label: 'Baby Products',  href: '/products?category=Health+%26+Beauty' },
      { label: "Men's Grooming", href: '/products?category=Health+%26+Beauty' },
      { label: 'First Aid',      href: '/products?category=Health+%26+Beauty' },
    ],
  },
  {
    label: 'Stationery', href: '/products?category=Stationery',
    sub: [
      { label: 'Pens & Pencils',     href: '/products?category=Stationery' },
      { label: 'Notebooks',          href: '/products?category=Stationery' },
      { label: 'Art Supplies',       href: '/products?category=Stationery' },
      { label: 'Office Essentials',  href: '/products?category=Stationery' },
      { label: 'Gift Wrap & Cards',  href: '/products?category=Stationery' },
    ],
  },
  {
    label: 'Toys & Games', href: '/products?category=Toys+%26+Games',
    sub: [
      { label: 'Educational',   href: '/products?category=Toys+%26+Games' },
      { label: 'Outdoor Toys',  href: '/products?category=Toys+%26+Games' },
      { label: 'Board Games',   href: '/products?category=Toys+%26+Games' },
      { label: 'Action Figures',href: '/products?category=Toys+%26+Games' },
      { label: 'Arts & Crafts', href: '/products?category=Toys+%26+Games' },
      { label: 'Puzzles',       href: '/products?category=Toys+%26+Games' },
    ],
  },
  {
    label: 'Clothing', href: '/products?category=Clothing',
    sub: [
      { label: 'Accessories',    href: '/products?category=Clothing' },
      { label: 'Socks & Hosiery',href: '/products?category=Clothing' },
      { label: 'Hats & Gloves',  href: '/products?category=Clothing' },
      { label: 'Underwear',      href: '/products?category=Clothing' },
    ],
  },
  {
    label: 'Food & Drink', href: '/products?category=Food+%26+Drink',
    sub: [
      { label: 'Sweets & Candy',  href: '/products?category=Food+%26+Drink' },
      { label: 'Crisps & Snacks', href: '/products?category=Food+%26+Drink' },
      { label: 'Biscuits',        href: '/products?category=Food+%26+Drink' },
      { label: 'Drinks & Juices', href: '/products?category=Food+%26+Drink' },
      { label: 'Confectionery',   href: '/products?category=Food+%26+Drink' },
    ],
  },
  {
    label: 'Pet & Leisure', href: '/products?category=Pet+%26+Leisure',
    sub: [
      { label: 'Dog Accessories', href: '/products?category=Pet+%26+Leisure' },
      { label: 'Cat Accessories', href: '/products?category=Pet+%26+Leisure' },
      { label: 'Motor',           href: '/products?category=Pet+%26+Leisure' },
      { label: 'Camping & Outdoor', href: '/products?category=Pet+%26+Leisure' },
    ],
  },
  {
    label: 'Party & Seasonal', href: '/products?category=Party+%26+Seasonal',
    sub: [
      { label: 'Party Supplies', href: '/products?category=Party+%26+Seasonal' },
      { label: 'Balloons',       href: '/products?category=Party+%26+Seasonal' },
      { label: 'Christmas',      href: '/products?category=Party+%26+Seasonal' },
      { label: 'Halloween',      href: '/products?category=Party+%26+Seasonal' },
      { label: 'Easter',         href: '/products?category=Party+%26+Seasonal' },
      { label: 'Summer',         href: '/products?category=Party+%26+Seasonal' },
    ],
  },
  {
    label: 'Cleaning & Hygiene', href: '/products?category=Home+%26+Garden',
    sub: [
      { label: 'Surface Cleaners',    href: '/products?category=Home+%26+Garden' },
      { label: 'Laundry',             href: '/products?category=Home+%26+Garden' },
      { label: 'Bleach & Disinfectant',href: '/products?category=Home+%26+Garden' },
      { label: 'Mops & Brushes',      href: '/products?category=Home+%26+Garden' },
    ],
  },
  {
    label: 'Pallet Deals', badge: 'BULK', color: 'text-teal-300',
    href: '/products?category=Pallet+Deals',
    sub: [
      { label: 'Mixed Pallets',           href: '/products?category=Pallet+Deals' },
      { label: 'Single Category Pallets', href: '/products?category=Pallet+Deals' },
      { label: 'Clearance Pallets',       href: '/products?category=Clearance' },
    ],
  },
  {
    label: 'Big Brands', href: '/products?category=Big+Brands',
    sub: [
      { label: 'Colgate',          href: '/products?category=Big+Brands' },
      { label: 'Persil',           href: '/products?category=Big+Brands' },
      { label: 'Fairy',            href: '/products?category=Big+Brands' },
      { label: 'Lynx',             href: '/products?category=Big+Brands' },
      { label: 'Head & Shoulders', href: '/products?category=Big+Brands' },
      { label: 'Dettol',           href: '/products?category=Big+Brands' },
    ],
  },
  {
    label: 'SALE', badge: 'HOT', color: 'text-red-400',
    href: '/products?category=Clearance',
    sub: [],
  },
]

export default function Navigation() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <nav className="bg-teal-800 hidden md:block relative z-40">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex flex-wrap items-center">
          {nav.map(item => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-3 text-[13px] font-medium text-white hover:bg-teal-700 transition-colors whitespace-nowrap"
              >
                <span className={(item as { color?: string }).color ?? ''}>{item.label}</span>
                {item.badge && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
                {item.sub.length > 0 && <ChevronDown size={13} className="opacity-60" />}
              </Link>

              {item.sub.length > 0 && active === item.label && (
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-b-xl min-w-[210px] border-t-2 border-orange-400 animate-fadeIn z-50">
                  {item.sub.map(s => (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 border-b border-gray-50 last:border-0"
                    >
                      <Tag size={11} className="text-teal-400" />
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
