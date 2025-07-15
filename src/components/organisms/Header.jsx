import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import LogoutButton from "@/components/molecules/LogoutButton";
const Header = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="h-5 w-5" />
          </Button>
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <ApperIcon name="Settings" className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <ApperIcon name="Bell" className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-700 font-medium text-sm">
              {user?.firstName?.[0] || user?.emailAddress?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user?.firstName || user?.emailAddress || 'User'}
          </span>
          <LogoutButton />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;