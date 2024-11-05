"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, MoreVertical, Calendar, Clock, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import CreateMealPlan from "./create-meal-plan"
import Link from "next/link"
import { useParams } from "next/navigation"

const mealPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "active",
    calories: "1800",
    meals: [
      { time: "Breakfast", items: "Oatmeal with fruits, Greek yogurt" },
      { time: "Lunch", items: "Grilled chicken salad, whole grain bread" },
      { time: "Dinner", items: "Baked salmon, quinoa, steamed vegetables" },
    ],
  },
  {
    id: 2,
    name: "Maintenance Plan",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    status: "completed",
    calories: "2000",
    meals: [
      { time: "Breakfast", items: "Whole grain toast, eggs, avocado" },
      { time: "Lunch", items: "Turkey sandwich, fruit, nuts" },
      { time: "Dinner", items: "Lean beef stir-fry, brown rice" },
    ],
  },
]

export default function MealPlans() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const params = useParams()

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link href={`/patients/${params.patientId}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h2 className="text-2xl font-bold tracking-tight">Meal Plans</h2>
            </div>
            <p className="text-muted-foreground ml-10">
              Manage and track patient meal plans
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Meal Plan</DialogTitle>
                <DialogDescription>
                  Create a customized meal plan for your patient
                </DialogDescription>
              </DialogHeader>
              <CreateMealPlan onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Grid Layout for Meal Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealPlans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">
                  {plan.name}
                </CardTitle>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{plan.startDate} - {plan.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{plan.calories} calories/day</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={plan.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {plan.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Time</TableHead>
                    <TableHead>Meal Items</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plan.meals.map((meal) => (
                    <TableRow key={meal.time}>
                      <TableCell className="font-medium">{meal.time}</TableCell>
                      <TableCell>{meal.items}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
