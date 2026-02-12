 "use client"

import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FileText, AlertCircle, Scale, Ban, DollarSign, Shield } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function TermsOfUsePage() {
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <FileText className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Use</h1>
              <p className="text-gray-600 text-lg">Last Updated: January 2025</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Beyond Borders Empowerment (&#34;BBE&#34;, &#34;we&#34;, &#34;us&#34;, or &#34;our&#34;). These Terms of Use (&#34;Terms&#34;) 
                  govern your access to and use of our website <strong>bbe.ngo</strong> and all related services.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By accessing or using our website, you agree to be bound by these Terms. If you do not agree, you must not use our website.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">1. Acceptance of Terms</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We reserve the right to modify these Terms at any time. Your continued use following any changes constitutes acceptance of those changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Website</h2>
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Permitted Use</h3>
                <p className="text-gray-700 leading-relaxed">
                  You may use our website for lawful purposes only and in accordance with all applicable laws and regulations.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Prohibited Activities</h3>
                <p className="text-gray-700 leading-relaxed">You agree NOT to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use the website in any way that violates any applicable law</li>
                  <li>Engage in conduct that restricts or inhibits anyone&apos;s use of the website</li>
                  <li>Attempt to gain unauthorized access to any portion of the website</li>
                  <li>Use automated systems to access the website without permission</li>
                  <li>Transmit any viruses, malware, or harmful code</li>
                  <li>Collect or harvest personally identifiable information</li>
                  <li>Impersonate BBE, our employees, or other users</li>
                  <li>Interfere with or disrupt the website or servers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed">
                  The website and its entire contents, features, and functionality are owned by BBE, its licensors, or other providers and are protected by international copyright, trademark, patent, and trade secret laws.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You may not reproduce, distribute, modify, create derivative works, publicly display, republish, download, store, or transmit any material on our website without our prior written consent.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">4. Donations and Payments</h2>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Donation Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  All donations are processed securely through third-party payment processors. By making a donation, you agree to provide accurate and complete payment information.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 Tax Deductibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  BBE is a registered charity in the United Kingdom (Companies House: 15570506). Donations may be tax-deductible to the extent permitted by law. We will provide receipts for all donations.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3 Refund Policy</h3>
                <p className="text-gray-700 leading-relaxed">
                  All donations are final and non-refundable except in cases of duplicate charges or processing errors. If you believe an error has occurred, contact us at <a href="mailto:info@bbe.ngo" className="text-red-600 hover:text-red-700">info@bbe.ngo</a> within 30 days.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.4 Use of Funds</h3>
                <p className="text-gray-700 leading-relaxed">
                  BBE reserves the right to use donations for any of our charitable purposes. While we honor donor preferences for specific programs, we retain discretion to allocate funds where most needed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User-Generated Content</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you submit any content to our website (comments, feedback, testimonials), you grant BBE a non-exclusive, royalty-free, perpetual, irrevocable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such content worldwide.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You represent that you own or control all rights to the content you submit and that it does not violate these Terms or any applicable law.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">6. Disclaimer of Warranties</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  THE WEBSITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY KIND. BBE DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We make no warranties about the accuracy or completeness of the website&apos;s content or any linked websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, BBE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUES, DATA, USE, OR GOODWILL RESULTING FROM:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Your access to or use of or inability to access or use the website</li>
                  <li>Any conduct or content of any third party on the website</li>
                  <li>Any content obtained from the website</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless BBE, its officers, directors, employees, agents, and affiliates from any claims, liabilities, damages, losses, and expenses, including attorneys&apos; fees, arising from your use of the website or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may contain links to third-party websites not owned or controlled by BBE. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Ban className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">10. Termination</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We may terminate or suspend your access to our website immediately, without prior notice, for any reason, including if you breach these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>
                <p className="text-gray-700 leading-relaxed">
                  Any disputes arising from these Terms or your use of the website shall be resolved through binding arbitration in accordance with UK arbitration rules, except where prohibited by law.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">13. Contact Information</h2>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About These Terms?</h3>
              <p className="text-gray-700 mb-4">Contact us for clarification or concerns.</p>
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