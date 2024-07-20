import { ReactNode } from 'react';
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './modetoggle';
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative">
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        
    </>
  )
};

export default Layout;
