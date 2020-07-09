import { graphql } from 'graphql';
import { schema, AUTH_LIST, checkAuth } from './schema';
import _ from 'lodash';

export default async (req, res) => {
  const query = req?.body?.query ?? '';
  const variables = req?.body?.variables ?? '';
  const operationName = req?.body?.operationName ?? '';
  // const result : any = checkAuth({ req });
  // if ( _.includes( operationName, AUTH_LIST ) && !result?.isAuth ) {
  //   return res.end(JSON.stringify({
  //     isAuth: false,
  //     error: result?.error ?? ''
  //   }));
  // }
  const response = await graphql(schema, query, {}, { userId: 1 }, variables);
  return res.end(JSON.stringify(response));
}