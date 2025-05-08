import { gql, request } from 'graphql-request'
import { typesenseClient } from './index.mjs'

const query = gql`
  query {
    allDegreeSeekingProgram(
      filter: { programFeature: { eq: "b4e8dd15-fed3-4594-a24b-ad8147dc9e26" } }
      sort: { by: "title", order: "ASC" }
    ) {
      title
      slug
      alternateTitle
      detailPage
      degreeImage
      nextStartDate
      shortDescription
      category {
        title
      }
      college {
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
        { name: 'slug', type: 'string' },
        { name: 'alternateTitle', type: 'string' },
        { name: 'detailPage', type: 'string' },
        { name: 'degreeImage', type: 'string' },
        { name: 'nextStartDate', type: 'string' },
        { name: 'shortDescription', type: 'string' },
        { name: 'category.title', type: 'string' },
        { name: 'college.title', type: 'string' },
        {
          name: 'embedding',
          type: 'float[]',
          // The following is Typesense's built-in embedding generation feature, supported starting from 0.25.0.rc60
          embed: {
            // The field names in our JSON documents that need to be used for embedding generation
            from: ['title', 'shortDescription'],
            /**
             * 1. Using built-in Embedding Models
             * We're using the Sentence-BERT model below,
             *  but you can also choose to use any of the built-in models here: https://huggingface.co/typesense/models/tree/main
             */
            // built-in ML model
            // model_config: {
            //   model_name: 'ts/all-MiniLM-L12-v2',
            // },
            /*** OpenAI */
            model_config: {
              model_name: 'openai/text-embedding-ada-002',
              api_key: process.env.VITE_OPEN_AI_API_KEY,
            },
          },
        },
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
