function setHTMLFixture() {
	return setFixtures('<div id="kslider-wrapper" class="kslider-wrapper"><ul class="kslider">'
	+ '<li class="active"><img src="../demo/img/item-1.jpg" alt="Item 1" /></li>'
	+ '<li><img src="../demo/img/item-2.jpg" alt="Item 2" /></li>'
	+ '<li><img src="../demo/img/item-3.jpg" alt="Item 3" /></li>'
	+ '<li><img src="../demo/img/item-4.jpg" alt="Item 4" /></li>'
	+ '</ul></div>');
};

describe("Kslider", function() {

	var dom;

	beforeAll(function() {
		dom = $(setHTMLFixture());
	});

	describe("DOM loaded", function() {

		it("Element #kslider-wrapper is in DOM", function() {
			const el = dom.find('#kslider-wrapper');
			expect(el).toBeDefined();
		});

		it("Element .kslider list is in DOM", function() {
			const el = dom.find('.kslider-wrapper');
			expect(el).toBeDefined();
		});

	});

	describe("Plugin", function() {
		it("kslider must be a function", function() {
			expect(typeof dom.find('.kslider').kslider).toBe('function');
		});
	})
});