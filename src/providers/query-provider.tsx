"use client"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

interface Props {
    children: React.ReactNode
}

const queryClient = new QueryClient()

export default function QueryProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}