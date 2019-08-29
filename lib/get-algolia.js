import algoliasearch from 'algoliasearch/lite'

export default function getAlgoliaClient() {
  const algoliaClient = algoliasearch(
    'NNTAHQI9C5',
    'ac5d89f9877f9fb09dbdc9a010cca761'
  )

  return {
    async search(requests) {
      if (requests.every(({ params: { query } }) => Boolean(query) === false)) {
        return {
          results: requests.map(() => {
            return {
              processingTimeMS: 0,
              nbHits: 0,
              hits: [],
              facets: {}
            }
          })
        }
      }

      return algoliaClient.search(requests)
    },
    async searchForFacetValues(requests) {
      return algoliaClient.searchForFacetValues(requests)
    }
  }
}
