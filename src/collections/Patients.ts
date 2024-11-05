import type { CollectionConfig } from 'payload'

export const Patients: CollectionConfig = {
  slug: 'patients',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'collegeDepartment'],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data, originalDoc }) => {
            const first = data?.firstName || originalDoc?.firstName || ''
            const last = data?.lastName || originalDoc?.lastName || ''
            return `${first} ${last}`
          },
        ],
      },
    },
    {
      name: 'birthDate',
      type: 'date',
      required: true,
      admin: {
        description: 'The age will be calculated automatically from this date',
      },
    },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'collegeDepartment',
      type: 'select',
      required: true,
      options: [
        { label: 'College of Nursing', value: 'nursing' },
        { label: 'College of Medicine', value: 'medicine' },
        { label: 'College of Pharmacy', value: 'pharmacy' },
        { label: 'College of Dentistry', value: 'dentistry' },
        { label: 'College of Allied Medical Professions', value: 'allied_medical' },
        { label: 'College of Public Health', value: 'public_health' },
        { label: 'College of Arts and Sciences', value: 'arts_sciences' },
        { label: 'College of Engineering', value: 'engineering' },
        { label: 'College of Education', value: 'education' },
        { label: 'College of Business Administration', value: 'business' },
      ],
      admin: {
        description: 'Select the college department of the patient',
      },
    },
  ],
}
