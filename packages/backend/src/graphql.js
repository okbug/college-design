const { query } = require("./utils/sql");

const { graphql, buildSchema, GraphQLObjectType } = require("graphql");

const schema = buildSchema(`
type Query {
  hello: String
  name: String
}
`);

function a() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1);
        }, 500)
    })
}

const root = {
  hello: async () => {
      console.log(1);
      const res = await a();
      
      return query('select * from users').then(res => {
          return res[0]
      })
  },
  name: "金毛cc",
  age: 5,
};


// graphql({schema, source: '{ name, hello }', rootValue: root}).then((response) => {
//   console.log(response)
// });
