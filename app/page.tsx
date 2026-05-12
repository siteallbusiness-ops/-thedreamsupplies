import TopBar             from '@/components/TopBar'
import Header             from '@/components/Header'
import Navigation         from '@/components/Navigation'
import Hero               from '@/components/Hero'
import UspStrip           from '@/components/UspStrip'
import PoundLines         from '@/components/PoundLines'
import Categories         from '@/components/Categories'
import FeaturedProducts   from '@/components/FeaturedProducts'
import PromoBanners       from '@/components/PromoBanners'
import PalletDeals        from '@/components/PalletDeals'
import BigBrands          from '@/components/BigBrands'
import WhyShopWithUs      from '@/components/WhyShopWithUs'
import Testimonials       from '@/components/Testimonials'
import Newsletter         from '@/components/Newsletter'
import Footer             from '@/components/Footer'
import AIFloatingButton   from '@/components/AIFloatingButton'

export default function Home() {
  return (
    <main>
      <TopBar />
      <Header />
      <Navigation />
      <Hero />
      <UspStrip />
      <PoundLines />
      <Categories />
      <FeaturedProducts />
      <PromoBanners />
      <PalletDeals />
      <BigBrands />
      <WhyShopWithUs />
      <Testimonials />
      <Newsletter />
      <Footer />
      <AIFloatingButton />
    </main>
  )
}
