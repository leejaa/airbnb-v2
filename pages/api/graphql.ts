import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import { schema } from "./schema";

const cors = Cors({
    allowMethods: ["GET", "POST", "OPTIONS"]
});

const apolloServer = new ApolloServer({
    schema,
    context: () => {
        // console.log('apollo server...');
    }
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
    api: {
        bodyParser: false
    }
};

export default cors(handler);