// import React, { useState } from 'react'
// import Sidebar from './components/Sidebar'
// import { Routes, Route } from 'react-router-dom'
// import Credits from './pages/Credits'
// import Community from './pages/Community'
// import ChatBox from './components/ChatBox'
// import { assets } from './assets/assets'
// import './assets/prism.css'
// const App = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   return (
//     <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white min-h-screen flex">
//       {/* Mobile Menu Icon */}
//       {!isMenuOpen && (
//         <img
//           src={assets.menu_icon}
//           alt="menu"
//           className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-50"
//           onClick={() => setIsMenuOpen(true)}
//         />
//       )}

//       {/* Sidebar + Main content */}
//       <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

//       <div className="flex-1 overflow-y-auto">
//         <Routes>
//           <Route path="/" element={<ChatBox />} />
//           <Route path="/credits" element={<Credits />} />
//           <Route path="/community" element={<Community />} />
//         </Routes>
//       </div>
//     </div>
//   )
// }

// export default App

// import React, { useState } from 'react'
// import Sidebar from './components/Sidebar'
// import { Routes, Route, useLocation } from 'react-router-dom'
// import Credits from './pages/Credits'
// import Community from './pages/Community'
// import ChatBox from './components/ChatBox'
// import { assets } from './assets/assets'
// import './assets/prism.css'
// import Loading from './pages/Loading'
// import { useAppContext } from './context/AppContext'
// import Login from './pages/Login'

// const App = () => {

//   const{user} = useAppContext()

//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const {pathname}=useLocation()

//   if(pathname === '/loading') return <Loading/>

//   return (
//     // Outer div ko flex container banaya aur height fix ki 👇
   
//    {user ? (

//        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white h-screen flex w-screen"> 
      
//       {/* Mobile Menu Icon (Same) */}
//       {!isMenuOpen && (
//         <img
//           src={assets.menu_icon}
//           alt="menu"
//           className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-50"
//           onClick={() => setIsMenuOpen(true)}
//         />
//       )}

//       {/* Sidebar + Main content (Same) */}
//       <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

//       {/* Main Content Area: Yeh ChatBox ko poora available space dega */}
//       <div className="flex-1 flex flex-col overflow-y-auto"> 
//         <Routes>
//           <Route path="/" element={<ChatBox />} />
//           <Route path="/credits" element={<Credits />} />
//           <Route path="/community" element={<Community />} />
//         </Routes>
//       </div>
//     </div>

//    ) : (
//          <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
//           <Login/>
//          </div>
//    ) }
   
   
//   )
// }

// export default App

import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Credits from './pages/Credits'
import Community from './pages/Community'
import ChatBox from './components/ChatBox'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'

const App = () => {

  const {user} = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()

  if(pathname === '/loading') return <Loading/>

  // Fix: return statement ke turant baad parenthesis open kiya
  return ( 
    user ? (

        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white h-screen flex w-screen"> 
          
          {/* Mobile Menu Icon */}
          {!isMenuOpen && (
            <img
              src={assets.menu_icon}
              alt="menu"
              className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-50"
              onClick={() => setIsMenuOpen(true)}
            />
          )}

          {/* Sidebar + Main content */}
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Main Content Area: flex-1 aur flex-col */}
          <div className="flex-1 flex flex-col overflow-y-auto"> 
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </div>
        </div>

    ) : (
      // Login Page view (Logout state)
      <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
        <Login/>
      </div>
    )
  )
}

export default App