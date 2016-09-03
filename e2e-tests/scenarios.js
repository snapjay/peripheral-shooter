'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /instructor when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/instructor");
  });


  describe('instructor', function() {

    beforeEach(function() {
      browser.get('index.html#!/instructor');
    });


    it('should render instructor when user navigates to /instructor', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('shooter', function() {

    beforeEach(function() {
      browser.get('index.html#!/shooter');
    });


    it('should render shooter when user navigates to /shooter', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
