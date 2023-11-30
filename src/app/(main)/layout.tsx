import type { Metadata } from 'next'

import { AuthProvider, ContextProvider, ViewProvider } from '../../providers'

export const metadata: Metadata = {
    title: 'Wastify Manager',
    description: 'Manager Dashboard for wastify',
}


export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ViewProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ViewProvider>
    )
}