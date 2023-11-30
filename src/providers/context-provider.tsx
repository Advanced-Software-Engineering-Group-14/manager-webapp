"use client"
import { StateProvider } from "@/src/context/state-provider"
import reducer from "@/src/context/reducer"
import initialState from "@/src/context/initial-state"

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <StateProvider reducer={reducer} initialState={initialState}>
                {children}
            </StateProvider>
        </>
    )
}