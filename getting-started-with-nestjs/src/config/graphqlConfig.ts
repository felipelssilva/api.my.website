// import { ApolloDriver } from '@nestjs/apollo';
// import { join } from 'path';
// import { MemcachedCache } from 'apollo-server-cache-memcached';

// function graphqlConfig(): any {
//   return {
//     driver: ApolloDriver,
//     typePaths: ['./**/*.graphql'],
//     // autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
//     definitions: {
//       path: join(process.cwd(), 'src/graphql.ts'),
//       outputAs: 'class',
//     },
//     formatError: (err) => {
//       // console.log(err)
//       return err;
//     },
//     formatResponse: (err) => {
//       // console.log(err)
//       return err;
//     },
//     debug: false,
//     persistedQueries: {
//       cache: new MemcachedCache(
//         ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
//         { retries: 10, retry: 10000 }, // Options
//       ),
//     },
//     installSubscriptionHandlers: true,
//     introspection: true,
//     playground: {
//       settings: {
//         'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
//         'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
//         'editor.fontSize': 14,
//         'editor.reuseHeaders': true, // new tab reuses headers from last tab
//         'editor.theme': 'dark', // possible values: 'dark', 'light'
//         'general.betaUpdates': false,
//         'queryPlan.hideQueryPlanResponse': false,
//         'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
//         'tracing.hideTracingResponse': true,
//       },
//     },
//   };
// }

// export default graphqlConfig;
