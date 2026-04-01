import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

const timelineEvents = [
  {
    title: 'Kickoff and Discovery',
    date: 'Jan 12, 2026',
    details:
      'Aligned stakeholders, gathered goals, and mapped the product narrative for phase one delivery.',
  },
  {
    title: 'UX Wireframes and Validation',
    date: 'Feb 03, 2026',
    details:
      'Built click-through wireframes and validated page flow with key customer representatives.',
  },
  {
    title: 'Core Build Sprint',
    date: 'Feb 28, 2026',
    details:
      'Implemented core modules, responsive interface layers, and deployment automation to GitHub Pages.',
  },
  {
    title: 'Client Review and Tuning',
    date: 'Mar 20, 2026',
    details:
      'Addressed review feedback, polished visual details, and improved first-load performance.',
  },
  {
    title: 'Go Live',
    date: 'Apr 01, 2026',
    details:
      'Released production-ready version with timeline and release notes for transparent project communication.',
  },
]

const releases = [
  {
    version: 'v1.2.0',
    date: 'Apr 01, 2026',
    highlights: [
      'Introduced dedicated Timeline and Release Notes pages.',
      'Applied full responsive redesign with brand-driven color palette.',
      'Added GitHub Pages publish workflow and manual publish command.',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'Mar 25, 2026',
    highlights: [
      'Optimized images and load sequence for smoother first paint.',
      'Refined spacing scale and typography for readability.',
      'Improved metadata and favicon setup.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'Mar 10, 2026',
    highlights: [
      'Initial baseline release with React and Vite foundation.',
      'Prepared build pipeline and TypeScript project configuration.',
      'Established reusable styling tokens and structure.',
    ],
  },
]

const okidokiLogo = `${import.meta.env.BASE_URL}okidoki.png`
const overleapLogo = `${import.meta.env.BASE_URL}overleaplogo.png`

function TimelinePage() {
  return (
    <section className="page-section" aria-labelledby="timeline-heading">
      <div className="page-head">
        <p className="eyebrow">Project Journey</p>
        <h1 id="timeline-heading">Timeline</h1>
        <p className="intro">
          A clear view of milestones, decisions, and delivery moments from discovery to launch.
        </p>
      </div>

      <ol className="timeline-list">
        {timelineEvents.map((event) => (
          <li key={event.title} className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />
            <article className="timeline-card">
              <p className="timeline-date">{event.date}</p>
              <h2>{event.title}</h2>
              <p>{event.details}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ReleaseNotesPage() {
  return (
    <section className="page-section" aria-labelledby="release-notes-heading">
      <div className="page-head">
        <p className="eyebrow">Product Updates</p>
        <h1 id="release-notes-heading">Release Notes</h1>
        <p className="intro">
          Version-by-version notes describing improvements, changes, and newly delivered capabilities.
        </p>
      </div>

      <div className="release-grid">
        {releases.map((release) => (
          <article key={release.version} className="release-card">
            <div className="release-meta">
              <h2>{release.version}</h2>
              <p>{release.date}</p>
            </div>
            <ul>
              {release.highlights.map((item) => (
                <li key={`${release.version}-${item}`}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="site-shell">
      <div className="ambient" aria-hidden="true" />

      <header className="site-header">
        <div className="brand-row">
          <img className="brand-logo client" src={okidokiLogo} alt="OKI-DOKI company logo" />
          <span className="badge">Built by</span>
          <img className="brand-logo dev" src={overleapLogo} alt="Overleap development team logo" />
        </div>

        <nav className="top-nav" aria-label="Primary">
          <NavLink
            to="/timeline"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Timeline
          </NavLink>
          <NavLink
            to="/release-notes"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Release Notes
          </NavLink>
        </nav>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Navigate to="/timeline" replace />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/release-notes" element={<ReleaseNotesPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>Time line project updates by Overleap for OKI-DOKI.</p>
      </footer>
    </div>
  )
}

export default App
