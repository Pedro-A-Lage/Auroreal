import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-8 text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Ops! Algo deu errado.</h1>
                    <div className="bg-gray-100 p-6 rounded-lg max-w-2xl w-full overflow-auto text-left border border-gray-300 shadow-md">
                        <p className="font-mono text-sm text-red-800 font-bold mb-2">
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <div className="h-px bg-gray-300 my-4"></div>
                        <details className="cursor-pointer">
                            <summary className="font-semibold text-gray-700 mb-2">Detalhes técnicos (Clique para ver)</summary>
                            <pre className="font-mono text-xs text-gray-600 whitespace-pre-wrap">
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    </div>
                    <p className="mt-8 text-gray-600">
                        Por favor, tire um print desta tela e envie para o suporte.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Recarregar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
