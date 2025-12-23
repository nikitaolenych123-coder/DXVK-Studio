import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertOctagon, RefreshCw } from 'lucide-react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center text-slate-200">
          <div className="bg-slate-900 border border-red-900/50 rounded-xl p-8 max-w-lg shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <AlertOctagon className="w-8 h-8 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold mb-4 font-display">Something went wrong</h1>
            <p className="text-slate-400 mb-6">
              DXVK Studio encountered an unexpected error.
            </p>

            {this.state.error && (
              <div className="bg-slate-950 p-4 rounded-lg mb-6 text-left overflow-auto max-h-40 border border-slate-800">
                <code className="text-red-400 font-mono text-sm break-all">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
