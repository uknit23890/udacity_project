/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    var allFeedsArray = allFeeds.length;


    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeedsArray).not.toBe(0);

        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it(' URL is defined and it is not empty', function() {
            for(var i = 0; i < allFeedsArray; i++) {
                    expect(allFeeds[i].url).toBeDefined();
                    expect(allFeeds[i].url.length).not.toBe(0);
                }
         });


        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it(' name is defined and it is not empty', function() {
            for(var i = 0; i < allFeedsArray; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {

        var body = $('body'),
        menu = $('.menu-icon-link');

        /* This test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toEqual(true);
         })

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('display when clicked once and closed when clicked again', function() {
             menu.trigger('click');
             expect(body.hasClass('menu-hidden')).toBeFalsy();

             menu.trigger('click');
             expect(body.hasClass('menu-hidden')).toBeTruthy();
          });
        });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {




        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('should contain at least one single .entry element', function(done) {
            var feedlist = $('.feed .entry')[0];
            expect(feedlist).toBeGreaterThan(0);
            done();
         });

    });

    /* This test suite is named "New Feed Selection"

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         describe('New Feed Selection', function() {

            var beforeContent, afterContent;

            beforeEach(function(done) {

                // Saving <h2> tag titles in beforeContent variable
                // Both variables will be used to compare later
                // Comparison between first loading and second loading
                // Using done() bcoz it's an asynchronous.

                loadFeed(0, function() {
                    // beforeContent = $('.feed').getElementByTagName('h2').text();
                    beforeContent = $('.feed').find('h2').text();
                    console.log("Before Content: " + beforeContent);
                    done();
                });
            });

            it('changes the content when new feed will be loaded', function(done) {
                // here the feed is loaded again
                // we save the titles in afterContent variable
                // Using done() as this is same feed and it is asynchronous
                loadFeed(1, function() {
                    // afterContent = $('.feed').getElementByTagName('h2').text();
                    afterContent = $('.feed').find("h2").text();
                    console.log("After Content: " + afterContent);
                    expect(beforeContent).not.toEqual(afterContent);
                    done();
                })
            })

         })



}());
