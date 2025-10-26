export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Project Not Found</h2>
        <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
        <a
          href="/#projects"
          className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-semibold transition-all"
        >
          Back to Projects
        </a>
      </div>
    </div>
  )
}
