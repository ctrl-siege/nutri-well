'use client'
import { useState, Suspense } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'
import { 
  Upload, 
  ClipboardList, 
  Check, 
  Pencil, 
  X,
  Apple,
  Ruler,
  FlaskConical,
  Stethoscope,
  History,
  LineChart,
} from 'lucide-react'
import { Content } from '@tiptap/react'
import dynamic from 'next/dynamic'

// Loading skeleton component for the editor
const EditorSkeleton = () => (
  <div className="animate-pulse space-y-3 rounded-lg border p-4">
    <div className="h-5 w-24 bg-gray-200 rounded"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
)

const MinimalTiptapEditor = dynamic(
  () => import('./minimal-tiptap').then((mod) => mod.MinimalTiptapEditor),
  {
    ssr: false,
    loading: () => <EditorSkeleton />,
  },
)

interface AssessmentSection {
  id: string
  title: string
  placeholder: string
  icon: LucideIcon
  metrics?: { label: string; key: string; suffix?: string }[]
}

interface EditState {
  height: boolean
  weight: boolean
  bmi: boolean
  [key: string]: boolean
}

interface EditedInfo {
  height: string
  weight: string
  bmi: string
  [key: string]: string
}

// Extract assessment sections configuration
const ASSESSMENT_SECTIONS: AssessmentSection[] = [
  {
    id: 'fh',
    title: 'Food/Nutrition-Related History',
    placeholder: 'Enter food and nutrition-related history',
    icon: Apple,
  },
  {
    id: 'ad',
    title: 'Anthropometric Measurements',
    placeholder: 'Enter additional anthropometric measurements and notes',
    icon: Ruler,
    metrics: [
      { label: 'Height', key: 'height', suffix: '' },
      { label: 'Weight', key: 'weight', suffix: '' },
      { label: 'BMI', key: 'bmi', suffix: '' },
    ],
  },
  {
    id: 'bd',
    title: 'Biochemical Data, Medical Tests, and Procedures',
    placeholder: 'Enter biochemical data and medical test results',
    icon: FlaskConical,
  },
  {
    id: 'pd',
    title: 'Nutrition-Focused Physical Findings',
    placeholder: 'Enter nutrition-focused physical examination findings',
    icon: Stethoscope,
  },
  {
    id: 'ch',
    title: 'Client History',
    placeholder: 'Enter client history information',
    icon: History,
  },
  {
    id: 'at',
    title: 'Assessment, Monitoring and Evaluation Tools',
    placeholder: 'Enter assessment and monitoring information',
    icon: LineChart,
  },
]

// Create a reusable FileUpload component
const FileUpload = ({ id }: { id: string }) => (
  <div className="space-y-2">
    <Label>Attachments</Label>
    <div className="border-2 border-dashed rounded-lg p-4">
      <label htmlFor={`${id}-file`} className="flex flex-col items-center gap-2 cursor-pointer">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Upload files or drag and drop</span>
        <input id={`${id}-file`} type="file" className="hidden" multiple />
      </label>
    </div>
  </div>
)

export default function NutritionAssessment() {
	const [value, setValue] = useState<Content>('')
  const [editingFields, setEditingFields] = useState<EditState>({
    height: false,
    weight: false,
    bmi: false,
  })

  const [editedInfo, setEditedInfo] = useState<EditedInfo>({
    height: '180 cm',
    weight: '75 kg',
    bmi: '23.1',
  })

  const [filledFields, setFilledFields] = useState<Record<string, boolean>>({
    fh: false,
    ad: false,
    bd: false,
    pd: false,
    ch: false,
    at: false,
  })

  const [textValues, setTextValues] = useState<Record<string, string>>({
    fh: '',
    ad: '',
    bd: '',
    pd: '',
    ch: '',
    at: '',
  })

  const handleSaveField = (field: keyof EditState) => {
    setEditingFields((prev) => ({ ...prev, [field]: false }))
  }

  const handleCancelField = (field: keyof EditState) => {
    setEditingFields((prev) => ({ ...prev, [field]: false }))
  }

  const handleTextAreaChange = (field: string, value: string) => {
    setTextValues((prev) => ({
      ...prev,
      [field]: value,
    }))
    setFilledFields((prev) => ({
      ...prev,
      [field]: value.trim().length > 0,
    }))
  }

  // Add validation and BMI calculation
  const calculateBMI = (height: string, weight: string) => {
    const heightInM = parseFloat(height) / 100 // convert cm to m
    const weightInKg = parseFloat(weight)
    
    if (!isNaN(heightInM) && !isNaN(weightInKg) && heightInM > 0) {
      const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1)
      setEditedInfo(prev => ({ ...prev, bmi }))
    }
  }

  const handleMetricChange = (key: string, value: string) => {
    setEditedInfo(prev => ({ ...prev, [key]: value }))
    
    // Calculate BMI when height or weight changes
    if (key === 'height' || key === 'weight') {
      const height = key === 'height' ? value : editedInfo.height
      const weight = key === 'weight' ? value : editedInfo.weight
      calculateBMI(height, weight)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ASSESSMENT_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-4 pb-4">
            <div className="flex items-center gap-2 bg-neutral-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50">
                <section.icon className="h-4 w-4 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>

            <div className="pl-6 space-y-4 h-full">
              {section.metrics ? (
                // Section with metrics (Anthropometric)
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-3 gap-4">
                    {section.metrics.map(({ label, key, suffix }) => (
                      <div key={key} className="space-y-1">
                        <Label>{label}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={editedInfo[key].split(' ')[0]}
                            onChange={(e) => {
                              const value = e.target.value
                              const unit = key === 'height' ? 'cm' : key === 'weight' ? 'kg' : ''
                              handleMetricChange(key, `${value}${unit ? ` ${unit}` : ''}`)
                            }}
                            className="h-auto text-lg font-medium"
                            type="number"
                            step={key === 'height' ? '1' : '0.1'}
                            min="0"
                            disabled={key === 'bmi'}
                          />
                          <span className="text-sm text-gray-500 w-8">
                            {key === 'height' ? 'cm' : key === 'weight' ? 'kg' : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 mt-4">
                    <Suspense fallback={<EditorSkeleton />}>
                      <MinimalTiptapEditor
                        value={value}
                        onChange={setValue}
                        className="w-full h-[200px]" // Fixed height for editor
                        editorContentClassName="py-1 px-3"
                        output="html"
                        placeholder={section.placeholder}
                        editable={true}
                        editorClassName="focus:outline-none"
                      />
                    </Suspense>
                  </div>
                </div>
              ) : (
                // Sections without metrics
                <div className="h-[286px]"> {/* Fixed height container for consistency */}
                  <Suspense fallback={<EditorSkeleton />}>
                    <MinimalTiptapEditor
                      value={value}
                      onChange={setValue}
                      className="w-full h-full"
                      editorContentClassName="py-1 px-3"
                      output="html"
                      placeholder={section.placeholder}
                      editable={true}
                      editorClassName="focus:outline-none"
                    />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Save Assessment</Button>
      </div>
    </div>
  )
}
