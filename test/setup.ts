import '@testing-library/jest-dom'

// Mock para matchMedia (necessário para alguns componentes)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false,
    }),
})

// Mock para IntersectionObserver (usado pelo Framer Motion)
class MockIntersectionObserver {
    observe = () => null
    disconnect = () => null
    unobserve = () => null
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
})

// Mock para scrollTo
Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: () => { },
})
