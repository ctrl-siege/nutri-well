'use client'
import { Tabs as JustDTabs } from '@/components/justd/ui'
import {
  Pencil,
  Check,
  X,
  Calendar,
  Clock,
  UserCircle,
  Mail,
  Building2,
  Users,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select31, Select31Item } from '@/components/select-with-overlapping-label'
import PatientOverview from '@/components/patient-overview'
import NutritionDiagnosis from '@/components/nutrition-diagnosis'
import NutritionAssessment from '@/components/nutrition-assessment'
import NutritionIntervention from '@/components/nutrition-intervention'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Input31 from '@/components/input-with-overlapping-label'

interface PatientInfo {
  firstName: string
  lastName: string
  age: number
  birthDate: string
  gender: string
  email: string
  department: string
  avatarUrl: string | null
}

export default function PatientRecord() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    firstName: 'Sarah',
    lastName: 'Johnson',
    age: 21,
    birthDate: '2002-05-15',
    gender: 'Female',
    email: 'sarah.johnson@university.edu',
    department: 'College of Nursing',
    avatarUrl: null,
  })

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back Button and Profile Section Container */}
      <div className="space-y-4">
        {/* Profile Quick View */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4">
            <div className="flex items-start gap-6">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <div className="relative">
                  {patientInfo.avatarUrl ? (
                    <img
                      src={patientInfo.avatarUrl}
                      alt={patientInfo.name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center">
                      <UserCircle className="h-12 w-12 text-neutral-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Patient Information */}
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <Input31
                        value={patientInfo.firstName}
                        onChange={(e) =>
                          setPatientInfo((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                            name: `${e.target.value} ${prev.lastName}`,
                          }))
                        }
                        className="text-xl font-semibold"
                        label="First Name"
                      />
                      <Input31
                        value={patientInfo.lastName}
                        onChange={(e) =>
                          setPatientInfo((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                            name: `${prev.firstName} ${e.target.value}`,
                          }))
                        }
                        className="text-xl font-semibold"
                        label="Last Name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1">
                        <Select31
                          label="Gender"
                          value={patientInfo.gender}
                          onValueChange={(value) =>
                            setPatientInfo((prev) => ({ ...prev, gender: value }))
                          }
                        >
                          <Select31Item value="Male">Male</Select31Item>
                          <Select31Item value="Female">Female</Select31Item>
                          <Select31Item value="Other">Other</Select31Item>
                        </Select31>
                      </div>
                      <div className="space-y-1">
                        <Input31
                          label="Birth Date"
                          type="date"
                          value={patientInfo.birthDate}
                          onChange={(e) =>
                            setPatientInfo((prev) => ({ ...prev, birthDate: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        {/* <label className="text-xs text-gray-500">Department</label> */}
                        <Input31
                          label="College Department"
                          value={patientInfo.department}
                          onChange={(e) =>
                            setPatientInfo((prev) => ({ ...prev, department: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Input31
                          label="Email"
                          type="email"
                          value={patientInfo.email}
                          onChange={(e) =>
                            setPatientInfo((prev) => ({ ...prev, email: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                      {patientInfo.firstName} {patientInfo.lastName}
                    </h1>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mt-2">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{patientInfo.gender}</span>
                      </div>
                      <div className="flex items-center text-gray-500 group">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{patientInfo.age} years old</span>
                        <span className="ml-1 text-xs text-gray-400 group-hover:text-gray-600">
                          (Born {new Date(patientInfo.birthDate).toLocaleDateString()})
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span>{patientInfo.department}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="truncate">{patientInfo.email}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Edit/Save Buttons */}
              <div className="flex-shrink-0">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={handleSave}>
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <JustDTabs aria-label="Patient Records">
        <JustDTabs.List>
          <JustDTabs.Tab id="w">
            <Pencil className="size-4 mr-2" /> Patient Overview
          </JustDTabs.Tab>
          <JustDTabs.Tab id="n">
            <Check className="size-4 mr-2" /> Nutrition Assessment
          </JustDTabs.Tab>
          <JustDTabs.Tab id="t">
            <Clock className="size-4 mr-2" /> Nutrition Diagnosis
          </JustDTabs.Tab>
          <JustDTabs.Tab id="td">
            <Clock className="size-4 mr-2" /> Nutrition Intervention
          </JustDTabs.Tab>
          <JustDTabs.Tab id="m">
            <Clock className="size-4 mr-2" /> Monitoring
          </JustDTabs.Tab>
        </JustDTabs.List>

        <JustDTabs.Panel id="w">
          <PatientOverview />
        </JustDTabs.Panel>
        <JustDTabs.Panel id="n">
          <NutritionAssessment />
        </JustDTabs.Panel>
        <JustDTabs.Panel id="t">
          <NutritionDiagnosis />
        </JustDTabs.Panel>
        <JustDTabs.Panel id="td">
          <NutritionIntervention />
        </JustDTabs.Panel>
      </JustDTabs>
    </div>
  )
}
