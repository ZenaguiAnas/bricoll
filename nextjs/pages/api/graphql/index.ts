import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import clientPromise from "../../../lib/mongodb"
import path from 'node:path'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { ObjectId } from 'mongodb';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';


const client = await clientPromise
const db = client.db("sample_mflix")
const moviesCollection = db.collection("movies")


// path to this folders
const rootPath = path.join(__dirname, "../../../../", "pages/api/graphql")
//path to schema from this folder
const schemaPath = path.join(rootPath, "/schema/*.graphql");
// console.log("🚀 ~ file: index.ts:9 ~ schemaPath:", schemaPath)
const typeDefs = loadSchemaSync(schemaPath, { loaders: [new GraphQLFileLoader()] })



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    Movies:
      async function (_: any, args: { id: ObjectId }, __: any, ___: any) {
        return await moviesCollection.find().limit(20).toArray();
      },
    Movie: async (_: any, args: { id: ObjectId; }, __: any, ___: any) => {
      return await moviesCollection.findOne({ _id: new ObjectId(args.id) });
    }
  },
  // Mutiation:
};



const server = new ApolloServer({
  resolvers,
  typeDefs
});

export default startServerAndCreateNextHandler(server);

