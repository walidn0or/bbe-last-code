"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Building2, ExternalLink, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export function Footer({ scrollToSection }: FooterProps) {
  const { t, isRTL } = useLanguage()

  const navigationLinks = [
    { name: t("header.home"), href: "/" },
    { name: t("header.about"), href: "/about" },
    { name: t("header.programs"), href: "/programs" },
    { name: t("header.news"), href: "/news" },
    { name: t("header.impact"), href: "/impact" },
    { name: t("header.contact"), href: "/contact" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61571567423972",
      icon: Facebook,
      color: "hover:text-blue-600"
    },
    {
      name: "WhatsApp",
      href: "https://chat.whatsapp.com/F05juiisyoi0S99QRf40I7",
      icon: MessageCircle,
      color: "hover:text-green-500"
    },
    {
      name: "Twitter",
      href: "https://twitter.com/bbe_foundation",
      icon: Twitter,
      color: "hover:text-blue-400"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/beyondbordersempowerment",
      icon: Instagram,
      color: "hover:text-pink-600"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/beyond-borders-empowerment",
      icon: Linkedin,
      color: "hover:text-blue-700"
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            
            {/* Organization Info */}
            <div className="lg:col-span-2">
              <div className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Image
                  src="/images/Beyond-Borders-Empowerment-logo-PNG.svg"
                  alt="Beyond Borders Empowerment Logo"
                  width={60}
                  height={60}
                  className="w-16 h-16"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Beyond Borders Empowerment
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Registered UK Charity - Companies House: 15570506 | Charity Registration: 15570506
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Empowering marginalized communities through education, economic opportunities, 
                healthcare support, and humanitarian aid — with a special focus on women and girls.
              </p>

              {/* Addresses */}
              <div className="space-y-3 mb-6">
                <div className={`flex items-start gap-3 text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <MapPin className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold text-white mb-1">Main Address:</div>
                    <div>Pelican House,</div>
                    <div>144 Cambridge Heath Road,</div>
                    <div>Bethnal Green,</div>
                    <div>London, E1 5QJ</div>
                  </div>
                </div>
                <div className={`flex items-start gap-3 text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold text-white mb-1">Country Address:</div>
                    <div>House No. 4, 10th District,</div>
                    <div>Shahe-e-Naw, Kabul, Afghanistan</div>
                  </div>
                </div>
                <div className={`flex items-center gap-3 text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <a href="mailto:info@bbe.ngo" className="text-sm hover:text-white transition-colors">
                    info@bbe.ngo
                  </a>
                </div>
              </div>

              {/* Support Us Section */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-white mb-3">{t("footer.supportUs")}</h4>
                <div className="space-y-2">
                  <a 
                    href="https://gofundme.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 hover:scale-105">
                      <Heart className="h-4 w-4 mr-2" />
                      {t("footer.goFundMe")}
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">{t("footer.quickLinks")}</h4>
              <nav className="space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Programs & Services */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">{t("footer.ourPrograms")}</h4>
              <div className="space-y-3">
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">{t("footer.virtualEducation")}</div>
                  <div>{t("footer.virtualEducationStat")}</div>
                </div>
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">{t("footer.orphanSupport")}</div>
                  <div>{t("footer.orphanSupportStat")}</div>
                </div>
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">{t("footer.womenEmpowerment")}</div>
                  <div>{t("footer.womenEmpowermentStat")}</div>
                </div>
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">{t("footer.emergencyRelief")}</div>
                  <div>{t("footer.emergencyReliefStat")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col gap-6">
            {/* Social Media Links - Above the line */}
            <div className="text-center">
              <h4 className="text-sm font-semibold text-white mb-4">
                {t("footer.followOurJourney")}
              </h4>
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-gray-600 ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-700"></div>

            {/* Copyright & Legal - Bottom Right */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1"></div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">
                  {t("footer.copyrightLine")}
                </p>
                <p className="text-gray-500 text-xs mb-2">
                  {t("footer.registrationLine")}
                </p>
                <div className="flex items-center justify-end gap-4 text-xs">
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    {t("footer.privacy")}
                  </Link>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    {t("footer.terms")}
                  </Link>
                  <a 
                    href="https://find-and-update.company-information.service.gov.uk/company/15570506"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {t("footer.companiesHouse")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Enhanced Social Links Component for use in other sections
export function SocialLinks() {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/beyondbordersempowerment",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      href: "https://twitter.com/bbe_foundation",
      icon: Twitter,
      color: "bg-blue-400 hover:bg-blue-500"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/beyondbordersempowerment",
      icon: Instagram,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/beyond-borders-empowerment",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800"
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Stay Connected
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow our journey and stay updated on our latest programs, success stories, and impact
          </p>
          
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl ${social.color}`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Join our community of supporters making a difference
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
