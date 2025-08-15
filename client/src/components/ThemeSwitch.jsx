import React from 'react'
import { Moon, Sun } from 'lucide-react'
import useAppContext from '../context/AppContext'


const ThemeSwitch = () => {
  const { theme, setTheme } = useAppContext()
  
  const themeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  const isDark = theme === 'dark'
  
  return (
    <div className='fixed bottom-4 left-4 z-50'>
      <button
        onClick={themeToggle}
        className='group relative w-16 h-8 rounded-full bg-slate-200 transition-all duration-300 ease-out hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md data-[theme=dark]:bg-slate-800 data-[theme=dark]:hover:bg-slate-600'
        data-theme={theme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {/* Sliding indicator */}
        <span 
          className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
            isDark ? 'translate-x-8' : 'translate-x-0'
          }`}
        />
        
        {/* Sun icon */}
        <Sun 
          className={`absolute left-2 top-1/2 w-4 h-4 -translate-y-1/2 text-amber-500 transition-opacity duration-200 ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        
        {/* Moon icon */}
        <Moon 
          className={`absolute right-2 top-1/2 w-4 h-4 -translate-y-1/2 text-slate-600 transition-opacity duration-200 ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      </button>
    </div>
  )
}

export default ThemeSwitch