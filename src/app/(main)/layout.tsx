import type { Metadata } from 'next'

import { AuthProvider, ContextProvider, ViewProvider } from '../../providers'
import Sidebar from '@/src/components/navigation/sidebar'

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
                <main className='w-full h-screen flex max-h-screen max-w-screen'>
                    <Sidebar />
                    <section className='w-full h-full max-h-full p-8 overflow-auto'>

                        {children}
                    </section>
                </main>
            </AuthProvider>
        </ViewProvider>
    )
}