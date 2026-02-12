"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, X, Share2, BookOpen, Twitter, Facebook, Linkedin, MessageCircle, Mail, Link2, Check, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { images, getImage } from "@/config/images"
import { InlineImageUpload } from "@/components/inline-image-upload"

type NewsArticle = {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  readTime: string
  featured: boolean
  tags: string[]
}

export function NewsSection() {
  const { t, isRTL } = useLanguage()

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [selectedModalImage, setSelectedModalImage] = useState<string | null>(null)
  const [animateCards, setAnimateCards] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [newsImages, setNewsImages] = useState<Record<number, string>>({
    1: images.news.featured,
    2: images.news.article1,
    3: images.news.article2,
  })

  // Trigger card animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showShareMenu !== null && !target.closest('.share-menu-container')) {
        setShowShareMenu(null)
      }
    }

    if (showShareMenu !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showShareMenu])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1")
      setNewsImages((prev) => ({
        1: localStorage.getItem("news_image_1") || prev[1],
        2: localStorage.getItem("news_image_2") || prev[2],
        3: localStorage.getItem("news_image_3") || prev[3],
      }))
    }
  }, [])

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Chevening Information Session",
      excerpt:
        "Beyond Borders Empowerment is pleased to host a Chevening Information Session on the fully funded UK government scholarship that offers exceptional future leaders the opportunity to pursue a world-class education in the UK.",
      image: newsImages[1] || images.news?.[1]?.main || images.news.featured,
      date: "2025",
      category: t("news.education"),
      readTime: "6",
      featured: true,
      tags: ["Scholarship", "Chevening", "UK Education", "Information Session"],
    },
    {
      id: 2,
      title: "Refugees Cultural Event – London",
      excerpt:
        "In February 2025, Beyond Borders Empowerment (BBE) hosted a Refugees Cultural Event at Rumi Restaurant in London, bringing together refugees and community members from diverse backgrounds for an evening of connection and solidarity.",
      image: newsImages[2] || images.news?.[2]?.main || images.news.article1,
      date: "February 2025",
      category: t("news.partnership"),
      readTime: "5",
      featured: false,
      tags: ["Refugees", "London", "Community", "Education"],
    },
    {
      id: 3,
      title: "Psychological First Aid (PFA) Training",
      excerpt:
        "Beyond Borders Empowerment is pleased to announce the launch of an Online Training on Psychological First Aid (PFA) delivered by expert dear Rahila Poya. This program aims to strengthen the capacity of individuals and communities to respond to emotional and psychological distress during times of crisis.",
      image: newsImages[3] || images.news?.[3]?.main || images.news.article2,
      date: "December 2025",
      category: t("news.healthcare"),
      readTime: "6",
      featured: false,
      tags: ["Mental Health", "Training", "PFA", "Online"],
    },
  ]

  const featuredArticle = newsArticles[0]
  const otherArticles = newsArticles.slice(1)

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article)
    setSelectedModalImage(null)
    document.body.style.overflow = "hidden"
  }

  const handleCloseModal = () => {
    setSelectedArticle(null)
    setSelectedModalImage(null)
    document.body.style.overflow = "unset"
  }

  const selectedGalleryImages = (() => {
    if (!selectedArticle) return [] as string[]
    const newsById = images.news as unknown as Record<number, { gallery?: readonly string[] }>
    const fromConfig = newsById[selectedArticle.id]?.gallery || []
    const base = [selectedArticle.image, ...fromConfig]
    const uniq: string[] = []
    for (const src of base) {
      if (!src) continue
      const resolved = getImage(src, images.fallback.placeholder)
      if (!uniq.includes(resolved)) uniq.push(resolved)
    }
    return uniq
  })()

  const selectedMainImage =
    selectedModalImage || (selectedGalleryImages[0] ? selectedGalleryImages[0] : getImage(selectedArticle?.image, images.fallback.placeholder))

  const handleShare = (article: NewsArticle, platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    const articleUrl = `${url}#news`
    const title = article.title
    const text = article.excerpt

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl)}`,
          '_blank',
          'width=600,height=400'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
          '_blank',
          'width=600,height=400'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
          '_blank',
          'width=600,height=400'
        )
        break
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(title + ' - ' + articleUrl)}`,
          '_blank'
        )
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + articleUrl)}`
        break
      case 'copy':
        navigator.clipboard.writeText(articleUrl).then(() => {
          setCopiedLink(true)
          setTimeout(() => {
            setCopiedLink(false)
            setShowShareMenu(null)
          }, 2000)
        })
        break
    }

    if (platform !== 'copy') {
      setShowShareMenu(null)
    }
  }

  return (
    <section
      id="news"
      dir={isRTL ? "rtl" : "ltr"}
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[url('/placeholder.png')] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[url('/placeholder.png')] rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with enhanced animation */}
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""} animate-fade-in-up`}>
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-sm">
            <BookOpen className={`h-4 w-4 text-red-600 ${isRTL ? "ml-2" : "mr-2"}`} />
            <span className="text-sm font-medium text-gray-700">{t("news.latest")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            {t("news.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6 animate-scale-x"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t("news.subtitle")}</p>
        </div>

        {/* Featured Article with enhanced design */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16 relative">
          <Card className="border-0 shadow-2xl bg-white overflow-visible group hover:shadow-3xl transition-all duration-500 animate-slide-up">
            <div className={`grid lg:grid-cols-2 gap-0 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={`relative order-2 lg:order-1 ${isRTL ? "lg:order-2" : ""} overflow-hidden`}>
                <Image
                  src={getImage(featuredArticle.image, images.fallback.placeholder)}
                  alt={featuredArticle.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                {isAdmin && (
                  <div className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"}`}>
                    <InlineImageUpload
                      label="Change featured image"
                      storageKey={`news_image_${featuredArticle.id}`}
                      onUploaded={(url) => setNewsImages((prev) => ({ ...prev, [featuredArticle.id]: url }))}
                    />
                  </div>
                )}

                {/* Floating badges */}
                <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} flex flex-col gap-2`}>
                  <Badge className="bg-red-600 text-white text-xs md:text-sm shadow-lg animate-bounce-gentle">
                    {t("news.featured")}
                  </Badge>
                  <Badge  className="bg-white/90 text-gray-700 text-xs shadow-lg">
                    {featuredArticle.category}
                  </Badge>
                </div>

              </div>

              <div
                className={`p-6 md:p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2 ${isRTL ? "lg:order-1 text-right" : ""}`}
              >
                <div className={`flex flex-wrap items-center gap-2 md:gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`flex items-center text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Calendar className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                    {featuredArticle.date}
                  </div>
                  <div
                    className={`flex items-center text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Clock className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                    {featuredArticle.readTime} {t("news.minRead")}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-red-600 transition-colors cursor-pointer">
                  {featuredArticle.title}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base lg:text-lg">
                  {featuredArticle.excerpt}
                </p>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {featuredArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Button
                    variant="destructive"
                    onClick={() => handleArticleClick(featuredArticle)}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    {t("news.readFull")}
                  </Button>
                  <div className="relative share-menu-container">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all"
                      onClick={() => setShowShareMenu(showShareMenu === featuredArticle.id ? null : featuredArticle.id)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    {showShareMenu === featuredArticle.id && (
                      <div className={`absolute bottom-full mb-2 ${isRTL ? "left-0" : "right-0"} bg-white rounded-lg shadow-2xl border border-gray-200 p-2 z-[9999] min-w-[200px] animate-scale-in`}>
                        <div className="text-xs font-semibold text-gray-500 px-3 py-2 border-b">{t("news.shareOn") || "Share on"}</div>
                        <button
                          onClick={() => handleShare(featuredArticle, 'twitter')}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                        >
                          <Twitter className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare(featuredArticle, 'facebook')}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                        >
                          <Facebook className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare(featuredArticle, 'linkedin')}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                        >
                          <Linkedin className="h-4 w-4 text-blue-700" />
                          <span className="text-sm">LinkedIn</span>
                        </button>
                        <button
                          onClick={() => handleShare(featuredArticle, 'whatsapp')}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded-md transition-colors text-left"
                        >
                          <MessageCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleShare(featuredArticle, 'email')}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          <Mail className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">Email</span>
                        </button>
                        <div className="border-t my-1"></div>
                        <button
                          onClick={() => handleShare(featuredArticle, 'copy')}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          {copiedLink ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4 text-gray-600" />}
                          <span className="text-sm">{copiedLink ? t("news.linkCopied") || "Link Copied!" : t("news.copyLink") || "Copy Link"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Other Articles Grid with staggered animations */}
        <div className="max-w-7xl mx-auto">
          <div className={`mb-8 ${isRTL ? "text-right" : ""}`}>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full"></div>
              {t("news.moreNews")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {otherArticles.map((article, index) => (
              <Card
                key={article.id}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-2 cursor-pointer ${
                  animateCards ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={getImage(article.image, images.fallback.placeholder)}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isAdmin && (
                    <div className={`absolute bottom-3 ${isRTL ? "right-3" : "left-3"}`}>
                      <InlineImageUpload
                        label="Change image"
                        storageKey={`news_image_${article.id}`}
                        onUploaded={(url) => setNewsImages((prev) => ({ ...prev, [article.id]: url }))}
                      />
                    </div>
                  )}

                  {/* Category badge */}
                  <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"}`}>
                    <Badge className="bg-white/95 text-gray-700 text-xs shadow-lg">
                      {article.category}
                    </Badge>
                  </div>

                </div>

                <CardContent className="p-4 md:p-6">
                  <div
                    className={`flex flex-wrap items-center gap-2 md:gap-4 mb-3 text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Calendar className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {article.date}
                    </div>
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Clock className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {article.readTime} {t("news.minRead")}
                    </div>
                  </div>

                  <h3
                    className={`text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 ${isRTL ? "text-right" : ""}`}
                  >
                    {article.title}
                  </h3>

                  <p
                    className={`text-gray-600 mb-4 leading-relaxed text-sm md:text-base line-clamp-3 ${isRTL ? "text-right" : ""}`}
                  >
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-1 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {article.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 hover:no-underline group-hover:translate-x-1 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleArticleClick(article)
                      }}
                      rightIcon={<ChevronRight className="h-3 w-3 md:h-4 md:w-4" />}
                    >
                      {t("news.readMore")}
                    </Button>
                    <div className="relative share-menu-container">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowShareMenu(showShareMenu === article.id ? null : article.id)
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      {showShareMenu === article.id && (
                        <div
                          className={`absolute bottom-full mb-2 ${isRTL ? "left-0" : "right-0"} bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-[9999] min-w-[200px] animate-scale-in`}
                        >
                          <div className="text-xs font-semibold text-gray-500 px-3 py-2 border-b">{t("news.shareOn") || "Share on"}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(article, 'twitter')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                          >
                            <Twitter className="h-4 w-4 text-blue-400" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(article, 'facebook')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                          >
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(article, 'linkedin')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                          >
                            <Linkedin className="h-4 w-4 text-blue-700" />
                            <span className="text-sm">LinkedIn</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(article, 'whatsapp')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded-md transition-colors text-left"
                          >
                            <MessageCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">WhatsApp</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(article, 'email')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                          >
                            <Mail className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">Email</span>
                          </button>
                          <div className="border-t my-1"></div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(article, 'copy')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                          >
                            {copiedLink ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4 text-gray-600" />}
                            <span className="text-sm">{copiedLink ? t("news.linkCopied") || "Link Copied!" : t("news.copyLink") || "Copy Link"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Article Detail Modal */}
        {selectedArticle && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-start justify-center p-4 pt-24 md:pt-28 animate-fade-in overflow-y-auto"
            onClick={handleCloseModal}
          >
            <div className="relative w-full max-w-4xl mb-8">
              <div 
                className="bg-white rounded-2xl w-full overflow-hidden animate-scale-in shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button - Positioned at top-right corner of modal */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                  className={`absolute ${isRTL ? "left-4" : "right-4"} top-4 z-[70] bg-white hover:bg-red-600 text-gray-700 hover:text-white transition-all rounded-full h-12 w-12 shadow-2xl hover:shadow-red-500/50 border-2 border-gray-300 hover:border-red-600`}
                >
                  <X className="h-6 w-6" />
                </Button>

              {/* Modal Header */}
              <div
                className={`flex items-start p-5 md:p-6 border-b bg-gradient-to-r from-red-50 via-white to-blue-50 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex-1 ${isRTL ? "pl-16" : "pr-16"}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Badge className="text-xs md:text-sm bg-gradient-to-r from-red-600 to-blue-600 text-white">
                      {selectedArticle.category}
                    </Badge>
                  </div>
                  <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight ${isRTL ? "text-right" : ""}`}>
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(100vh-140px)] scroll-smooth">
                <div className="relative">
                  <Image
                    src={selectedMainImage}
                    alt={selectedArticle.title}
                    width={800}
                    height={400}
                    className="w-full h-56 md:h-72 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {selectedGalleryImages.length > 1 && (
                  <div className="px-6 md:px-8 lg:px-10 py-4 border-b border-gray-200 bg-white">
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                      {selectedGalleryImages.map((src, idx) => (
                        <button
                          key={`${src}-${idx}`}
                          type="button"
                          onClick={() => setSelectedModalImage(src)}
                          className={`relative rounded-lg overflow-hidden border bg-gray-50 transition-colors ${
                            selectedMainImage === src
                              ? "border-red-500 ring-2 ring-red-200"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <div className="relative h-14 sm:h-16">
                            <Image
                              src={src}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 120px, 20vw"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 md:p-8 lg:p-10">
                  {/* Article meta */}
                  <div className={`flex flex-wrap items-center gap-4 md:gap-6 mb-6 pb-6 border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`flex items-center text-sm md:text-base text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Calendar className={`h-4 w-4 md:h-5 md:w-5 ${isRTL ? "ml-2" : "mr-2"} text-red-600`} />
                      <span className="font-medium">{selectedArticle.date}</span>
                    </div>
                    <div
                      className={`flex items-center text-sm md:text-base text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Clock className={`h-4 w-4 md:h-5 md:w-5 ${isRTL ? "ml-2" : "mr-2"} text-blue-600`} />
                      <span className="font-medium">{selectedArticle.readTime} {t("news.minRead")}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-2 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {selectedArticle.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 text-gray-800 text-sm font-medium rounded-full hover:from-red-200 hover:to-blue-200 transition-all hover:shadow-md cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Article content */}
                  <div className={`prose prose-lg max-w-none ${isRTL ? "text-right" : ""}`}>
                    <p className="text-gray-800 mb-8 leading-relaxed text-base md:text-lg font-medium">
                      {selectedArticle.excerpt}
                    </p>

                    <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
                      {selectedArticle.id === 1 && (
                        <>
                          <p>
                            Beyond Borders Empowerment is pleased to host a Chevening Information Session on the fully funded UK government scholarship that offers exceptional future leaders the opportunity to pursue a world-class education in the UK.
                          </p>

                          <p>
                            In this session, expert Chevening alumni will guide participants through the eligibility criteria, application tips and essay writing guidance, as well as the opportunities and benefits of the program.
                          </p>

                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full"></div>
                            Session Highlights:
                          </h4>
                          <ul
                            className={`list-disc ${isRTL ? "pr-6 pl-0" : "pl-6"} space-y-3 text-gray-700 text-base md:text-lg`}
                          >
                            <li>Chevening scholarship overview and benefits</li>
                            <li>Eligibility criteria explained clearly</li>
                            <li>Application tips and essay writing guidance</li>
                            <li>Direct insights from Chevening alumni</li>
                            <li>Practical steps to begin your application journey</li>
                          </ul>

                          <p>
                            Don’t miss this chance to learn directly from alumni and take your first step toward a fully funded master’s degree in the UK.
                          </p>
                        </>
                      )}

                      {selectedArticle.id === 2 && (
                        <>
                          <p>
                            In February 2025, Beyond Borders Empowerment (BBE) hosted a Refugees Cultural Event at Rumi Restaurant in London, bringing together refugees and community members from diverse backgrounds for an evening of connection and solidarity.
                          </p>

                          <p>
                            The event created a valuable space for networking, shared experiences, and mutual understanding, while also expressing collective support for girls and women in Afghanistan.
                          </p>

                          <p>
                            During the gathering, BBE officially launched its “Pathways Towards Opportunities” program, an initiative designed to equip young Afghan girls and women with English language and computer skills to support their education and future opportunities.
                          </p>

                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full"></div>
                            Event Highlights:
                          </h4>
                          <ul
                            className={`list-disc ${isRTL ? "pr-6 pl-0" : "pl-6"} space-y-3 text-gray-700 text-base md:text-lg`}
                          >
                            <li>Over 100 participants attended</li>
                            <li>Community networking and solidarity</li>
                            <li>Support for girls’ education in Afghanistan</li>
                            <li>Launch of “Pathways Towards Opportunities”</li>
                            <li>Shared responsibility to address education gaps</li>
                          </ul>

                          <p>
                            The evening highlighted the urgent need to address educational gaps in Afghanistan and reinforced the importance of collective action in supporting access to learning and empowerment.
                          </p>
                        </>
                      )}

                      {selectedArticle.id === 3 && (
                        <>
                          <p>
                            Beyond Borders Empowerment is pleased to announce the launch of an Online Training on Psychological First Aid (PFA) delivered by expert dear Rahila Poya. This program aims to strengthen the capacity of individuals and communities to respond to emotional and psychological distress during times of crisis.
                          </p>

                          <p>
                            This virtual training is designed for professionals, volunteers, and community members who wish to support individuals affected by stress, trauma, disasters, or emergencies.
                          </p>

                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full"></div>
                            Training Topics:
                          </h4>
                          <ul
                            className={`list-disc ${isRTL ? "pr-6 pl-0" : "pl-6"} space-y-3 text-gray-700 text-base md:text-lg`}
                          >
                            <li>Understanding the core principles and steps of PFA</li>
                            <li>Recognizing common signs of stress and trauma</li>
                            <li>Providing immediate emotional and practical support</li>
                            <li>Knowing how and when to refer individuals to specialized mental health services</li>
                          </ul>

                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full"></div>
                            Training Details:
                          </h4>
                          <ul
                            className={`list-disc ${isRTL ? "pr-6 pl-0" : "pl-6"} space-y-3 text-gray-700 text-base md:text-lg`}
                          >
                            <li>Dates: December 27, 28, and 29</li>
                            <li>Time: 6:00 PM – 7:00 PM (Kabul Time)</li>
                            <li>Format: Online (Google Meet)</li>
                            <li>Trainer: Rahila Poya</li>
                          </ul>

                          <p>
                            Interested participants can register by scanning the QR code on the official poster or by completing the Google registration form available here:
                          </p>
                          <p>
                            <a href="https://forms.gle/8dWPv1MDYPbxiXi28" target="_blank" rel="noreferrer">
                              https://forms.gle/8dWPv1MDYPbxiXi28
                            </a>
                          </p>
                        </>
                      )}

                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className={`flex flex-wrap gap-3 mt-10 pt-8 border-t-2 border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="relative share-menu-container">
                      <Button
                        variant="outline"
                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 gap-2 px-6 py-3 text-base font-semibold"
                        onClick={() => setShowShareMenu(showShareMenu === selectedArticle.id ? null : selectedArticle.id)}
                      >
                        <Share2 className="h-5 w-5" />
                        {t("news.shareArticle")}
                      </Button>
                      {showShareMenu === selectedArticle.id && (
                        <div
                          className={`absolute bottom-full mb-2 ${isRTL ? "right-0" : "left-0"} bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-[9999] min-w-[200px] animate-scale-in`}
                        >
                          <div className="text-xs font-semibold text-gray-500 px-3 py-2 border-b">{t("news.shareOn") || "Share on"}</div>
                          <button
                            onClick={() => handleShare(selectedArticle, 'twitter')}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                          >
                            <Twitter className="h-4 w-4 text-blue-400" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare(selectedArticle, 'facebook')}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                          >
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare(selectedArticle, 'linkedin')}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors text-left"
                          >
                            <Linkedin className="h-4 w-4 text-blue-700" />
                            <span className="text-sm">LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare(selectedArticle, 'whatsapp')}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded-md transition-colors text-left"
                          >
                            <MessageCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">WhatsApp</span>
                          </button>
                          <button
                            onClick={() => handleShare(selectedArticle, 'email')}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                          >
                            <Mail className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">Email</span>
                          </button>
                          <div className="border-t my-1"></div>
                          <button
                            onClick={() => handleShare(selectedArticle, 'copy')}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                          >
                            {copiedLink ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4 text-gray-600" />}
                            <span className="text-sm">{copiedLink ? t("news.linkCopied") || "Link Copied!" : t("news.copyLink") || "Copy Link"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-scale-x {
          animation: scale-x 0.8s ease-out 0.5s both;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}
