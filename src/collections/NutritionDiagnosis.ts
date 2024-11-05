import type { CollectionConfig } from 'payload'

export const NutritionDiagnosis: CollectionConfig = {
  slug: 'nutrition-diagnoses',
  admin: {
    useAsTitle: 'diagnosisDate',
    defaultColumns: ['patient', 'diagnosisDate', 'problem'],
  },
  fields: [
    {
      name: 'patient',
      type: 'relationship',
      relationTo: 'patients',
      required: true,
    },
    {
      name: 'assessment',
      type: 'relationship',
      relationTo: 'nutrition-assessments',
      required: true,
    },
    {
      name: 'diagnosisDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    // Domain Notes
    {
      name: 'domainNotes',
      type: 'group',
      label: 'Domain Notes',
      fields: [
        {
          name: 'intake',
          type: 'textarea',
          label: 'Intake Domain (NI)',
          admin: {
            description: 'Food/Nutrition, Fluid, Bioactive Substances',
          },
        },
        {
          name: 'clinical',
          type: 'textarea',
          label: 'Clinical Domain (NC)',
          admin: {
            description: 'Functional, Biochemical, Weight',
          },
        },
        {
          name: 'behavioral',
          type: 'textarea',
          label: 'Behavioral-Environmental Domain (NB)',
          admin: {
            description: 'Knowledge, Beliefs, Physical Activity',
          },
        },
        {
          name: 'other',
          type: 'textarea',
          label: 'Other Domain (NO)',
          admin: {
            description: 'Additional Findings, Special Cases',
          },
        },
      ],
    },
    // Nutrition Problems
    {
      name: 'nutritionProblems',
      type: 'array',
      label: 'Nutrition Problems',
      fields: [
        {
          name: 'domain',
          type: 'select',
          required: true,
          options: [
            { label: 'Intake Domain (NI)', value: 'NI' },
            { label: 'Clinical Domain (NC)', value: 'NC' },
            { label: 'Behavioral Domain (NB)', value: 'NB' },
            { label: 'Other Domain (NO)', value: 'NO' },
          ],
        },
        {
          name: 'content',
          type: 'text',
          required: true,
        },
      ],
    },
    // PES Statements
    {
      name: 'pesStatements',
      type: 'array',
      label: 'PES Statements',
      fields: [
        {
          name: 'problem',
          type: 'text',
          required: true,
          label: 'Problem Statement',
        },
        {
          name: 'etiology',
          type: 'text',
          required: true,
          label: 'Related To (Etiology)',
        },
        {
          name: 'signs',
          type: 'textarea',
          required: true,
          label: 'As Evidenced By (Signs/Symptoms)',
        },
      ],
    },
    // Status and Timestamps
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Approved', value: 'approved' },
      ],
    },
    {
      name: 'updatedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [() => new Date()],
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        return {
          ...data,
          updatedAt: new Date(),
        }
      },
    ],
  },
}
