import { DataTableDemo } from '@/components/data-table'

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-4xl font-bold">Patients</header>
        <DataTableDemo />
      </div>
    </div>
  )
}
