(function () {

	"use strict";

	function setHTMLFixture() {
		return setFixtures('<ul class="lslider">'
		+ '<li class="active"><img src="img/item-1.jpg" alt="Item 1" /></li>'
		+ '<li><img src="img/item-2.jpg" alt="Item 2" /></li>'
		+ '<li><img src="img/item-3.jpg" alt="Item 3" /></li>'
		+ '<li><img src="img/item-4.jpg" alt="Item 4" /></li>'
		+ '</ul>');
	}

	describe("Lslider", function() {

		describe("Initialize", function() {

			beforeEach(function() {
				setHTMLFixture();
			});

			describe("DOM", function() {

				it("view component must be initialized by #searcher wrapping in DOM", function() {
					expect($('.lslider')[0]).toBeInDOM();
				});

			});

		});

	});

})();