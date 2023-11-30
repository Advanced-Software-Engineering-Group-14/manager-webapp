"use client"
import { useLocalStorage, useMedia } from 'react-use';
import { ManagerRes } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from "next/navigation"


type NavLink = {
    icon: React.ReactNode
    href: string
    label: string
}

const baseLinks: NavLink[] = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>,
        href: "/",
        label: "Dashboard"
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
      ,
        href: "/drivers",
        label: "Drivers"
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
      ,
        href: "/homeowners",
        label: "Homeowners"
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      ,
        href: "/settings",
        label: "Settings"
    },
]

const sudoLinks: NavLink[] = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
      </svg>
      ,
        href: "/sudo",
        label: "Sudo"
    },
]

export default function Sidebar() {
    const [localUser, setLocalUser, removeLocalUser] = useLocalStorage<ManagerRes | null>("user", null)
    const canShowText = useMedia('(min-width: 1280px)', false);

    const pathname = usePathname()
    
    function isActive(href: string): boolean {
        return pathname === href
    }

    function onLogout() {
        removeLocalUser()
        if (typeof window !== "undefined") {
            location.reload()
        }
    }

    console.log(pathname)

    const NAVLINKS = localUser && localUser.role ? (localUser?.role === "ADMIN" ? baseLinks : [...baseLinks, ...sudoLinks]) : baseLinks

    return (
        <nav className={cn(
            'flex flex-col justify-between  max-w-[250px] py-4 h-full border ',
            canShowText ? "w-full " : "w-max "
        )}>
            <div className='flex flex-col border-b pb-4 border-neutral-100'>
                <div className='flex flex-col w-full justify-center items-center gap-2'>
                    <Avatar className="w-[50px] h-[50px]">
                        <AvatarFallback>
                            WM
                        </AvatarFallback>
                    </Avatar>
                    <h1 className='tracking-tighter font-semibold text-xl'>
                        {canShowText && "Wastify Manager"}
                    </h1>
                </div>

                {
                    canShowText &&
                    <p className='text-xs text-neutral-500 text-center'>
                        {format(new Date(), canShowText ? "PPPP" : "P")}
                        {/* yyyy-MM-dd'T'HH:mm:ss.SSSxxx */}
                    </p>
                }
            </div>

            <div className='w-full flex flex-col gap-2 mb-auto mt-4 px-2'>
                {
                    NAVLINKS.map((item) => (
                        <Link href={item.href} key={item.href}>
                            <div className={cn(
                                "w-full py-3 text-neutral-600 hover:bg-neutral-50 rounded-lg flex items-center px-4 gap-2",
                                isActive(item.href) ? "bg-neutral-100 text-neutral-800" : ""
                            )}>
                                <p>

                                {item.icon}
                                </p>

                                {
                                    canShowText &&
                                <p className='tracking-tighter text-sm'>
                                {item.label}
                                </p>
                                }

                            </div>
                        </Link>
                    ))
                }
            </div>

            <div className='px-2 '>
                <Button onClick={onLogout} className='w-full text-left flex  gap-2 '>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>

                    {canShowText && <p className="text-base font-normal  tracking-tighter">Logout</p>}
                </Button>

            </div>

        </nav>
    )
}