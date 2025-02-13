import { gql, request } from 'graphql-request'
import { typesenseClient } from './index.mjs'

const query = gql`
  query {
    allDegreeSeekingProgram(
      filter: { programFeature: { eq: "b4e8dd15-fed3-4594-a24b-ad8147dc9e26" } }
      sort: { by: "title", order: "ASC" }
    ) {
      title
      alternateTitle
      detailPage
      degreeImage
      nextStartDate
      category {
        slug
        title
      }
      college {
        slug
        title
      }
    }
  }
`

const syncDataToTypesense = async () => {
  try {
    const data = await request('http://localhost:3000/api/graphql', query)
    const schema = {
      name: 'degree-seeking-programs',
      enable_nested_fields: true,
      fields: [
        { name: 'title', type: 'string' },
        { name: 'alternateTitle', type: 'string' },
        { name: 'detailPage', type: 'string' },
        { name: 'degreeImage', type: 'string' },
        { name: 'nextStartDate', type: 'string' },
        { name: 'category.slug', type: 'string' },
        { name: 'category.title', type: 'string' },
        { name: 'college.slug', type: 'string' },
        { name: 'college.title', type: 'string' },
      ],
    }
    try {
      await typesenseClient.collections('degree-seeking-programs').delete()
    } catch (error) {
      console.log('Collection does not exist yet')
    }
    await typesenseClient.collections().create(schema)
    const importRes = await typesenseClient
      .collections('degree-seeking-programs')
      .documents()
      .import(data.allDegreeSeekingProgram)

    console.log('Import complete:', importRes)
  } catch (error) {
    console.error('Sync failed:', error)
  }
}

syncDataToTypesense()
