import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import {
  buildTimelineData,
  releaseDatesData,
  tasksData,
  type TaskEntry,
} from './timeline-data'

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

const timelineData = buildTimelineData()

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
          New feature
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
                      {task.title}
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

function ReleaseDatesPage() {
  return (
    <section className="page-section" aria-labelledby="release-dates-heading">
      <div className="page-head">
        <p className="eyebrow">Data Page</p>
        <h1 id="release-dates-heading">Release Dates</h1>
        <p className="intro">Each date includes release capacity as number of available hours.</p>
      </div>

      <div className="data-grid">
        {releaseDatesData.map((item) => (
          <article key={item.date} className="data-card">
            <p className="timeline-date">{item.date}</p>
            <h2>{item.capacityHours} Hours Capacity</h2>
          </article>
        ))}
      </div>
    </section>
  )
}

function TasksPage() {
  return (
    <section className="page-section" aria-labelledby="tasks-heading">
      <div className="page-head">
        <p className="eyebrow">Data Page</p>
        <h1 id="tasks-heading">Tasks</h1>
        <p className="intro">Task title, required hours, and tag: bug, improvement, ad hoc, or new feature.</p>
      </div>

      <div className="task-table-wrap">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {tasksData.map((task) => (
              <tr key={task.id}>
                <td>
                  <span className="task-label">
                    <span className={taskDotClass(task.tag)} aria-hidden="true" />
                    {task.title}
                  </span>
                </td>
                <td>{task.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function PlannedReleasesPage() {
  return (
    <section className="page-section" aria-labelledby="planned-releases-heading">
      <div className="page-head">
        <p className="eyebrow">Data Page</p>
        <h1 id="planned-releases-heading">Planned Releases</h1>
        <p className="intro">Each date lists all related tasks from the Tasks page data.</p>
      </div>

      <div className="planned-stack">
        {timelineData.map((entry) => (
          <article key={entry.date} className="planned-card">
            <h2>{entry.date}</h2>
            <p>
              Capacity: {entry.capacityHours}h | Planned: {entry.totalTaskHours}h
            </p>
            <ul>
              {entry.tasks.map((task) => (
                <li key={task.id}>
                  <span className="task-label">
                    <span className={taskDotClass(task.tag)} aria-hidden="true" />
                    {task.title}
                  </span>
                  <span>{task.hours}h</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
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
        <TagLegend />
        <Routes>
          <Route path="/" element={<Navigate to="/timeline" replace />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/release-dates" element={<ReleaseDatesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/planned-releases" element={<PlannedReleasesPage />} />
          <Route path="/release-notes" element={<ReleaseNotesPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>Updates by Overleap for OKI-DOKI</p>
      </footer>
    </div>
  )
}

export default App
