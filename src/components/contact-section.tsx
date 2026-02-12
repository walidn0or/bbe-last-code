"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ContactSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function ContactSection({ scrollToSection }: ContactSectionProps) {
  const { t, isRTL } = useLanguage()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const firstName = String(formData.get("firstName") || "").trim()
    const lastName = String(formData.get("lastName") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const subject = String(formData.get("subject") || "").trim()
    const message = String(formData.get("message") || "").trim()

    if (!firstName || !lastName || !email || !subject || !message) {
      setError("Please fill in all required fields.")
      return
    }
    const emailOk = /.+@.+\..+/.test(email)
    if (!emailOk) {
      setError("Please enter a valid email address.")
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch(form.action || "https://formspree.io/f/xwpnaapj", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({} as { error?: string })))
        throw new Error(data?.error || "Submission failed. Please try again.")
      }
      setSuccess("Thanks! Your message has been sent.")
      form.reset()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: MessageCircle, label: "WhatsApp", href: "https://chat.whatsapp.com/F05juiisyoi0S99QRf40I7", color: "text-green-600 hover:text-green-700" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61571567423972", color: "text-blue-600 hover:text-blue-700" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/beyond-borders-empowerment/", color: "text-blue-700 hover:text-blue-800" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/beyondbordersempowerment?igsh=MTdmOGgyazY4MG02eg%3D%3D&utm_source=qr", color: "text-pink-600 hover:text-pink-700" },
  ]

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 bg-gray-900 text-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-lg md:text-xl opacity-90">{t("contact.subtitle")}</p>
        </div>
        <div
          className={`grid lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto ${isRTL ? "lg:grid-flow-col-dense" : ""}`}
        >
          <div className={`lg:col-span-1 ${isRTL ? "text-right" : ""}`}>
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">{t("contact.info")}</h3>
            <div className="space-y-4 md:space-y-6">
              <div
                className={`flex items-center space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.phone")}</p>
                  <p className="opacity-90 text-sm md:text-base">+44 7386 049334</p>
                </div>
              </div>
              <div
                className={`flex items-center space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.email")}</p>
                  <p className="opacity-90 text-sm md:text-base break-all">info@bbe.ngo</p>
                </div>
              </div>
            </div>

            <h4 className="text-lg md:text-xl font-bold mt-8 md:mt-12 mb-4 md:mb-6">{t("contact.offices")}</h4>
            <div className="space-y-4 md:space-y-6">
              <div
                className={`flex items-start space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.mainOffice")}</p>
                  <p className="opacity-90 text-xs md:text-sm">
                    Pelican House,<br />
                    144 Cambridge Heath Road,<br />
                    Bethnal Green,<br />
                    London, E1 5QJ
                  </p>
                </div>
              </div>
              <div
                className={`flex items-start space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.countryOffice")}</p>
                  <p className="opacity-90 text-xs md:text-sm">
                    House No. 4, 10th District,<br />
                    Shahe-e-Naw, Kabul, Afghanistan
                  </p>
                </div>
              </div>
            </div>

            <div className={`flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-8 ${isRTL ? "flex-row-reverse" : ""}`}>
              {socialLinks.map((social, index) => (
                <Button key={index} asChild variant="ghost" size="sm" className={`w-10 h-10 md:w-11 md:h-11 p-0 rounded-full ${social.color} transition-transform hover:scale-110`}>
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className={`text-xl md:text-2xl text-white ${isRTL ? "text-right" : ""}`}>
                  {t("contact.sendMessage")}
                </CardTitle>
                <p className={`text-gray-400 text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {t("contact.messageDesc")}
                </p>
              </CardHeader>
              <CardContent>
                <form action="https://formspree.io/f/xwpnaapj" method="POST" className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                        {t("donate.firstName")}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                        {t("donate.lastName")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                      {t("donate.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                      {t("contact.subject")}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                      {t("contact.message")}
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white resize-none transition-colors text-sm md:text-base"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 hover:scale-105 text-sm md:text-base py-2 md:py-3"
                  >
                    <Mail className={`h-4 w-4 md:h-5 md:w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {submitting ? "Sending..." : t("contact.sendBtn")}
                  </Button>
                  {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-3" role="alert" aria-live="polite">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-100 border border-green-300 text-green-700 rounded-lg p-3" role="status" aria-live="polite">
                      {success}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
