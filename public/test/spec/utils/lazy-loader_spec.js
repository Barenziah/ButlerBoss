define(
	['utils/lazy-loader'],
	function(loader) {

/* SETUP */

/* END SETUP */

/* TESTS */
		describe("Lazy Loader", function() {

			describe("#get", function() {
				it("should return a Promise Object", function() {
					var promise = loader.get('utils/communicator');

					expect(promise.then).toEqual(jasmine.any(Function));
				});

				it("should retreive a module", function() {
					var module1p, module1;
					var done = false;

					runs(function(){
						loader.get('utils/communicator').then(function(m){
							module1 = m;
							done = true;
						});
					});

					waitsFor(function() {
						return done;
					}, "Module should have loaded", 500);

					runs(function(){
						expect(module1).toEqual(jasmine.any(Function));
					});
				});

				it("should retreive multiple modules when given multiple arguments", function() {
					var module1, module2;
					var done = false;

					runs(function(){
						loader.get('utils/communicator', 'utils/socket').then(function(m1, m2){
							module1 = m1;
							module2 = m2;
							done = true;
						});
					});

					waitsFor(function() {
						return done;
					}, "Modules should have loaded", 500);

					runs(function(){
						expect(module1).toEqual(jasmine.any(Function));
						expect(module2).toEqual(jasmine.any(Function));
					});
				});
			});

		});
/* END TESTS */

});