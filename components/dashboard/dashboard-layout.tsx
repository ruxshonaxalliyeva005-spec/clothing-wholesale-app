"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Cloud,
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Building2,
  FileText,
  CreditCard,
  Truck,
  Warehouse,
  PackageCheck,
  PackageX,
  RotateCcw,
  UserCircle,
  MessageSquare,
  Target,
  TrendingUp,
  ClipboardList,
  Factory,
  Calculator,
  Boxes,
  MapPin,
  ArrowRightLeft,
  BarChart,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState, useRef, useEffect, useCallback } from "react"

const crmItems = [
  { icon: Users, label: "Mijozlar", href: "/dashboard/customers" },
  { icon: UserCircle, label: "Kontaktlar", href: "/dashboard/contacts" },
  { icon: Target, label: "Leadlar", href: "/dashboard/leads" },
  { icon: MessageSquare, label: "Xabarlar", href: "/dashboard/messages" },
  { icon: TrendingUp, label: "Sotuvlar", href: "/dashboard/sales" },
]

const erpItems = [
  { icon: ShoppingCart, label: "Buyurtmalar", href: "/dashboard/orders" },
  { icon: Package, label: "Mahsulotlar", href: "/dashboard/products" },
  { icon: FileText, label: "Hisob-fakturalar", href: "/dashboard/invoices" },
  { icon: CreditCard, label: "To'lovlar", href: "/dashboard/payments" },
  { icon: Factory, label: "Ishlab chiqarish", href: "/dashboard/production" },
  { icon: Calculator, label: "Buxgalteriya", href: "/dashboard/accounting" },
  { icon: ClipboardList, label: "Hisobotlar", href: "/dashboard/reports" },
]

const wmsItems = [
  { icon: Warehouse, label: "Omborxona", href: "/dashboard/warehouse" },
  { icon: Boxes, label: "Inventar", href: "/dashboard/inventory" },
  { icon: PackageCheck, label: "Qabul qilish", href: "/dashboard/receiving" },
  { icon: Truck, label: "Yetkazib berish", href: "/dashboard/shipping" },
  { icon: MapPin, label: "Joylashuvlar", href: "/dashboard/locations" },
  { icon: ArrowRightLeft, label: "Harakatlar", href: "/dashboard/movements" },
  { icon: PackageX, label: "Qaytarishlar", href: "/dashboard/returns" },
  { icon: RotateCcw, label: "Inventarizatsiya", href: "/dashboard/stocktake" },
]

interface DropdownMenuProps {
  label: string
  items: { icon: React.ElementType; label: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

function DropdownMenu({ label, items, isOpen, onToggle, onClose }: DropdownMenuProps) {
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  const isActive = items.some(item => pathname === item.href)

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-all active:scale-95",
          isActive 
            ? "text-white" 
            : "text-gray-300 hover:text-white hover:bg-white/10"
        )}
      >
        {label}
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => {
            const isItemActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors active:scale-[0.98]",
                  isItemActive 
                    ? "bg-primary/20 text-primary" 
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const handleToggle = useCallback((menu: string) => {
    setOpenDropdown(prev => prev === menu ? null : menu)
  }, [])

  const handleClose = useCallback(() => {
    setOpenDropdown(null)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [userMenuOpen])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Logo & Navigation */}
          <div className="flex items-center gap-1">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md mr-2"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2 mr-6">
              <Cloud className="w-6 h-6 text-white" />
              <span className="text-lg font-bold text-white hidden sm:block">Cloud ERP</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-all active:scale-95",
                  pathname === "/dashboard" 
                    ? "text-white bg-white/10" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
              >
                Dashboard
              </Link>

              <DropdownMenu 
                label="CRM"
                items={crmItems}
                isOpen={openDropdown === "crm"}
                onToggle={() => handleToggle("crm")}
                onClose={handleClose}
              />

              <DropdownMenu 
                label="ERP"
                items={erpItems}
                isOpen={openDropdown === "erp"}
                onToggle={() => handleToggle("erp")}
                onClose={handleClose}
              />

              <DropdownMenu 
                label="WMS"
                items={wmsItems}
                isOpen={openDropdown === "wms"}
                onToggle={() => handleToggle("wms")}
                onClose={handleClose}
              />
            </nav>
          </div>

          {/* Right: Search, Notifications, User */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Qidirish..." 
                className="w-48 lg:w-64 pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:bg-gray-800 focus:border-gray-600"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors active:scale-95">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User Menu */}
            <div ref={userMenuRef} className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors active:scale-95"
              >
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-primary text-white text-xs">AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:block">admin</span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200 hidden sm:block",
                  userMenuOpen && "rotate-180"
                )} />
              </button>

              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">Administrator</p>
                    <p className="text-xs text-gray-400">admin@company.uz</p>
                  </div>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Sozlamalar
                  </Link>
                  <Link
                    href="/dashboard/reports"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <BarChart className="w-4 h-4" />
                    Hisobotlar
                  </Link>
                  <div className="border-t border-gray-700 mt-2 pt-2">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Chiqish
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 bg-gray-900 animate-in slide-in-from-top duration-200">
            <nav className="p-4 space-y-4">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                  pathname === "/dashboard" 
                    ? "bg-primary/20 text-primary" 
                    : "text-gray-300 hover:bg-white/10"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {/* CRM Section */}
              <div>
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">CRM</p>
                {crmItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all",
                      pathname === item.href 
                        ? "bg-primary/20 text-primary" 
                        : "text-gray-300 hover:bg-white/10"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* ERP Section */}
              <div>
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">ERP</p>
                {erpItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all",
                      pathname === item.href 
                        ? "bg-primary/20 text-primary" 
                        : "text-gray-300 hover:bg-white/10"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* WMS Section */}
              <div>
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">WMS</p>
                {wmsItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all",
                      pathname === item.href 
                        ? "bg-primary/20 text-primary" 
                        : "text-gray-300 hover:bg-white/10"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="p-4 lg:p-6">
        {children}
      </main>
    </div>
  )
}
