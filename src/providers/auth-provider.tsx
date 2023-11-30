"use client"
import { useStateValue } from '@/src/context/state-provider'
import CustomLoader from "@/src/components/loaders/custom-loader"
import { useLocalStorage } from 'react-use';
import { ManagerRes } from '../types';
import LoginForm from '../components/forms/login-form';



export default function AuthProvider({ children }: { children: React.ReactNode; }) {
    const [{ user }] = useStateValue()
    const [ localUser, setLocalUser, ] = useLocalStorage<ManagerRes | null>("user", null )

    console.log(localUser)

    if (!localUser) {
        return <LoginForm />
    }

    return (
        <>
            {children}
        </>
    )
}