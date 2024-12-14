export const criterias = [
  'beauty',
  'spacing',
  'education',
  'property',
  'social life',
]

export type Criteria = typeof criterias[number]

export type Site = {
  title: string,
  criterias: {
    title: Criteria,
    notes: number[]
  }[]
}


export const sites:Site[] = [
  {
    title: 'kochi',
    criterias: [
      {
        title: 'beauty',
        notes: [1]
      },
      {
        title: 'education',
        notes: [1]
      },
      {
        title: 'property',
        notes: [1]
      },
      {
        title: 'social life',
        notes: [1]
      },
      {
        title: 'spacing',
        notes: [1]
      },
    ]
  },
  {
    title: 'douala',
    criterias: [
      {
        title: 'beauty',
        notes: [4, 4, 4, 3]
      },
      {
        title: 'education',
        notes: [3, 3, 3, 2]
      },
      {
        title: 'property',
        notes: [5, 5, 5, 4]
      },
      {
        title: 'social life',
        notes: [4, 3, 2, 1]
      },
      {
        title: 'spacing',
        notes: [5, 5, 5, 5]
      },
    ]
  },
  {
    title: 'toulouse',
    criterias: [
      {
        title: 'beauty',
        notes: [5, 5, 5]
      },
      {
        title: 'education',
        notes: [3, 2, 2, 2]
      },
      {
        title: 'property',
        notes: [3, 3, 3, 2]
      },
      {
        title: 'social life',
        notes: [2, 2, 1, 1, 1]
      },
      {
        title: 'spacing',
        notes: [4, 4, 2]
      },
    ]
  }
]