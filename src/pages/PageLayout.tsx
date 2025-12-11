import type { ReactNode } from 'react'
import { NavigationBar } from '../components/NavigationBar'

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full ">
      <NavigationBar />
      <div>{children}</div>
    </div>
  )
}
