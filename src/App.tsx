import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import {
  buildTimelineData,
  type TaskEntry,
} from './timeline-data'
import { backlogSections } from './backlog-data'

const okidokiLogo = `${import.meta.env.BASE_URL}okidoki.png`
const overleapLogo = `${import.meta.env.BASE_URL}overleaplogo.png`

const timelineData = buildTimelineData()
const scheduledTaskIds = new Set(
  timelineData.flatMap((event) => event.tasks.map((task) => task.id)),
)
const visibleBacklogSections = backlogSections.map((section) => ({
  ...section,
  items: section.items.filter((item) => !scheduledTaskIds.has(item.id)),
}))

function taskDotClass(tag: TaskEntry['tag']) {
  return `task-dot task-dot-${tag.replace(' ', '-')}`
}

function TagLegend() {
  return (
    <section className="legend-strip" aria-label="Tag color meaning">
      <p className="legend-title">Color Meaning</p>
      <ul>
        <li>
          <span className="task-dot task-dot-bug" aria-hidden="true" />
          Bug
        </li>
        <li>
          <span className="task-dot task-dot-ad-hoc" aria-hidden="true" />
          Ad hoc
        </li>
        <li>
          <span className="task-dot task-dot-new-feature" aria-hidden="true" />
          New changes
        </li>
        <li>
          <span className="task-dot task-dot-improvement" aria-hidden="true" />
          Improvement
        </li>
      </ul>
    </section>
  )
}

function TimelinePage() {
  return (
    <section className="page-section" aria-labelledby="timeline-heading">
      <div className="page-head">
        <p className="eyebrow">Project Journey</p>
        <h1 id="timeline-heading">Timeline</h1>
        <p className="intro intro-full-width">
          This timeline presents upcoming release dates, planned deliverables, and task progress in one clear view to support transparent client communication.
        </p>
      </div>

      <ol className="timeline-list">
        {timelineData.map((event) => (
          <li key={event.date} className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />
            <article className="timeline-card">
              <p
                className={
                  event.totalTaskHours > event.capacityHours
                    ? 'timeline-date timeline-date-over'
                    : 'timeline-date timeline-date-ok'
                }
              >
                {event.date}
              </p>
              <h2>Release Window</h2>
              <ul className="mini-task-list">
                {event.tasks.map((task) => (
                  <li key={task.id}>
                    <span className="task-label">
                      <span className={taskDotClass(task.tag)} aria-hidden="true" />
                      <span className="task-id">{task.id}</span>
                      <span className="task-separator"> - </span>
                      <span className="task-title">{task.title}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

function BacklogPage() {
  return (
    <section className="page-section" aria-labelledby="backlog-heading">
      <div className="page-head">
        <p className="eyebrow">Work Queue</p>
        <h1 id="backlog-heading">Backlog</h1>
        <p className="intro">The backlog is split into separate bug, improvement, new changes, and ad hoc sections.</p>
      </div>

      <div className="backlog-accordion-group">
        {visibleBacklogSections.map((section) => (
          <details key={section.key} className="backlog-accordion" open={section.key === 'bug'}>
            <summary className="backlog-summary">
              <span className="task-label">
                <span className={section.dotClass} aria-hidden="true" />
                <span className={section.titleClass}>{section.label}</span>
              </span>
              <span className="backlog-summary-count">{section.items.length} items</span>
            </summary>
            <div className="backlog-panel">
              <div className="backlog-item-list">
                {section.items.map((item) => (
                  <article key={item.id} className="backlog-item">
                    <p className="backlog-id">{item.id}</p>
                    <h2>{item.title}</h2>
                  </article>
                ))}
              </div>
            </div>
          </details>
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
            to="/backlog"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Backlog
          </NavLink>
        </nav>
      </header>

      <main className="site-main">
        <TagLegend />
        <Routes>
          <Route path="/" element={<Navigate to="/timeline" replace />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/backlog" element={<BacklogPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>Updates by Overleap for OKI-DOKI</p>
      </footer>
    </div>
  )
}

export default App
