sap.ui.define([
		"opensap/manageproducts/model/formatter",
		"test/unit/helper/FakeI18nModel",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	], function (formatter, FakeI18n) {
		"use strict";

		QUnit.module("Number unit");

		function numberUnitValueTestCase(assert, sValue, fExpectedNumber) {
			// Act
			var fNumber = formatter.numberUnit(sValue);

			// Assert
			assert.strictEqual(fNumber, fExpectedNumber, "The rounding was correct");
		}

		QUnit.test("Should round down a 3 digit number", function (assert) {
			numberUnitValueTestCase.call(this, assert, "3.123", "3.12");
		});

		QUnit.test("Should round up a 3 digit number", function (assert) {
			numberUnitValueTestCase.call(this, assert, "3.128", "3.13");
		});

		QUnit.test("Should round a negative number", function (assert) {
			numberUnitValueTestCase.call(this, assert, "-3", "-3.00");
		});

		QUnit.test("Should round an empty string", function (assert) {
			numberUnitValueTestCase.call(this, assert, "", "");
		});

		QUnit.test("Should round a zero", function (assert) {
			numberUnitValueTestCase.call(this, assert, "0", "0.00");
		});
		
		QUnit.module("Delivery", {
			setup: function () {
				var oControllerStub = {
					getModel: sinon.stub().withArgs("i18n").returns(new FakeI18n({
						formatterMailDelivery : "mail",
						formatterParcelDelivery : "parcel",
						formatterCarrierDelivery : "carrier"
					}))
				};
				// instead of a local variable, assigning it to this
				this.fnIsolatedFormatter = formatter.delivery.bind(oControllerStub);
			},
			teardown: function () {
				this.fnIsolatedFormatter = null;
			}
		});
		
		QUnit.test("Should return mail delivery method based on the weight of the product", function(assert) {
			// var oControllerStub = {
			// 	getModel: sinon.stub().withArgs("i18n").returns(new FakeI18n({
			// 		// harded text for testing
			// 		formatterMailDelivery : "mail"
			// 	}))
			// };
			// var fnIsolatedFormatter = formatter.delivery.bind(oControllerStub);
			assert.strictEqual(this.fnIsolatedFormatter("KG", 0.3), "mail");
			assert.strictEqual(this.fnIsolatedFormatter("G", 200), "mail");
		});
		
		QUnit.test("Should return parcel delivery method based on the weight of the product", function(assert) {
			assert.strictEqual(this.fnIsolatedFormatter("KG", 3), "parcel");
			assert.strictEqual(this.fnIsolatedFormatter("G", 3100), "parcel");
		});

		QUnit.test("Should return carrier delivery method based on the weight of the product", function(assert) {
			assert.strictEqual(this.fnIsolatedFormatter("KG", 5.5), "carrier");
			assert.strictEqual(this.fnIsolatedFormatter("G", 5001), "carrier");
			assert.strictEqual(this.fnIsolatedFormatter("foo", "bar"), "carrier");
		});
	}
);