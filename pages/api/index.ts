import { graphql } from 'graphql';
import { schema } from './schema';

export default async (req, res) => {
  const query = req.body.query
  const variables = req.body.variables
  const response = await graphql(schema, query, {}, {}, variables)
  return res.end(JSON.stringify(response))
}