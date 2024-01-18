import type { CodegenConfig } from '@graphql-codegen/cli';

// @ts-expect-error due to process not being imported
const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
  // @ts-expect-error due to Error not being imported
  throw new Error('GitHub token not provided. Set the GITHUB_TOKEN environment variable.');
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'User-Agent': 'github-issue-explorer/v0.1',
        },
      },
    },
  ],
  documents: 'src/**/*.ts',
  generates: {
    'src/app/shared/interface/generated.interface.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        namingConvention: {
          typeNames: 'change-case#pascalCase',
          transformUnderscore: true,
          enumValues: 'change-case#upperCase',
        },
        skipTypename: true,
      },
    },
    'src/app/shared/graphql/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
