"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { UserCircle, ClipboardList, Stethoscope, Pill, Calendar, Edit2 } from 'lucide-react'
import { EyeIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Checkbox } from './ui/checkbox'
import { Patient } from './data-table'  // Import the Patient type

interface PatientManagementSheetProps {
  patient: Patient;
}

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  inputType?: 'input' | 'textarea';
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onSave, inputType = 'input' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center">
        {inputType === 'input' ? (
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="mr-2"
          />
        ) : (
          <Textarea
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="mr-2"
          />
        )}
        <Button onClick={handleSave} size="sm">Save</Button>
      </div>
    );
  }

  return (
    <div className="group relative">
      <span>{value}</span>
      <Edit2
        className="h-4 w-4 absolute top-1/2 -right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-pointer"
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};

const PatientManagementSheet: React.FC<PatientManagementSheetProps> = ({ patient }) => {
  const [patientData, setPatientData] = useState({
    name: 'John Doe',
    gender: 'Male',
    age: '35',
    height: '180 cm',
    weight: '75 kg',
    bmi: '23.1',
  });

  const updatePatientData = (key: keyof typeof patientData, value: string) => {
    setPatientData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <EyeIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-3xl p-0 bg-background">
        <SheetHeader className="px-6 py-4 bg-muted">
          <SheetTitle className="text-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <h2 className="text-3xl font-bold">
                  <EditableField
                    value={patientData.name}
                    onSave={(value) => updatePatientData('name', value)}
                  />
                </h2>
                <p className="text-muted-foreground text-lg">
                  <EditableField
                    value={patientData.gender}
                    onSave={(value) => updatePatientData('gender', value)}
                  />
                </p>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            <div className="grid grid-cols-4 gap-4 text-left">
              {[
                { label: 'Age', key: 'age' },
                { label: 'Height', key: 'height' },
                { label: 'Weight', key: 'weight' },
                { label: 'BMI', key: 'bmi' },
              ].map((item) => (
                <div key={item.label} className="bg-white p-3 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">{item.label}</div>
                  <div className="text-lg font-semibold">
                    <EditableField
                      value={patientData[item.key as keyof typeof patientData]}
                      onSave={(value) => updatePatientData(item.key as keyof typeof patientData, value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-5rem)]">
          <ScrollArea className="flex-grow px-6 py-4">
            <Tabs defaultValue="assessment" className="w-full">
              <TabsList className="w-full justify-around mb-6 bg-muted">
                <TabsTrigger value="assessment" className="flex items-center">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Assessment
                </TabsTrigger>
                <TabsTrigger value="diagnosis" className="flex items-center">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Diagnosis
                </TabsTrigger>
                <TabsTrigger value="intervention" className="flex items-center">
                  <Pill className="mr-2 h-4 w-4" />
                  Intervention
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Monitoring
                </TabsTrigger>
              </TabsList>
              <TabsContent value="assessment">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chief-complaint">Assessment</Label>
                    <Textarea
                      id="chief-complaint"
                      placeholder="Enter the patient's chief complaint"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="history">History</Label>
                    <Textarea
                      id="history"
                      placeholder="Enter the patient's medical history"
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button type="submit">Save Assessment</Button>
                </form>
              </TabsContent>
              <TabsContent value="diagnosis">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nutrition-problems">Common Nutrition Problems</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="inadequate-energy" />
                        <Label htmlFor="inadequate-energy">Inadequate energy intake</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="excessive-energy" />
                        <Label htmlFor="excessive-energy">Excessive energy intake</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="inadequate-protein" />
                        <Label htmlFor="inadequate-protein">Inadequate protein intake</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="imbalance-macronutrients" />
                        <Label htmlFor="imbalance-macronutrients">
                          Imbalance of macronutrients
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="inadequate-fluid" />
                        <Label htmlFor="inadequate-fluid">Inadequate fluid intake</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="altered-utilization" />
                        <Label htmlFor="altered-utilization">Altered nutrient utilization</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="knowledge-deficit" />
                        <Label htmlFor="knowledge-deficit">
                          Food and nutrition-related knowledge deficit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="undesirable-choices" />
                        <Label htmlFor="undesirable-choices">Undesirable food choices</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="physical-inactivity" />
                        <Label htmlFor="physical-inactivity">Physical inactivity</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="disordered-eating" />
                        <Label htmlFor="disordered-eating">Disordered eating pattern</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="problem">Problem</Label>
                    <Textarea
                      id="problem"
                      placeholder="Describe the nutrition problem"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="etiology">Etiology</Label>
                    <Textarea
                      id="etiology"
                      placeholder="Describe the etiology"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signs-symptoms">Signs and Symptoms</Label>
                    <Textarea
                      id="signs-symptoms"
                      placeholder="List signs and symptoms"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pes-statement">PES Statement</Label>
                    <Textarea
                      id="pes-statement"
                      placeholder="Enter PES statement"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit">Save Diagnosis</Button>
                </form>
              </TabsContent>
              <TabsContent value="intervention">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="treatment-plan">Treatment Plan</Label>
                    <Textarea
                      id="treatment-plan"
                      placeholder="Describe the treatment plan"
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications">Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="List prescribed medications"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit">Save Intervention</Button>
                </form>
              </TabsContent>
              <TabsContent value="monitoring">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="follow-up-date">Follow-up Date</Label>
                    <Input id="follow-up-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monitoring-plan">Monitoring Plan</Label>
                    <Textarea
                      id="monitoring-plan"
                      placeholder="Describe the monitoring plan"
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monitoring-notes">Additional Notes</Label>
                    <Textarea
                      id="monitoring-notes"
                      placeholder="Enter any additional monitoring notes"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit">Save Monitoring Plan</Button>
                </form>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default PatientManagementSheet
