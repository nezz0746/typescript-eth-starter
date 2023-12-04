const {
  getIntrospectionQuery,
  parse,
  buildClientSchema,
  print,
} = require("graphql");
const { buildOperationNodeForField } = require("@graphql-tools/utils");
const axios = require("axios").default;
const fs = require("fs/promises");

async function getSchemaFromUrl(url) {
  const response = await axios
    .post(url, { query: getIntrospectionQuery().toString() })
    .catch((e) => console.log(e));

  return buildClientSchema(response.data.data);
}

const main = async function() {
  const schemaUrl =
    "http://localhost:8000/subgraphs/name/local-graph";

    const schema = await getSchemaFromUrl(schemaUrl);

  const operationsDictionary = {
    query: { ...(schema.getQueryType()?.getFields() || {}) },
  };

  let documentString = "";
  for (const operationKind in operationsDictionary) {
    // operationsDictionary[operationKind].args = operationsDictionary[operationKind].filter(
    //   (field) => field.name === 'subgraphError'
    // )
    for (const operationName in operationsDictionary[operationKind]) {
      // Removing subgraphError argument from the query
      operationsDictionary[operationKind][operationName].args.pop()
      
      // List of queries to remove
      const exclude = ["_meta"]

      if(exclude.includes(operationName)) {
        continue;
      }

      const operationAST = buildOperationNodeForField({
        schema,
        kind: operationKind,
        field: operationName,
      });

      // Hardcoding naming fixes
      operationAST.name.value = operationAST.name.value.replace("_query", "");

      documentString += print(operationAST);
    }
  }

  await fs.writeFile("operations.graphql", documentString, (err) => {
    if (err) {
      console.log(err);
    }
  });

  return parse(documentString);
};

main();
