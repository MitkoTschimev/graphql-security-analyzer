import fetch from 'node-fetch'
import { introspectionQuery } from 'graphql/utilities/introspectionQuery'
import { buildClientSchema } from 'graphql/utilities/buildClientSchema'
import { printSchema } from 'graphql/utilities/schemaPrinter'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/easybooking';
  const outputType = 'json';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: introspectionQuery }),
  })

  const { data, errors } = await response.json()

  if (errors) {
    throw new Error(JSON.stringify(errors, null, 2))
  }

  if (outputType === 'json') {
    console.log(JSON.stringify(data, null, 2))
  } else {
    const schema = buildClientSchema(data)
    console.log(printSchema(schema))
  }

}

main().catch(e => console.error(e))
