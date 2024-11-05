import type { CollectionConfig } from 'payload'

export const NutritionAssessment: CollectionConfig = {
  slug: 'nutrition-assessments',
  admin: {
    useAsTitle: 'assessmentDate',
    defaultColumns: ['patient', 'assessmentDate'],
  },
  fields: [
    {
      name: 'patient',
      type: 'relationship',
      relationTo: 'patients',
      required: true,
    },
    {
      name: 'assessmentDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    // Food/Nutrition-Related History
    {
      name: 'foodNutritionHistory',
      type: 'richText',
      required: true,
      label: 'Food/Nutrition-Related History',
    },
    // Anthropometric Data
    {
      name: 'anthropometric',
      type: 'group',
      label: 'Anthropometric Measurements',
      fields: [
        {
          name: 'height',
          type: 'number',
          required: true,
          min: 0,
          label: 'Height (cm)',
        },
        {
          name: 'weight',
          type: 'number',
          required: true,
          min: 0,
          label: 'Weight (kg)',
        },
        {
          name: 'bmi',
          type: 'number',
          admin: {
            readOnly: true,
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => {
                if (siblingData.height && siblingData.weight) {
                  const heightInMeters = siblingData.height / 100
                  return Number((siblingData.weight / (heightInMeters * heightInMeters)).toFixed(1))
                }
                return null
              },
            ],
          },
        },
        {
          name: 'notes',
          type: 'richText',
          label: 'Additional Notes',
        },
      ],
    },
    // Biochemical Data
    {
      name: 'biochemicalData',
      type: 'group',
      label: 'Biochemical Data, Medical Tests, and Procedures',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'attachments',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
    // Physical Findings
    {
      name: 'physicalFindings',
      type: 'group',
      label: 'Nutrition-Focused Physical Findings',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'attachments',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
    // Client History
    {
      name: 'clientHistory',
      type: 'group',
      label: 'Client History',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'attachments',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
    // Assessment Tools
    {
      name: 'assessmentTools',
      type: 'group',
      label: 'Assessment, Monitoring and Evaluation Tools',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'attachments',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
    // Timestamps
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
        // Ensure updatedAt is set
        return {
          ...data,
          updatedAt: new Date(),
        }
      },
    ],
  },
}
