'use client'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, MoreVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Meal {
  time: string
  items: string
}

interface MealPlan {
  id: number
  name: string
  startDate: string
  endDate: string
  status: 'active' | 'inactive'
  calories: number
  meals: Meal[]
}

export default function NutritionIntervention() {
  const [mealPlans] = useState<MealPlan[]>([
    {
      id: 1,
      name: 'Meal Plan 1',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      status: 'active',
      calories: 2000,
      meals: [
        { time: 'Breakfast', items: 'Oatmeal, Banana, Almond Milk' },
        { time: 'Lunch', items: 'Chicken Salad, Quinoa, Avocado' },
        { time: 'Dinner', items: 'Grilled Salmon, Sweet Potato, Broccoli' },
      ],
    },
    {
      id: 2,
      name: 'Meal Plan 2',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      status: 'inactive',
      calories: 1800,
      meals: [
        { time: 'Breakfast', items: 'Greek Yogurt, Blueberries, Almonds' },
        { time: 'Lunch', items: 'Turkey Wrap, Quinoa, Avocado' },
        { time: 'Dinner', items: 'Grilled Chicken, Sweet Potato, Broccoli' },
      ],
    },
  ])

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-6">
        {/* Meal Plans Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Meal Plans</h3>
              <p className="text-sm text-muted-foreground">
                Manage and track patient meal plans
              </p>
            </div>
            <Dialog>
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
                {/* TODO: Import and use CreateMealPlan component */}
                {/* <CreateMealPlan /> */}
              </DialogContent>
            </Dialog>
          </div>

          {/* Grid Layout for Meal Plans */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {mealPlans.map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                      {plan.name}
                    </CardTitle>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>
                          {plan.startDate} - {plan.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
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
      </div>
    </ScrollArea>
  )
}
