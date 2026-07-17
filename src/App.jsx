import { useEffect, useRef, useState } from 'react'

const LOCATIONS = [
  { name: 'Offices & Workplaces', note: 'Break rooms that keep teams fueled' },
  { name: 'Malls & Retail', note: 'High-traffic corridors and food courts' },
  { name: 'Nursing Homes', note: 'Convenient access for staff and visitors' },
  { name: 'Colleges & Campuses', note: 'Study halls, dorms, and commons' },
  { name: 'Sororities & Greek Life', note: 'Late-night staples between events' },
  { name: 'Bars & Nightlife', note: 'After-hours essentials for guests' },
]

const SPECIALTY = [
  {
    title: 'Fresh Flowers',
    copy: 'Grab-and-go bouquets for last-minute moments.',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'High-End Champagne',
    copy: 'Celebrate on demand with curated bottles.',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Emergency Items',
    copy: 'Phone chargers, toiletries, and must-haves.',
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Late-Night Staples',
    copy: 'Snacks and drinks when everything else is closed.',
    image:
      'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Bar Traffic Picks',
    copy: 'Mints, gum, water, and nightlife essentials.',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  },
]

function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}

function Reveal({ className = '', delay = 0, children, as: Tag = 'div' }) {
  const ref = useReveal()
  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? 'scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="nav-logo" onClick={closeMenu}>
            Venegas<span>Vending</span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary">
            <a href="#placement" onClick={closeMenu}>
              Placement
            </a>
            <a href="#locations" onClick={closeMenu}>
              Locations
            </a>
            <a href="#specialty" onClick={closeMenu}>
              Specialty
            </a>
            <a href="#machines" onClick={closeMenu}>
              Machines
            </a>
            <a href="#contact" className="nav-cta" onClick={closeMenu}>
              Host a Machine
            </a>
          </nav>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-label="Venegas Vending">
          <div className="hero-media" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=2000&q=80"
              alt=""
              width={2000}
              height={1333}
            />
            <div className="hero-veil" />
          </div>
          <div className="hero-content">
            <h1 className="hero-brand">
              Venegas
              <br />
              <em>Vending</em>
            </h1>
            <p className="hero-headline">
              Premium machines for DFW businesses — built to become the industry standard.
            </p>
            <p className="hero-sub">
              We place, stock, and service vending that fits your space — from everyday snacks to
              high-end specialty.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">
                Request a Machine
              </a>
              <a className="btn btn-ghost" href="#machines">
                Explore Machines
              </a>
            </div>
          </div>
        </section>

        <section id="placement" className="section placement">
          <div className="wrap">
            <Reveal>
              <p className="section-label">What we do</p>
              <h2 className="section-title">We place machines where people already gather.</h2>
            </Reveal>
            <div className="placement-grid">
              <Reveal className="placement-visual" delay={1}>
                <img
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern retail corridor ready for a vending placement"
                  width={1200}
                  height={1500}
                  loading="lazy"
                />
              </Reveal>
              <Reveal className="placement-copy" delay={2}>
                <p>
                  Venegas Vending partners with local DFW businesses to install turnkey snack and
                  specialty machines. You provide the foot traffic — we handle the rest: placement,
                  restocking, maintenance, and product strategy that matches your audience.
                </p>
                <ul className="placement-points">
                  <li>
                    <strong>Zero hassle for hosts</strong>
                    We own, stock, and service every machine on your floor.
                  </li>
                  <li>
                    <strong>Built for your crowd</strong>
                    Product mixes tailored to offices, campuses, nightlife, and care facilities.
                  </li>
                  <li>
                    <strong>Scaling beyond DFW</strong>
                    Today Dallas–Fort Worth. Tomorrow, nationwide routes and a household name.
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="locations" className="section locations">
          <div className="wrap">
            <Reveal>
              <p className="section-label">Where we go</p>
              <h2 className="section-title">Not limited to break rooms.</h2>
              <p className="section-lead">
                If people pass through, we can place a machine — including spaces most operators
                overlook.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <ul className="location-list">
                {LOCATIONS.map((loc) => (
                  <li key={loc.name}>
                    {loc.name}
                    <span>{loc.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="specialty" className="section specialty">
          <div className="wrap">
            <div className="specialty-intro">
              <Reveal>
                <p className="section-label">What we stock</p>
                <h2 className="section-title">Beyond chips and soda.</h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="section-lead">
                  Standard snacks stay on the menu — and we layer in specialty products that turn a
                  machine into a destination.
                </p>
              </Reveal>
            </div>
            <div className="specialty-rail">
              {SPECIALTY.map((item, i) => (
                <Reveal key={item.title} className="specialty-item" delay={Math.min(i, 3)}>
                  <div className="thumb">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={800}
                      height={1067}
                      loading="lazy"
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="machines" className="machines">
          <div className="wrap">
            <Reveal className="machines-header">
              <p className="section-label">Our machines</p>
              <h2 className="section-title">From classic snack banks to Japan-style smart units.</h2>
              <p className="section-lead">
                Choose the experience that fits your property — or ask us to design a mix.
              </p>
            </Reveal>

            <div className="machine-rows">
              <article className="machine-row">
                <Reveal className="machine-text">
                  <span className="machine-tag">Core fleet</span>
                  <h3>Standard snack & beverage machines</h3>
                  <p>
                    Reliable, high-capacity machines stocked with the classics your people expect —
                    chips, candy, energy drinks, water, and more.
                  </p>
                  <ul>
                    <li>Cashless and card-ready payment</li>
                    <li>Scheduled restocking and remote monitoring</li>
                    <li>Ideal for offices, schools, and shared spaces</li>
                  </ul>
                </Reveal>
                <Reveal className="machine-media" delay={1}>
                  <img
                    src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1400&q=80"
                    alt="Stocked snack and beverage retail display"
                    width={1400}
                    height={963}
                    loading="lazy"
                  />
                </Reveal>
              </article>

              <article className="machine-row reverse">
                <Reveal className="machine-text">
                  <span className="machine-tag">Premium</span>
                  <h3>High-end specialty vending</h3>
                  <p>
                    Elevated cabinets for flowers, champagne, emergency kits, and curated late-night
                    assortments — designed for malls, hospitality, and nightlife.
                  </p>
                  <ul>
                    <li>Temperature-aware product strategies</li>
                    <li>Merchandising that matches your brand</li>
                    <li>Higher perceived value per location</li>
                  </ul>
                </Reveal>
                <Reveal className="machine-media" delay={1}>
                  <img
                    src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1400&q=80"
                    alt="Premium specialty products ready for display"
                    width={1400}
                    height={963}
                    loading="lazy"
                  />
                </Reveal>
              </article>

              <article className="machine-row">
                <Reveal className="machine-text">
                  <span className="machine-tag select">Select customers</span>
                  <h3>Japan-style smart machines</h3>
                  <p>
                    Next-generation smart vending inspired by Japan&apos;s seamless retail
                    experience — touch interfaces, dynamic inventory, and a polished presence that
                    signals the future of the industry.
                  </p>
                  <ul>
                    <li>Available to select Venegas partners</li>
                    <li>Showcase-ready for flagship locations</li>
                    <li>Part of our nationwide growth roadmap</li>
                  </ul>
                  <a className="btn btn-solid" href="#contact" style={{ marginTop: '1.25rem' }}>
                    Inquire for access
                  </a>
                </Reveal>
                <Reveal className="machine-media" delay={1}>
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80"
                    alt="Modern smart technology interface representing next-gen vending"
                    width={1400}
                    height={963}
                    loading="lazy"
                  />
                </Reveal>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact-bg" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
              alt=""
              width={2000}
              height={1333}
              loading="lazy"
            />
          </div>
          <div className="contact-veil" aria-hidden="true" />
          <div className="wrap contact-inner">
            <Reveal>
              <p className="section-label">DFW & beyond</p>
              <h2 className="section-title">Ready to host Venegas Vending?</h2>
              <p className="section-lead">
                Tell us about your location. We&apos;ll recommend the right machine mix — standard,
                specialty, or select smart units — and handle the rest.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <a className="contact-email" href="mailto:Elizabeth@venegasvending.com">
                <small>Email Elizabeth</small>
                <strong>Elizabeth@venegasvending.com</strong>
              </a>
              <p className="contact-note">
                Serving the Dallas–Fort Worth metroplex · venegasvending.com
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            Venegas<span>Vending</span>
          </div>
          <p className="footer-meta">
            © {new Date().getFullYear()} Venegas Vending · DFW Area ·{' '}
            <a href="mailto:Elizabeth@venegasvending.com">Elizabeth@venegasvending.com</a>
          </p>
        </div>
      </footer>
    </>
  )
}
