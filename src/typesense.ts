import Typesense from 'typesense'

const cred = {
  host: 'localhost',
  port: 8108,
  protocol: 'http',
}

export const typesenseClient = new Typesense.Client({
  nodes: [cred],
  apiKey: import.meta.env.VITE_TYPESENSE_API_KEY,
})

export const typesenseSearchClient = new Typesense.SearchClient({
  nodes: [cred],
  apiKey: import.meta.env.VITE_TYPESENSE_API_KEY,
  numRetries: 8,
})
