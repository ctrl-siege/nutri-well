"use client"
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for Calendly integration
const appointments = [
  { id: 1, date: new Date(2023, 5, 15, 10, 0), patientName: 'John Doe', type: 'Initial Consultation' },
  { id: 2, date: new Date(2023, 5, 15, 14, 0), patientName: 'Jane Smith', type: 'Follow-up' },
  { id: 3, date: new Date(2023, 5, 16, 11, 0), patientName: 'Alice Johnson', type: 'Meal Planning' },
  { id: 4, date: new Date(2023, 5, 17, 13, 0), patientName: 'Bob Brown', type: 'Weight Management' },
];

export default function AppointmentsDashboard() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const appointmentsForSelectedDate = appointments.filter(
    (appointment) => appointment.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-10">
      <h1 className="text-3xl font-bold">Appointments</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Appointments for {selectedDate?.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsForSelectedDate.length > 0 ? (
              <ul className="space-y-4">
                {appointmentsForSelectedDate.map((appointment) => (
                  <li key={appointment.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                    <div>
                      <p className="font-semibold">{appointment.patientName}</p>
                      <p className="text-sm text-gray-600">{appointment.date.toLocaleTimeString()}</p>
                      <Badge variant="secondary">{appointment.type}</Badge>
                    </div>
                    <Button size="sm">View Details</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments scheduled for this date.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


