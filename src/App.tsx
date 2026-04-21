import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import bullGpsHome from './bullgps/home.fragment.html?raw'
import bullGpsProducts from './bullgps/products.fragment.html?raw'
import { productFragments, type ProductSlug } from './bullgps/productFragments'
import './App.css'
import './bullgps/overrides.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function App() {
  useEffect(() => {
    // These classes are used by the imported Astra/Elementor styles.
    document.body.className =
      'home wp-singular page-template-default page page-id-574 wp-custom-logo wp-embed-responsive wp-theme-astra wp-child-theme-astra-child theme-astra woocommerce-no-js yith-wcstripe ast-desktop ast-page-builder-template ast-no-sidebar astra-4.12.6 ast-single-post ast-replace-site-logo-transparent ast-inherit-site-logo-transparent ast-theme-transparent-header ast-hfb-header elementor-default elementor-kit-17 elementor-page elementor-page-574 astra-addon-4.7.1'

    let currentPosition = 0

    const getSliderState = () => {
      const slider = document.querySelector(
        '.slider-products .elementor-container'
      ) as HTMLElement | null
      if (!slider) return null

      const items = Array.from(slider.children).filter(
        (el) => (el as HTMLElement).classList?.contains('elementor-column')
      ) as HTMLElement[]

      const itemWidth = items[0]?.getBoundingClientRect().width ?? 0
      const viewportWidth =
        (slider.parentElement as HTMLElement | null)?.getBoundingClientRect().width ?? 0

      const itemsInViewport =
        itemWidth > 0 ? Math.max(1, Math.floor(viewportWidth / itemWidth)) : 1

      return { slider, itemsCount: items.length, itemsInViewport, itemWidth }
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const toggler = target.closest('.elementskit-menu-toggler') as HTMLElement | null
      const overlay = target.closest('.elementskit-menu-overlay') as HTMLElement | null
      const closeBtn = target.closest('.elementskit-menu-close') as HTMLElement | null

      if (toggler || overlay || closeBtn) {
        const container = document.querySelector(
          '.elementskit-menu-container'
        ) as HTMLElement | null
        const menuOverlay = document.querySelector(
          '.elementskit-menu-overlay'
        ) as HTMLElement | null

        if (!container || !menuOverlay) return

        const isOpen =
          container.style.display === 'block' || menuOverlay.style.display === 'block'
        const nextDisplay = isOpen ? 'none' : 'block'
        container.style.display = nextDisplay
        menuOverlay.style.display = nextDisplay
        return
      }

      const next = target.closest('.next') as HTMLElement | null
      const back = target.closest('.back') as HTMLElement | null
      if (!next && !back) return

      const state = getSliderState()
      if (!state) return

      const maxPos = Math.max(0, state.itemsCount - state.itemsInViewport)
      if (next) currentPosition = Math.min(maxPos, currentPosition + 1)
      if (back) currentPosition = Math.max(0, currentPosition - 1)

      state.slider.style.transform = `translateX(-${currentPosition * state.itemWidth}px)`
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null
      if (!form || !(form instanceof HTMLFormElement)) return
      if (!form.classList.contains('wpforms-form')) return
      e.preventDefault()
    }

    document.addEventListener('submit', onSubmit, true)
    return () => document.removeEventListener('submit', onSubmit, true)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<div dangerouslySetInnerHTML={{ __html: bullGpsHome }} />} />
        <Route path="/products" element={<Navigate to="/products/" replace />} />
        <Route
          path="/products/"
          element={<div dangerouslySetInnerHTML={{ __html: bullGpsProducts }} />}
        />
        <Route path="/assettrac/" element={<ProductFragment slug="assettrac" />} />
        <Route path="/eztrac/" element={<ProductFragment slug="eztrac" />} />
        <Route path="/eztrac-he/" element={<ProductFragment slug="eztrac-he" />} />
        <Route path="/eztrac-hw/" element={<ProductFragment slug="eztrac-hw" />} />
        <Route path="/rfid/" element={<ProductFragment slug="rfid" />} />
        <Route path="/smart7/" element={<ProductFragment slug="smart7" />} />
        <Route path="/solarnet/" element={<ProductFragment slug="solarnet" />} />
        <Route path="/stealthnet/" element={<ProductFragment slug="stealthnet" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function ShellLayout({ children }: { children: React.ReactNode }) {
  return <div className="bullgps-shell">{children}</div>
}

function NotFound() {
  return (
    <ShellLayout>
      <div style={{ padding: 24, color: 'white' }}>
        <h2 style={{ margin: 0 }}>Page not found</h2>
        <p style={{ marginTop: 8 }}>
          Go back to <a href="/">Home</a>.
        </p>
      </div>
    </ShellLayout>
  )
}

function ProductFragment({ slug }: { slug: ProductSlug }) {
  const html = productFragments[slug]
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default App
