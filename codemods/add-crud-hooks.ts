/**
 * Architech Codemod: Add CRUD Hooks
 * 
 * This codemod demonstrates how we can replace the complex tech-stack layer
 * with simple, targeted code generation.
 */

import { FileInfo, API } from 'jscodeshift';

interface Options {
  featureName: string;
  featurePath: string;
  hasSubscriptions?: boolean;
  hasInvoices?: boolean;
}

export default function transformer(file: FileInfo, api: API, options: Options): string {
  const j = api.jscodeshift;
  const source = j(file.source);
  
  const { featureName, featurePath, hasSubscriptions = false, hasInvoices = false } = options;
  const capitalizedFeatureName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  // Only process the hooks file
  if (!file.path.includes('/hooks.ts')) {
    return file.source;
  }

  // Add imports if not present
  const hasImports = source.find(j.ImportDeclaration).length > 0;
  if (!hasImports) {
    source.find(j.Program).get('body').unshift(
      j.importDeclaration(
        [
          j.importSpecifier(j.identifier('useQuery')),
          j.importSpecifier(j.identifier('useMutation')),
          j.importSpecifier(j.identifier('useQueryClient'))
        ],
        j.literal('@tanstack/react-query')
      )
    );
  }

  // Add basic CRUD hooks
  const crudHooks = [
    // List hook
    j.exportNamedDeclaration(
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier(`use${capitalizedFeatureName}List`),
          j.arrowFunctionExpression(
            [j.identifier('filters'), j.identifier('options')],
            j.blockStatement([
              j.returnStatement(
                j.callExpression(
                  j.identifier('useQuery'),
                  [
                    j.objectExpression([
                      j.property('init', j.identifier('queryKey'), j.arrayExpression([
                        j.literal(featureName),
                        j.identifier('filters')
                      ])),
                      j.property('init', j.identifier('queryFn'), j.arrowFunctionExpression(
                        [],
                        j.blockStatement([
                          j.variableDeclaration('const', [
                            j.variableDeclarator(
                              j.identifier('params'),
                              j.newExpression(j.identifier('URLSearchParams'), [j.identifier('filters')])
                            )
                          ]),
                          j.variableDeclaration('const', [
                            j.variableDeclarator(
                              j.identifier('response'),
                              j.awaitExpression(
                                j.callExpression(
                                  j.identifier('fetch'),
                                  [j.templateLiteral(
                                    [j.templateElement({ raw: `/api/${featureName}?` }), j.templateElement({ raw: '' })],
                                    [j.identifier('params')]
                                  )]
                                )
                              )
                            )
                          ]),
                          j.ifStatement(
                            j.unaryExpression('!', j.memberExpression(j.identifier('response'), j.identifier('ok'))),
                            j.throwStatement(j.newExpression(j.identifier('Error'), [j.literal(`Failed to fetch ${featureName}`)])),
                            null
                          ),
                          j.returnStatement(
                            j.awaitExpression(
                              j.callExpression(
                                j.memberExpression(j.identifier('response'), j.identifier('json')),
                                []
                              )
                            )
                          )
                        ])
                      )),
                      j.property('init', j.identifier('staleTime'), j.literal(2 * 60 * 1000)),
                      j.spreadElement(j.identifier('options'))
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
            [j.identifier('id'), j.identifier('options')],
            j.blockStatement([
              j.returnStatement(
                j.callExpression(
                  j.identifier('useQuery'),
                  [
                    j.objectExpression([
                      j.property('init', j.identifier('queryKey'), j.arrayExpression([
                        j.literal(featureName),
                        j.identifier('id')
                      ])),
                      j.property('init', j.identifier('queryFn'), j.arrowFunctionExpression(
                        [],
                        j.blockStatement([
                          j.variableDeclaration('const', [
                            j.variableDeclarator(
                              j.identifier('response'),
                              j.awaitExpression(
                                j.callExpression(
                                  j.identifier('fetch'),
                                  [j.templateLiteral(
                                    [j.templateElement({ raw: `/api/${featureName}/` }), j.templateElement({ raw: '' })],
                                    [j.identifier('id')]
                                  )]
                                )
                              )
                            )
                          ]),
                          j.ifStatement(
                            j.unaryExpression('!', j.memberExpression(j.identifier('response'), j.identifier('ok'))),
                            j.throwStatement(j.newExpression(j.identifier('Error'), [j.literal(`Failed to fetch ${featureName}`)])),
                            null
                          ),
                          j.returnStatement(
                            j.awaitExpression(
                              j.callExpression(
                                j.memberExpression(j.identifier('response'), j.identifier('json')),
                                []
                              )
                            )
                          )
                        ])
                      )),
                      j.property('init', j.identifier('enabled'), j.identifier('id')),
                      j.property('init', j.identifier('staleTime'), j.literal(5 * 60 * 1000)),
                      j.spreadElement(j.identifier('options'))
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
            [j.identifier('options')],
            j.blockStatement([
              j.variableDeclaration('const', [
                j.variableDeclarator(
                  j.identifier('queryClient'),
                  j.callExpression(j.identifier('useQueryClient'), [])
                )
              ]),
              j.returnStatement(
                j.callExpression(
                  j.identifier('useMutation'),
                  [
                    j.objectExpression([
                      j.property('init', j.identifier('mutationFn'), j.arrowFunctionExpression(
                        [j.identifier('data')],
                        j.blockStatement([
                          j.variableDeclaration('const', [
                            j.variableDeclarator(
                              j.identifier('response'),
                              j.awaitExpression(
                                j.callExpression(
                                  j.identifier('fetch'),
                                  [
                                    j.literal(`/api/${featureName}`),
                                    j.objectExpression([
                                      j.property('init', j.identifier('method'), j.literal('POST')),
                                      j.property('init', j.identifier('headers'), j.objectExpression([
                                        j.property('init', j.identifier('Content-Type'), j.literal('application/json'))
                                      ])),
                                      j.property('init', j.identifier('body'), j.callExpression(
                                        j.identifier('JSON.stringify'),
                                        [j.identifier('data')]
                                      ))
                                    ])
                                  ]
                                )
                              )
                            )
                          ]),
                          j.ifStatement(
                            j.unaryExpression('!', j.memberExpression(j.identifier('response'), j.identifier('ok'))),
                            j.throwStatement(j.newExpression(j.identifier('Error'), [j.literal(`Failed to create ${featureName}`)])),
                            null
                          ),
                          j.returnStatement(
                            j.awaitExpression(
                              j.callExpression(
                                j.memberExpression(j.identifier('response'), j.identifier('json')),
                                []
                              )
                            )
                          )
                        ])
                      )),
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
                      )),
                      j.spreadElement(j.identifier('options'))
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

  // Add domain-specific hooks if needed
  const domainHooks = [];
  
  if (hasSubscriptions) {
    domainHooks.push(
      j.exportNamedDeclaration(
        j.variableDeclaration('const', [
          j.variableDeclarator(
            j.identifier('useSubscriptions'),
            j.arrowFunctionExpression(
              [],
              j.blockStatement([
                j.returnStatement(
                  j.callExpression(
                    j.identifier('useQuery'),
                    [
                      j.objectExpression([
                        j.property('init', j.identifier('queryKey'), j.arrayExpression([
                          j.literal('subscriptions')
                        ])),
                        j.property('init', j.identifier('queryFn'), j.arrowFunctionExpression(
                          [],
                          j.blockStatement([
                            j.variableDeclaration('const', [
                              j.variableDeclarator(
                                j.identifier('response'),
                                j.awaitExpression(
                                  j.callExpression(
                                    j.identifier('fetch'),
                                    [j.literal('/api/subscriptions')]
                                  )
                                )
                              )
                            ]),
                            j.returnStatement(
                              j.awaitExpression(
                                j.callExpression(
                                  j.memberExpression(j.identifier('response'), j.identifier('json')),
                                  []
                                )
                              )
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
    );
  }

  if (hasInvoices) {
    domainHooks.push(
      j.exportNamedDeclaration(
        j.variableDeclaration('const', [
          j.variableDeclarator(
            j.identifier('useInvoices'),
            j.arrowFunctionExpression(
              [],
              j.blockStatement([
                j.returnStatement(
                  j.callExpression(
                    j.identifier('useQuery'),
                    [
                      j.objectExpression([
                        j.property('init', j.identifier('queryKey'), j.arrayExpression([
                          j.literal('invoices')
                        ])),
                        j.property('init', j.identifier('queryFn'), j.arrowFunctionExpression(
                          [],
                          j.blockStatement([
                            j.variableDeclaration('const', [
                              j.variableDeclarator(
                                j.identifier('response'),
                                j.awaitExpression(
                                  j.callExpression(
                                    j.identifier('fetch'),
                                    [j.literal('/api/invoices')]
                                  )
                                )
                              )
                            ]),
                            j.returnStatement(
                              j.awaitExpression(
                                j.callExpression(
                                  j.memberExpression(j.identifier('response'), j.identifier('json')),
                                  []
                                )
                              )
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
    );
  }

  // Add all hooks to the file
  const allHooks = [...crudHooks, ...domainHooks];
  
  // Find the end of the file and add hooks
  const program = source.find(j.Program);
  program.get('body').push(...allHooks);

  return source.toSource();
}

// Usage examples:
// npx architech-codemod add-crud-hooks --feature payments --hasSubscriptions --hasInvoices
// npx architech-codemod add-crud-hooks --feature auth
// npx architech-codemod add-crud-hooks --feature teams

