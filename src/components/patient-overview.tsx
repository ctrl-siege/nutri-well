'use client'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { Carousel } from '@/components/justd/ui/carousel'

export default function PatientOverview() {
  const pesStatements = [
    {
      id: '1',
      problem: 'Inadequate protein-energy intake',
      etiology: 'Related to decreased appetite and early satiety',
      signs: 'Weight loss of 5% in past month, muscle wasting',
    },
    {
      id: '2',
      problem: 'Excessive carbohydrate intake',
      etiology: 'Related to frequent consumption of processed foods',
      signs: 'Elevated post-prandial blood glucose, increased body fat percentage',
    },
    {
      id: '3',
      problem: 'Altered nutrition-related laboratory values',
      etiology: 'Related to medication interactions and poor dietary choices',
      signs: 'Abnormal lipid profile, elevated liver enzymes',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Summary Section */}

          {/* Assessment Overview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900">Anthropometric Data</h4>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">Weight</dt>
                  <dd className="text-sm font-medium text-gray-900">68 kg</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">Height</dt>
                  <dd className="text-sm font-medium text-gray-900">170 cm</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">BMI</dt>
                  <dd className="text-sm font-medium text-gray-900">23.5 kg/m²</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900">Biochemical Data</h4>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">Blood Glucose</dt>
                  <dd className="text-sm font-medium text-gray-900">95 mg/dL</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">Total Cholesterol</dt>
                  <dd className="text-sm font-medium text-gray-900">180 mg/dL</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Diagnosis Overview with Carousel */}
          {/* <div className="space-y-4">
            <Carousel
              opts={{
                align: 'start',
                slidesToScroll: 3,
              }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Nutrition Diagnosis</h4>
                <Carousel.Handler>
                  <div className="flex gap-2">
                    <Carousel.Button slot="previous" className="bg-white shadow-md" />
                    <Carousel.Button slot="next" className="bg-white shadow-md" />
                  </div>
                </Carousel.Handler>
              </div>

              <Carousel.Content className="py-3">
                <div className="flex gap-4">
                  {pesStatements.map((statement) => (
                    <Carousel.Item key={statement.id} id={statement.id} className="flex-none w-[calc(33.333%-11px)]">
                      <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-4 h-full">
                        <div className="absolute -top-3 left-3 px-2 bg-gray-50">
                          <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                            PES Statement {statement.id}
                          </span>
                        </div>
                        <dl className="divide-y divide-gray-200 mt-2">
                          <div className="py-2">
                            <dt className="text-sm font-medium text-gray-700">Problem</dt>
                            <dd className="mt-1 text-sm text-gray-900">{statement.problem}</dd>
                          </div>
                          <div className="py-2">
                            <dt className="text-sm font-medium text-gray-700">Etiology</dt>
                            <dd className="mt-1 text-sm text-gray-900">{statement.etiology}</dd>
                          </div>
                          <div className="py-2">
                            <dt className="text-sm font-medium text-gray-700">Signs/Symptoms</dt>
                            <dd className="mt-1 text-sm text-gray-900">{statement.signs}</dd>
                          </div>
                        </dl>
                      </div>
                    </Carousel.Item>
                  ))}
                </div>
              </Carousel.Content>
            </Carousel>
          </div> */}

          {/* Intervention Overview */}
          <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900">Nutrition Intervention</h4>
            <dl className="divide-y divide-gray-200">
              <div className="py-2">
                <dt className="text-sm font-medium text-gray-700">Goals</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Increase caloric intake to 2000 kcal/day</li>
                    <li>Achieve protein intake of 1.2g/kg body weight</li>
                    <li>Reduce processed carbohydrate intake by 50%</li>
                  </ul>
                </dd>
              </div>
              <div className="py-2">
                <dt className="text-sm font-medium text-gray-700">Strategies</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Small, frequent meals (6-8 times/day)</li>
                    <li>Protein supplementation between meals</li>
                    <li>Replace refined carbs with whole grain alternatives</li>
                  </ul>
                </dd>
              </div>
              <div className="py-2">
                <dt className="text-sm font-medium text-gray-700">Monitoring Plan</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Weekly weight checks, dietary recall, and blood glucose monitoring
                </dd>
              </div>
            </dl>
          </div>

    </div>
  )
}
