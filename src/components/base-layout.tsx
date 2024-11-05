'use client'
import { Button, Navbar } from '@/components/justd/ui'
import { Apple, User2, Calendar1, Search } from 'lucide-react'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <Navbar intent="inset">
      <Navbar.Nav>
        <Navbar.Logo href="#">
          <Apple className="size-5" />
          <span className="font-medium">Nutriwell</span>
        </Navbar.Logo>
        <Navbar.Section>
          <Navbar.Item href="/patients">
            <User2 className="size-4" />
            Patients
          </Navbar.Item>
          <Navbar.Item isCurrent href="/appointments">
            <Calendar1 className="size-4" />
            Appointments
          </Navbar.Item>
        </Navbar.Section>
      </Navbar.Nav>
      <Navbar.Compact>
        <Navbar.Flex>
          <Navbar.Trigger className="-ml-2" />
        </Navbar.Flex>
        <Navbar.Flex>
          <Navbar.Flex>
            <Button appearance="plain" size="square-petite" aria-label="Search for products">
              <Search />
            </Button>
          </Navbar.Flex>
        </Navbar.Flex>
      </Navbar.Compact>
      <Navbar.Inset>{children}</Navbar.Inset>
    </Navbar>
  )
}
