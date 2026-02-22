"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, BookOpen, GraduationCap, Award, Globe, Shield, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function DonationSection() {
  const { t, isRTL } = useLanguage()

  // State
  const [donationType, setDonationType] = useState<'oneTime' | 'monthly'>('oneTime')
  const [amount, setAmount] = useState<string>('50')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [selectedProgram, setSelectedProgram] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card')
  const [donor, setDonor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [anonymous, setAnonymous] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [giftAid, setGiftAid] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiryMonth: '01',
    expiryYear: '2025',
    cvv: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const impactCards = [
    {
      amount: "£25",
      impact: t("donate.impact25"),
      icon: BookOpen,
      color: "blue",
      popular: false,
    },
    {
      amount: "£50",
      impact: t("donate.impact50"),
      icon: GraduationCap,
      color: "green",
      popular: true,
    },
    {
      amount: "£100",
      impact: t("donate.impact100"),
      icon: Users,
      color: "purple",
      popular: false,
    },
  ]

  const programs = [
    { name: t("programs.education"), icon: GraduationCap, color: "blue" },
    { name: t("programs.economic"), icon: Users, color: "purple" },
    { name: t("programs.emergency"), icon: Award, color: "red" },
    { name: t("programs.orphans"), icon: Heart, color: "pink" },
    { name: t("programs.refugeeSupport"), icon: Users, color: "green" },
    { name: t("donate.whereNeeded"), icon: Globe, color: "gray" },
  ]

  // Calculate summary
  const donationAmount = Number(customAmount) > 0 ? Number(customAmount) : Number(amount)
  const processingFee = 0
  const giftAidAmount = giftAid ? donationAmount * 0.25 : 0
  const totalImpact = donationAmount + giftAidAmount

  // Validation
  function validate() {
    const errs: string[] = []
    if (!donor.firstName) errs.push(t("donate.firstName") + ' is required')
    if (!donor.lastName) errs.push(t("donate.lastName") + ' is required')
    if (!donor.email) errs.push(t("donate.email") + ' is required')
    if (!donationAmount || donationAmount < 1) errs.push('Donation amount must be at least £1')
    if (paymentMethod === 'card') {
      if (!cardDetails.number) errs.push(t("donate.cardNumber") + ' is required')
      if (!cardDetails.cvv) errs.push(t("donate.cvv") + ' is required')
    }
    return errs
  }

  // Handlers
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors([])
    const errs = validate()
    if (errs.length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1500)
  }

  // UI
  return (
    <section
      id="donate"
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-red-50 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("donate.title")}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("donate.subtitle")}</p>
        </div>

        {/* Donation Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {impactCards.map((item, index) => (
            <Card
              key={index}
              className={`relative border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                item.popular ? "ring-2 ring-red-500" : ""
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-600 text-white px-3 md:px-4 py-1 text-xs md:text-sm">
                    {t("donate.mostPopular")}
                  </Badge>
                </div>
              )}
              <CardContent className="p-6 md:p-8 text-center">
                <item.icon
                  className={`h-10 w-10 mx-auto mb-4 ${
                    item.color === "blue"
                      ? "text-blue-600"
                      : item.color === "green"
                        ? "text-green-600"
                        : item.color === "purple"
                          ? "text-purple-600"
                          : item.color === "red"
                            ? "text-red-600"
                            : item.color === "pink"
                              ? "text-pink-600"
                              : "text-gray-600"
                  }`}
                />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{item.amount}</div>
                <div className="text-gray-600 text-sm md:text-base mb-4">{item.impact}</div>
                <Button
                  className="w-full h-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm md:text-base py-2 md:py-3 transition-all duration-300 hover:scale-105"
                  onClick={() => { setAmount(item.amount.replace('£', '')); setCustomAmount(''); }}
                >
                  {t("donate.selectAmount")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Donation Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white">
            <form onSubmit={handleSubmit}>
              <CardHeader className={`text-center pb-6 md:pb-8 ${isRTL ? "text-right" : ""}`}>
                <CardTitle className="text-2xl md:text-3xl text-gray-900">{t("donate.chooseAmount")}</CardTitle>
                <CardDescription className="text-base md:text-lg text-gray-600">
                  {t("donate.everyContribution")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 md:space-y-8">
                {/* Donation Type Selection */}
                <div>
                  <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : ""}`}>{t("donate.donationType")}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card
                      className={`border-2 cursor-pointer transition-colors ${donationType === 'oneTime' ? 'border-red-500 bg-red-50' : 'border-red-200 bg-white hover:border-red-400'}`}
                      onClick={() => setDonationType('oneTime')}
                    >
                      <CardContent className={`p-4 md:p-6 text-center ${isRTL ? "text-right" : ""}`}>
                        <Heart className="h-6 w-6 md:h-8 md:w-8 text-red-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{t("donate.oneTime")}</h4>
                        <p className="text-xs md:text-sm text-gray-600">{t("donate.oneTimeDesc")}</p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`border-2 cursor-pointer transition-colors ${donationType === 'monthly' ? 'border-blue-500 bg-blue-50' : 'border-blue-200 bg-white hover:border-blue-400'}`}
                      onClick={() => setDonationType('monthly')}
                    >
                      <CardContent className={`p-4 md:p-6 text-center ${isRTL ? "text-right" : ""}`}>
                        <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{t("donate.monthly")}</h4>
                        <p className="text-xs md:text-sm text-gray-600">{t("donate.monthlyDesc")}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : ""}`}>{t("donate.selectAmount")}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                    {["25", "50", "100", "250"].map((amt) => (
                      <Button
                        key={amt}
                        variant={amount === amt && !customAmount ? "ghost" : "outline"}
                        className={`h-12 md:h-16 text-sm md:text-lg font-semibold border-2 ${amount === amt && !customAmount ? 'border-red-500 bg-red-600 text-white' : 'hover:border-red-500 hover:text-red-600 bg-transparent'} transition-colors`}
                        onClick={e => { e.preventDefault(); setAmount(amt); setCustomAmount(''); }}
                      >
                        £{amt}
                      </Button>
                    ))}
                  </div>
                  <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <span className="text-gray-700 font-medium text-sm md:text-base">£</span>
                    <input
                      type="number"
                      min={1}
                      placeholder={t("donate.customAmount")}
                      value={customAmount}
                      onChange={e => { setCustomAmount(e.target.value); setAmount(''); }}
                      className={`flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base ${isRTL ? "text-right" : ""}`}
                    />
                  </div>
                </div>

                {/* Program Selection */}
                <div>
                  <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : ""}`}>{t("donate.specificProgram")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {programs.map((program) => (
                      <Card
                        key={program.name}
                        className={`border-2 cursor-pointer transition-all ${selectedProgram === program.name ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-400 hover:bg-red-50'}`}
                        onClick={() => setSelectedProgram(program.name)}
                      >
                        <CardContent className={`p-3 md:p-4 flex items-center space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                              program.color === "blue"
                                ? "bg-blue-100"
                                : program.color === "green"
                                  ? "bg-green-100"
                                  : program.color === "purple"
                                    ? "bg-purple-100"
                                    : program.color === "red"
                                      ? "bg-red-100"
                                      : program.color === "pink"
                                        ? "bg-pink-100"
                                        : program.color === "gray"
                                          ? "bg-gray-100"
                                          : "bg-gray-100"
                            }`}
                          >
                            <program.icon
                              className={`h-4 w-4 md:h-5 md:w-5 ${
                                program.color === "blue"
                                  ? "text-blue-600"
                                  : program.color === "green"
                                    ? "text-green-600"
                                    : program.color === "purple"
                                      ? "text-purple-600"
                                      : program.color === "red"
                                        ? "text-red-600"
                                        : program.color === "pink"
                                          ? "text-pink-600"
                                          : program.color === "gray"
                                            ? "text-gray-600"
                                            : "text-gray-600"
                              }`}
                            />
                          </div>
                          <span className="font-medium text-gray-900 text-sm md:text-base">{program.name}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : ""}`}>{t("donate.donorInfo")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.firstName")} *</label>
                      <input
                        type="text"
                        required
                        value={donor.firstName}
                        onChange={e => setDonor(d => ({ ...d, firstName: e.target.value }))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.lastName")} *</label>
                      <input
                        type="text"
                        required
                        value={donor.lastName}
                        onChange={e => setDonor(d => ({ ...d, lastName: e.target.value }))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.email")} *</label>
                      <input
                        type="email"
                        required
                        value={donor.email}
                        onChange={e => setDonor(d => ({ ...d, email: e.target.value }))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.phone")}</label>
                      <input
                        type="tel"
                        value={donor.phone}
                        onChange={e => setDonor(d => ({ ...d, phone: e.target.value }))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.address")}</label>
                    <input
                      type="text"
                      value={donor.address}
                      onChange={e => setDonor(d => ({ ...d, address: e.target.value }))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className={`text-lg md:text-xl font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : ""}`}>{t("donate.paymentMethod")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
                    <Card
                      className={`border-2 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-blue-200 bg-white hover:border-blue-400'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CardContent className="p-3 md:p-4 text-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold text-xs md:text-sm">CARD</span>
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-900">{t("donate.creditDebitCard")}</span>
                      </CardContent>
                    </Card>
                    <Card
                      className={`border-2 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-purple-200 bg-white hover:border-purple-400'}`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <CardContent className="p-3 md:p-4 text-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold text-xs">PayPal</span>
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-900">{t("donate.paypal")}</span>
                      </CardContent>
                    </Card>
                    <Card
                      className={`border-2 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-green-500 bg-green-50' : 'border-green-200 bg-white hover:border-green-400'}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <CardContent className="p-3 md:p-4 text-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold text-xs">BANK</span>
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-900">{t("donate.bankTransfer")}</span>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Card Details Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.cardNumber")} *</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={e => setCardDetails(d => ({ ...d, number: e.target.value }))}
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.expiryMonth")} *</label>
                          <select
                            value={cardDetails.expiryMonth}
                            onChange={e => setCardDetails(d => ({ ...d, expiryMonth: e.target.value }))}
                            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                          >
                            {[...Array(12)].map((_, i) => (
                              <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.expiryYear")} *</label>
                          <select
                            value={cardDetails.expiryYear}
                            onChange={e => setCardDetails(d => ({ ...d, expiryYear: e.target.value }))}
                            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                          >
                            {[2025,2026,2027,2028,2029,2030].map(y => (
                              <option key={y} value={String(y)}>{y}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : ""}`}>{t("donate.cvv")} *</label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            value={cardDetails.cvv}
                            onChange={e => setCardDetails(d => ({ ...d, cvv: e.target.value }))}
                            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Options */}
                <div className="space-y-3 md:space-y-4">
                  <div className={`flex items-start space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={anonymous}
                      onChange={e => setAnonymous(e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                    />
                    <label htmlFor="anonymous" className={`text-sm text-gray-700 ${isRTL ? "text-right" : ""}`}>{t("donate.anonymous")}</label>
                  </div>
                  <div className={`flex items-start space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={newsletter}
                      onChange={e => setNewsletter(e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                    />
                    <label htmlFor="newsletter" className={`text-sm text-gray-700 ${isRTL ? "text-right" : ""}`}>{t("donate.newsletter")}</label>
                  </div>
                  <div className={`flex items-start space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <input
                      type="checkbox"
                      id="giftaid"
                      checked={giftAid}
                      onChange={e => setGiftAid(e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                    />
                    <label htmlFor="giftaid" className={`text-sm text-gray-700 ${isRTL ? "text-right" : ""}`}>{t("donate.giftAid")}</label>
                  </div>
                </div>

                {/* Donation Summary */}
                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                  <h4 className={`text-base md:text-lg font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : ""}`}>{t("donate.summary")}</h4>
                  <div className="space-y-2">
                    <div className={`flex justify-between text-sm md:text-base ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="text-gray-600">{t("donate.amount")}:</span>
                      <span className="font-semibold">£{donationAmount.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between text-sm md:text-base ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="text-gray-600">{t("donate.processingFee")}:</span>
                      <span className="font-semibold">£{processingFee.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between text-sm md:text-base ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="text-gray-600">{t("donate.giftAidAmount")}:</span>
                      <span className="font-semibold text-green-600">+£{giftAidAmount.toFixed(2)}</span>
                    </div>
                    <div className={`border-t pt-2 flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="text-base md:text-lg font-semibold text-gray-900">{t("donate.totalImpact")}:</span>
                      <span className="text-base md:text-lg font-bold text-red-600">£{totalImpact.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Error messages */}
                {errors.length > 0 && (
                  <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4">
                    <ul className="list-disc pl-5">
                      {errors.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  size="lg"
                  type="submit"
                  disabled={submitting}
                  className="w-full h-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm md:text-lg py-3 md:py-4 transition-all duration-300 hover:scale-105 disabled:opacity-60"
                >
                  <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {submitting ? t("donate.completeDonation") + '...' : t("donate.completeDonation")}
                </Button>

                {/* Success message */}
                {success && (
                  <div className="flex items-center justify-center space-x-2 bg-green-100 border border-green-300 text-green-700 rounded-lg p-4 mt-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Thank you for your donation!</span>
                  </div>
                )}

                {/* Security Notice */}
                <div className={`text-center text-xs md:text-sm text-gray-500 ${isRTL ? "text-right" : ""}`}> 
                  <div className={`flex items-center justify-center space-x-2 mb-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}> 
                    <Shield className="h-3 w-3 md:h-4 md:w-4" /> 
                    <span>{t("donate.secureEncrypted")}</span> 
                  </div> 
                  <p>{t("donate.taxDeductible")}</p> 
                </div>
              </CardContent>
            </form>
          </Card>
        </div>

        {/* Fundraising Goals */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6 md:p-8">
              <div className={`text-center mb-6 md:mb-8 ${isRTL ? "text-right" : ""}`}>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{t("donate.currentGoals")}</h3>
                <p className="text-blue-100 text-sm md:text-base">{t("donate.goalsSubtitle")}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className={`flex justify-between items-center mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="font-semibold text-sm md:text-base">{t("donate.virtualEducationExpansion")}</span>
                    <span className="text-xs md:text-sm">£15,000 / £25,000</span>
                  </div>
                  <div className="w-full bg-blue-800 rounded-full h-2 md:h-3 mb-2">
                    <div className="bg-white h-2 md:h-3 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-xs md:text-sm text-blue-100">60% {t("donate.funded")} - {t("donate.helpReachStudents")}</p>
                </div>
                <div>
                  <div className={`flex justify-between items-center mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="font-semibold text-sm md:text-base">{t("donate.mobileHealthClinic")}</span>
                    <span className="text-xs md:text-sm">£8,500 / £15,000</span>
                  </div>
                  <div className="w-full bg-purple-800 rounded-full h-2 md:h-3 mb-2">
                    <div className="bg-white h-2 md:h-3 rounded-full" style={{ width: "57%" }}></div>
                  </div>
                  <p className="text-xs md:text-sm text-purple-100">57% {t("donate.funded")} - {t("donate.bringingHealthcare")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
