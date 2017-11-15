import {compileToAssessML, compileToHTML, parse, getImageSrc, getGraphEquations, normalizeVariables, normalizeImages, normalizeGraphs, generateVarValue} from '../../assessml';
import {AST, ASTObject, Variable} from '../../assessml.d';
import {flattenContentObjects, verifyHTML, arbAST, resetNums} from '../../test-utilities';

const deepEqual = require('deep-equal');

class PrendusAssessMLTest extends HTMLElement {
    static get is() { return 'prendus-assessml-test'; }

    beforeTest() {
        resetNums();
    }

    prepareTests(test: any) {
        test('The parse function should take an arbitrary AssessML string and return a correct AssessML AST', [arbAST], (arbAST: AST) => {
            this.beforeTest();
            const flattenedAst = normalizeGraphs(normalizeImages(normalizeVariables(flattenContentObjects(arbAST))));
            const parsedAst = parse(compileToAssessML(flattenedAst, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName)), (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
            return deepEqual(flattenedAst, parsedAst, {
                strict: true
            });
        });

         test('The compileToAssessML function should take an arbitrary AssessML string and return a correct AssessML string', [arbAST], (arbAST: AST) => {
             this.beforeTest();
             const flattenedAst = normalizeGraphs(normalizeImages(normalizeVariables(flattenContentObjects(arbAST))));
             const assessMLString = compileToAssessML(flattenedAst, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
             return assessMLString === compileToAssessML(assessMLString, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
         });

         test('The compileToAssessML function should take an arbitrary AssessML AST and return a correct AssessML string', [arbAST], (arbAST: AST) => {
            this.beforeTest();
            const flattenedAst = normalizeGraphs(normalizeImages(normalizeVariables(flattenContentObjects(arbAST))));
            const assessMLString = compileToAssessML(flattenedAst, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
            return assessMLString === compileToAssessML(flattenedAst, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
         });

        test('The compileToHTML function should take an arbitrary AssessML AST and return a correct HTML string', [arbAST], (arbAST: AST) => {
            this.beforeTest();
            const flattenedAst = normalizeGraphs(normalizeImages(normalizeVariables(flattenContentObjects(arbAST))));
            const htmlString = compileToHTML(flattenedAst, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
            return verifyHTML(flattenedAst, htmlString);
        });

        test('The compileToHTML function should take an arbitrary AssessML string and return a correct HTML string', [arbAST], (arbAST: AST) => {
            this.beforeTest();
            const flattenedAst = normalizeGraphs(normalizeImages(normalizeVariables(flattenContentObjects(arbAST))));
            const assessMLString = compileToAssessML(flattenedAst, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
            const htmlString = compileToHTML(assessMLString, (varName) => generateVarValue(flattenedAst, varName), (varName) => getImageSrc(flattenedAst, varName), (varName) => getGraphEquations(flattenedAst, varName));
            return verifyHTML(flattenedAst, htmlString);
        });

        //TODO once getAstObjects gets more complicated, then you can test it
    }
}

window.customElements.define('prendus-assessml-test', PrendusAssessMLTest);
