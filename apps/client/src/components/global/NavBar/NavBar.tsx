import { Link } from '@tanstack/react-router'
import { SlMagnifier } from 'react-icons/sl'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { useSearch } from '../../../hooks/useSearch'
import { useRef } from 'react'

const NavBar = () => {
  const { setSearch } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    if (inputRef.current) {
      const currentPath = window.location.pathname
      setSearch(currentPath, inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  const handleResetSearch = () => {
    const currentPath = window.location.pathname
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setSearch(currentPath, '')
  }

  return (
    <nav className="bg-black text-white fixed top-0 w-full z-50 p-4">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex">
          <span className="text-lg font-bold pr-4">STORE</span>
          <div className="flex justify-center items-center gap-4 text-sm text-[var(--color-primary)]">
            <Link
              to="/"
              onClick={handleResetSearch}
              className="hover:text-white hover:underline"
            >
              All
            </Link>
          </div>
        </div>

        <div className="flex w-80 items-center gap-2 bg-gray-800 py-1 rounded-md p-4">
          <div className="flex flex-row justify-around w-full">
            <input
              type="text"
              ref={inputRef}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for products..."
              className="bg-transparent text-sm focus:outline-none text-white placeholder-gray-500"
            />
            <button
              className="text-gray-500 hover:text-white"
              onClick={handleSearch}
            >
              <SlMagnifier />
            </button>
          </div>
        </div>

        <button className="text-gray-500 hover:text-white ml-4">
          <HiOutlineShoppingCart size={22} color="white" />
        </button>
      </div>
    </nav>
  )
}

export default NavBar
