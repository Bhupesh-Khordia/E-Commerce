import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [navOpen, setNavOpen] = useState(false);
  const { cartCount } = useContext(ShopContext);
  const { showSearch, setShowSearch, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <div>
        <Link to="/">
          <img
            onClick={() => setActiveLink("/")}
            src={assets.logo}
            alt="Logo"
            className="w-36"
          />
        </Link>
      </div>
      <div>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setActiveLink(item.path)}
              className="flex flex-col items-center gap-1"
            >
              <p
                className={
                  activeLink === item.path ? "text-black" : "text-gray-700"
                }
              >
                {item.name}
              </p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
                  activeLink === item.path ? "block" : "hidden"
                }`}
              />
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/collection"
          onClick={() => {
            setActiveLink("/collection");
            setShowSearch(true);
          }}
        >
          <img
            src={assets.search_icon}
            alt="search"
            className={`w-5 cursor-pointer`}
          />
        </Link>
        <div className="group relative">
          <img
            onClick={() => {
              token ? null : navigate("/login");
            }}
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />
          <div className="hidden group-hover:block absolute right-0 pt-4">
            {/* Dropdown */}
            {token && (
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {/* <p className="cursor-pointer hover:text-black">My Profile</p> */}
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
        <Link
          to="/cart"
          onClick={() => setActiveLink("/cart")}
          className="relative"
        >
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {cartCount}
          </p>
        </Link>
        <img
          onClick={() => {
            setNavOpen(true);
          }}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Navbar for Mobile screen only. */}
      <div
        className={`${
          navOpen ? "absolute" : "hidden"
        } top-0 right-0 bottom-0  bg-white w-full overflow-hidden transition-all`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => {
              setNavOpen(false);
            }}
          >
            <img
              src={assets.dropdown_icon}
              alt="back"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => {
              setNavOpen(false);
              setActiveLink("/");
            }}
            className={`py-3 pl-6 border-t border-gray-400 ${
              activeLink === "/" ? "bg-gray-800 text-white" : ""
            }`}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => {
              setNavOpen(false);
              setActiveLink("/collection");
            }}
            className={`py-3 pl-6 border-t border-gray-400 ${
              activeLink === "/collection" ? "bg-gray-800 text-white" : ""
            }`}
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => {
              setNavOpen(false);
              setActiveLink("/about");
            }}
            className={`py-3 pl-6 border-t border-gray-400 ${
              activeLink === "/about" ? "bg-gray-800 text-white" : ""
            }`}
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => {
              setNavOpen(false);
              setActiveLink("/contact");
            }}
            className={`py-3 pl-6 border-t border-gray-400 border-b ${
              activeLink === "/contact" ? "bg-gray-800 text-white" : ""
            }`}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
