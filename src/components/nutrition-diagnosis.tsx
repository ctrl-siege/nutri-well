'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ClipboardList, PlusCircle, Apple, Brain, Activity, MoreHorizontal } from 'lucide-react'
import { Label } from '@/components/ui/label'

interface DomainNotes {
  intake: string
  clinical: string
  behavioral: string
  other: string
}

interface PESStatement {
  id: string
  problem: string
  etiology: string
  signs: string
}

interface DiagnosisData {
  nutritionProblems: Array<{
    id: string
    domain: string
    content: string
  }>
  pesStatements: Array<PESStatement>
}

export default function NutritionDiagnosis() {
  const [domainNotes, setDomainNotes] = useState<DomainNotes>({
    intake: '',
    clinical: '',
    behavioral: '',
    other: '',
  })

  const [diagnosisSections, setDiagnosisSections] = useState<DiagnosisData>({
    nutritionProblems: [
      {
        id: '1',
        domain: 'NI',
        content: 'Excessive energy intake',
      },
      {
        id: '2',
        domain: 'NI',
        content: 'Undesirable food choice(s)',
      },
      {
        id: '3',
        domain: 'NI',
        content: 'Excessive bioactive substance (alcohol) intake',
      },
    ],
    pesStatements: [
      {
        id: '1',
        problem: '',
        etiology: '',
        signs: '',
      },
    ],
  })

  return (
    <div className="space-y-8">
      {/* Domain Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intake Domain */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center gap-2 bg-neutral-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50">
              <Apple className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold">Intake Domain (NI)</h3>
          </div>
          <div className="pl-6">
            <Textarea
              value={domainNotes.intake}
              onChange={(e) =>
                setDomainNotes((prev) => ({
                  ...prev,
                  intake: e.target.value,
                }))
              }
              placeholder="Enter intake domain findings (Food/Nutrition, Fluid, Bioactive Substances)..."
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>

        {/* Clinical Domain */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center gap-2 bg-neutral-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-50">
              <Brain className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Clinical Domain (NC)</h3>
          </div>
          <div className="pl-6">
            <Textarea
              value={domainNotes.clinical}
              onChange={(e) =>
                setDomainNotes((prev) => ({
                  ...prev,
                  clinical: e.target.value,
                }))
              }
              placeholder="Enter clinical domain findings (Functional, Biochemical, Weight)..."
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>

        {/* Behavioral Domain */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center gap-2 bg-neutral-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50">
              <Activity className="h-4 w-4 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold">Behavioral-Environmental Domain (NB)</h3>
          </div>
          <div className="pl-6">
            <Textarea
              value={domainNotes.behavioral}
              onChange={(e) =>
                setDomainNotes((prev) => ({
                  ...prev,
                  behavioral: e.target.value,
                }))
              }
              placeholder="Enter behavioral domain findings (Knowledge, Beliefs, Physical Activity)..."
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>

        {/* Other Domain */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center gap-2 bg-neutral-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-50">
              <MoreHorizontal className="h-4 w-4 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold">Other Domain (NO)</h3>
          </div>
          <div className="pl-6">
            <Textarea
              value={domainNotes.other}
              onChange={(e) =>
                setDomainNotes((prev) => ({
                  ...prev,
                  other: e.target.value,
                }))
              }
              placeholder="Enter other domain findings (Additional Findings, Special Cases)..."
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>
      </div>

      {/* PES Statements */}
      <div className="space-y-4">
        <div className="space-y-6">
          {diagnosisSections.pesStatements.map((statement, index) => (
            <div
              key={statement.id}
              className="relative space-y-4 p-4 bg-neutral-50 rounded-lg border border-gray-200"
            >
              <div className="absolute -top-2.5 left-3 px-2 bg-neutral-50">
                <span className="text-xs font-medium text-gray-400 font-mono">
                  PES STATEMENT {index + 1}
                </span>
              </div>

              <div className="space-y-4">
                {/* Problem Statement */}
                <div className="space-y-2">
                  <Label className="font-medium">Problem Statement</Label>
                  <Input
                    value={statement.problem}
                    onChange={(e) => {
                      const newStatements = [...diagnosisSections.pesStatements]
                      newStatements[index].problem = e.target.value
                      setDiagnosisSections((prev) => ({
                        ...prev,
                        pesStatements: newStatements,
                      }))
                    }}
                    placeholder="Enter the problem statement"
                    className="bg-white"
                  />
                </div>

                {/* Related To (Etiology) */}
                <div className="space-y-2">
                  <Label className="font-medium">Related To (Etiology)</Label>
                  <Input
                    value={statement.etiology}
                    onChange={(e) => {
                      const newStatements = [...diagnosisSections.pesStatements]
                      newStatements[index].etiology = e.target.value
                      setDiagnosisSections((prev) => ({
                        ...prev,
                        pesStatements: newStatements,
                      }))
                    }}
                    placeholder="Enter what this is related to"
                    className="bg-white"
                  />
                </div>

                {/* As Evidenced By (Signs/Symptoms) */}
                <div className="space-y-2">
                  <Label className="font-medium">As Evidenced By (Signs/Symptoms)</Label>
                  <Textarea
                    value={statement.signs}
                    onChange={(e) => {
                      const newStatements = [...diagnosisSections.pesStatements]
                      newStatements[index].signs = e.target.value
                      setDiagnosisSections((prev) => ({
                        ...prev,
                        pesStatements: newStatements,
                      }))
                    }}
                    placeholder="Enter the supporting evidence"
                    className="bg-white min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDiagnosisSections((prev) => ({
                ...prev,
                pesStatements: [
                  ...prev.pesStatements,
                  {
                    id: crypto.randomUUID(),
                    problem: '',
                    etiology: '',
                    signs: '',
                  },
                ],
              }))
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add PES Statement
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit">Save Diagnosis</Button>
      </div>
    </div>
  )
}
