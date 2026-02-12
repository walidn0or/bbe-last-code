"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Shield, Lock, Eye, UserCheck, Database, Globe, Mail } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function PrivacyPolicyPage() {
  const router = useRouter()

  const handleNavigation = (sectionId: string) => {
    const routes: Record<string, string> = {
      home: "/",
      about: "/about",
      programs: "/programs",
      news: "/news",
      impact: "/impact",
      contact: "/contact"
    }
    window.location.href = routes[sectionId] || "/"
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header activeSection="" scrollToSection={handleNavigation} />
        <main className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6">
              <Button variant="outline" onClick={() => router.back()}>← Back</Button>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600 text-lg">Last Updated: January 2025</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <p className="text-gray-700 leading-relaxed">
                  Beyond Borders Empowerment (&quot;BBE&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                  visit our website <strong>bbe.ngo</strong> and use our services.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By using our website, you consent to the data practices described in this policy.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">1. Information We Collect</h2>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1 Personal Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may collect personally identifiable information that you voluntarily provide when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Make a donation</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our contact form</li>
                  <li>Register for our programs or events</li>
                  <li>Apply for volunteer positions</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  This may include: name, email address, phone number, mailing address, payment information, and any other information you provide.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2 Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed">When you visit our website, we may automatically collect:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website addresses</li>
                  <li>Device identifiers</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">2. How We Use Your Information</h2>
                </div>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Process Donations:</strong> To process and acknowledge your charitable contributions</li>
                  <li><strong>Communication:</strong> To respond to inquiries and send updates about our programs</li>
                  <li><strong>Program Management:</strong> To manage registrations and participation</li>
                  <li><strong>Newsletter:</strong> To send periodic emails about our activities and impact</li>
                  <li><strong>Website Improvement:</strong> To analyze usage patterns and improve functionality</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">3. Information Sharing</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Service Providers:</strong> Trusted third-party providers who assist in operating our website and processing donations</li>
                  <li><strong>Legal Requirements:</strong> When required by law or in response to valid legal requests</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">4. Data Security</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure payment processing through trusted gateways</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication procedures</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">5. Your Privacy Rights</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Objection:</strong> Object to processing of your information</li>
                  <li><strong>Portability:</strong> Request transfer of your information</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise these rights, contact us at <a href="mailto:info@bbe.ngo" className="text-red-600 hover:text-red-700">info@bbe.ngo</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website is not intended for children under 13. We do not knowingly collect information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed">
                  BBE is based in the United Kingdom. Your information may be transferred to and processed in countries with different data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. GDPR Compliance</h2>
                <p className="text-gray-700 leading-relaxed">
                  For users in the EEA, we comply with GDPR. Our legal bases for processing include consent, contract, legal obligation, and legitimate interests.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">10. Contact Us</h2>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg mt-4">
                  <p className="text-gray-800 font-semibold mb-2">Beyond Borders Empowerment</p>
                  <p className="text-gray-700">Email: <a href="mailto:info@bbe.ngo" className="text-red-600 hover:text-red-700">info@bbe.ngo</a></p>
                  <p className="text-gray-700">Location: London, United Kingdom</p>
                  <p className="text-gray-700">Companies House: 15570506</p>
                </div>
              </section>
            </div>

            <div className="mt-12 p-6 bg-red-50 rounded-xl text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About Your Privacy?</h3>
              <p className="text-gray-700 mb-4">We&apos;re here to help. Contact us anytime.</p>
              <Button onClick={() => router.push('/contact')} className="bg-red-600 hover:bg-red-700 text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </main>
        <Footer scrollToSection={handleNavigation} />
      </div>
    </LanguageProvider>
  )
}