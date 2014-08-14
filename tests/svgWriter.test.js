/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

var expect = require('chai').expect,
    OMG = require("../svgOMGenerator.js"),
    svgWriter = require("../svgWriter.js"),
    sinon = require('sinon'),
    fs = require('fs');

describe('svgWriter', function (){
    
    describe('our SVG writer', function (){

        var compareResults = function (testName) {
            var testData = require("./data/" + testName + "-data.js"),
                svgOM = OMG.extractSVGOM(testData, { }),
                string,
                svgOut = svgWriter.printSVG(svgOM);
            try {
                string = fs.readFileSync('./tests/data/' + testName + ".svg", 'utf8');
            } catch (e) {
                fs.writeFileSync('./tests/data/' + testName + ".svg", svgOut, 'utf8');
                console.log("No reference SVG document found. New one created as " + testName + ".svg");
                return svgOut;
            }
            expect(svgOut).to.equal(string);
            return svgOut;
        }

        it("should be able to SVG a gradient fill OM", function () {
            compareResults('svgFill');
        });

        it("should avoid douplicated gradients", function () {
            compareResults('gradient-duplicate');
        });

        it("should Adobe Logo", function () {
            compareResults('AdobeLogo');
        });

        it("should create rectangles with different properties.", function () {
            compareResults('svgRect');
        });

        it("should create text", function () {
            compareResults('svgText');
        });

        it("should align text", function () {
            compareResults('svgText-align');
        });

        it("should support vertical text", function () {            
            compareResults('svgText-writing-mode');
        });

        it("should support drop shadow and inner shadow", function () {
            compareResults('svgFx-shadow');
        });

        it("should support drop shadow, inner shadow and overlay", function () {
            compareResults('svgFx-shadow-overlay');
        });

        it("should support overlay", function () {
            compareResults('svgOverlay');
        });

        it("should support gradientOverlay", function () {
            compareResults('svgGradientOverlay');
        });

        it("should support gradientOverlay with opacity", function () {
            compareResults('svgGradientOverlay-opacity');
        });

        it("should support linear gradients", function () {
            compareResults('svgGradient');
        });

        it("should support gradients on text", function () {
            compareResults('svgTextGradient');
        });

        it("should support shadows and overlays on text", function () {
            compareResults('svgTextFx');
        });

        it("should support satin fx effect", function () {
            compareResults('svgFx-satin');
        });

        it("should avoid duplicated filter defintions", function () {
            compareResults('filter-duplicate');
        });

        // FIXME: PSD file missing. Needs to be recreated.
        // it("should combine all fx effect", function () {
        //     compareResults('svgFx-all');
        // });

        it("should show embedded data", function () {
            compareResults('pixelImage');
        });

        it("should show linked data", function () {
            compareResults('pixelImage-linked');
        });

        it("should show embedded data with fx effects", function () {
            compareResults('pixelImage-fx');
        });

        it("should show outer glow fx effects", function () {
            compareResults('outer-glow');
        });

        it("should show inner glow fx effects", function () {
            compareResults('svgFx-inner-glow');
        });

        it("should show radial gradients", function () {
            compareResults('svgGradient-radial');
        });

        it("should show scaled gradients", function () {
            compareResults('gradient-scale');
        });

        it("should show reflected gradients", function () {
            compareResults('svgGradient-reflected');
        });

        it("should show scaled, reflected gradients", function () {
            compareResults('gradient-scale-reflected');
        });

        it("should show reversed gradients", function () {
            compareResults('gradient-reverse');
        });

        it("should show stroke style", function () {
            compareResults('stroke-style');
        });

        it("should show fx effects on grouping layers", function () {
            compareResults('group');
        });

        it("should support different radii for radial gradients in layer space", function () {
            compareResults('radial-gradient-angle-layer');
        });

        it("should support different radii for radial gradients in global space", function () {
            compareResults('radial-gradient-angle-global');
        });

        it("should support different radii for linear gradients in layer space", function () {
            compareResults('linear-gradient-angle-layer');
        });

        it("should support different radii for linear gradients in layer space part 2", function () {
            compareResults('linear-gradient-angle-layer-2');
        });

        it("should support different radii for linear gradients in global space", function () {
            compareResults('linear-gradient-angle-global');
        });

        it("should support different radii for linear gradients in layer space part 2", function () {
            compareResults('linear-gradient-angle-global-2');
        });

        it("should support text styling", function () {
            compareResults('text-styling');
        });

        it("should support text on path", function () {
            compareResults('text-on-path');
        });

        it("should support text transformation", function () {
            compareResults('text-transform');
        });

        it("should differ between local and gloval lighting", function () {
            compareResults('light-global-local');
        });

    });
});
