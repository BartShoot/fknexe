import { UAParser } from 'ua-parser-js'
import { describe, expect, it } from 'vitest'
import { PackageService } from '@/services/PackageService.ts'
import { getTestCases } from '@/tests/data/packages.mock.ts'

describe('correct matches', () => {
  const testCases = getTestCases()
  testCases.forEach((testScenario) => {
    testScenario.cases.forEach((thisCase) => {
      it(`${testScenario.name} - ${thisCase.id}`, () => {
        const userAgent = UAParser(testScenario.ua)
        console.log({ name: userAgent.os.name, arch: userAgent.cpu.architecture })
        /*eslint dot-notation: ["error", { "allowKeywords": false }]*/
        const ranked = PackageService.rankPackages(thisCase.names, userAgent)
        console.log(
          ranked
            .sort((a, b) => b.matchInfo.score - a.matchInfo.score)
            .map(
              (r) =>
                r.packageName +
                ' - score: ' +
                r.matchInfo.score +
                ' exactMatch: {' +
                r.matchInfo.matches.exact_match.join(', ') +
                '}',
            ),
        )
        ranked.forEach((p) => {
          const exactMatch = p.matchInfo.matches.exact_match
          const arrLength = exactMatch.length
          const uniqueCount = new Set(exactMatch).size
          expect(arrLength).toBe(uniqueCount)
        })
        if (thisCase.expectedMatches) {
          for (const [fileName, expectedExactMatches] of Object.entries(thisCase.expectedMatches)) {
            const matchedPackage = ranked.find((p) => p.packageName === fileName)

            if (matchedPackage) {
              const actualMatches = matchedPackage.matchInfo.matches.exact_match

              // Compare regardless of order by using sets
              const actualMatchesSet = new Set(actualMatches)
              const expectedMatchesSet = new Set(expectedExactMatches)

              // Use a custom error message with full context
              if (actualMatchesSet.size !== expectedMatchesSet.size) {
                const extraItems = [...actualMatchesSet].filter(
                  (item) => !expectedMatchesSet.has(item),
                )
                const missingItems = [...expectedMatchesSet].filter(
                  (item) => !actualMatchesSet.has(item),
                )

                const errorMessage = `
File: ${fileName}
Expected ${expectedMatchesSet.size} exact matches: [${[...expectedMatchesSet].join(', ')}]
Actual ${actualMatchesSet.size} exact matches: [${[...actualMatchesSet].join(', ')}]
${extraItems.length > 0 ? `Extra items: [${extraItems.join(', ')}]` : ''}
${missingItems.length > 0 ? `Missing items: actualMatches[${missingItems.join(', ')}]` : ''}
${JSON.stringify(matchedPackage.matchInfo.matches)}
`
                expect.fail(errorMessage)
              }

              // Check each expected item is in actual matches
              for (const expectedMatch of expectedMatchesSet) {
                if (!actualMatchesSet.has(expectedMatch)) {
                  expect.fail(`
File: ${fileName}
Missing expected match: "${expectedMatch}"
Expected matches: [${[...expectedMatchesSet].join(', ')}]
Actual matches: [${[...actualMatchesSet].join(', ')}]
`)
                }
              }

              // Check for extra items
              for (const actualMatch of actualMatchesSet) {
                if (!expectedMatchesSet.has(actualMatch)) {
                  expect.fail(`
File: ${fileName}
Extra unexpected match: "${actualMatch}"
Expected matches: [${[...expectedMatchesSet].join(', ')}]
Actual matches: [${[...actualMatchesSet].join(', ')}]
`)
                }
              }
            } else {
              // Fail test if we expected matches for a file that wasn't found
              expect.fail(`Expected file ${fileName} not found in ranked packages`)
            }
          }
        }
        expect(ranked.at(0)!.matchInfo.score.valueOf() > 1)
      })
    })
  })
})
