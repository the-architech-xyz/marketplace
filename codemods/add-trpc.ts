/**
 * Architech Codemod: Add tRPC Support
 * 
 * This codemod demonstrates how we can replace tRPC overrides
 * with simple, targeted code transformation.
 */

import { FileInfo, API } from 'jscodeshift';

interface Options {
  featureName: string;
  featurePath: string;
}

export default function transformer(file: FileInfo, api: API, options: Options): string {
  const j = api.jscodeshift;
  const source = j(file.source);
  
  const { featureName } = options;
  const capitalizedFeatureName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  // Only process the hooks file
  if (!file.path.includes('/hooks.ts')) {
    return file.source;
  }

  // Replace imports
  source.find(j.ImportDeclaration).remove();
  
  // Add tRPC imports
  source.find(j.Program).get('body').unshift(
    j.importDeclaration(
      [j.importSpecifier(j.identifier('trpc'))],
      j.literal('@/lib/trpc/react')
    ),
    j.importDeclaration(
      [j.importSpecifier(j.identifier('useQueryClient'))],
      j.literal('@tanstack/react-query')
    )
  );

  // Transform CRUD hooks to tRPC
  const transformedHooks = [
    // List hook
    j.exportNamedDeclaration(
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier(`use${capitalizedFeatureName}List`),
          j.arrowFunctionExpression(
            [j.identifier('filters')],
            j.blockStatement([
              j.returnStatement(
                j.callExpression(
                  j.memberExpression(
                    j.memberExpression(
                      j.memberExpression(j.identifier('trpc'), j.identifier(featureName)),
                      j.identifier('list')
                    ),
                    j.identifier('useQuery')
                  ),
                  [
                    j.objectExpression([
                      j.property('init', j.identifier('filters'), j.identifier('filters'))
                    ]),
                    j.objectExpression([
                      j.property('init', j.identifier('staleTime'), j.literal(2 * 60 * 1000))
                    ])
                  ]
                )
              )
            ])
          )
        )
      ])
    ),

    // Get hook
    j.exportNamedDeclaration(
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier(`use${capitalizedFeatureName}`),
          j.arrowFunctionExpression(
            [j.identifier('id')],
            j.blockStatement([
              j.returnStatement(
                j.callExpression(
                  j.memberExpression(
                    j.memberExpression(
                      j.memberExpression(j.identifier('trpc'), j.identifier(featureName)),
                      j.identifier('get')
                    ),
                    j.identifier('useQuery')
                  ),
                  [
                    j.objectExpression([
                      j.property('init', j.identifier('id'), j.identifier('id'))
                    ]),
                    j.objectExpression([
                      j.property('init', j.identifier('enabled'), j.identifier('id')),
                      j.property('init', j.identifier('staleTime'), j.literal(5 * 60 * 1000))
                    ])
                  ]
                )
              )
            ])
          )
        )
      ])
    ),

    // Create hook
    j.exportNamedDeclaration(
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier(`use${capitalizedFeatureName}Create`),
          j.arrowFunctionExpression(
            [],
            j.blockStatement([
              j.variableDeclaration('const', [
                j.variableDeclarator(
                  j.identifier('queryClient'),
                  j.callExpression(j.identifier('useQueryClient'), [])
                )
              ]),
              j.returnStatement(
                j.callExpression(
                  j.memberExpression(
                    j.memberExpression(
                      j.memberExpression(j.identifier('trpc'), j.identifier(featureName)),
                      j.identifier('create')
                    ),
                    j.identifier('useMutation')
                  ),
                  [
                    j.objectExpression([
                      j.property('init', j.identifier('onSuccess'), j.arrowFunctionExpression(
                        [],
                        j.blockStatement([
                          j.callExpression(
                            j.memberExpression(j.identifier('queryClient'), j.identifier('invalidateQueries')),
                            [j.objectExpression([
                              j.property('init', j.identifier('queryKey'), j.arrayExpression([
                                j.literal(featureName)
                              ]))
                            ])]
                          )
                        ])
                      ))
                    ])
                  ]
                )
              )
            ])
          )
        )
      ])
    )
  ];

  // Clear existing exports and add transformed hooks
  source.find(j.ExportNamedDeclaration).remove();
  const program = source.find(j.Program);
  program.get('body').push(...transformedHooks);

  return source.toSource();
}

// Usage examples:
// npx architech-codemod add-trpc --feature payments
// npx architech-codemod add-trpc --feature auth
// npx architech-codemod add-trpc --feature teams

