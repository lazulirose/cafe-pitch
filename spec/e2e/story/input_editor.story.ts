/// <reference path="../../../typings/globals/mocha/index.d.ts" />

import {Application} from '../e2e_test_helper';
import * as assert from 'power-assert';
import SlideEditorPage from '../page/slide_editor.page';
import { jsdom } from 'jsdom';

describe('input text to editor.', function () {
  this.timeout(10000);
  let app = new Application();
  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    return app.stop();
  });

  describe('input markdown text', function() {
    it('parses and renders html.', function() {
      const page = new SlideEditorPage(app.client);
      return page.inputText('# h1 title\n## h2 title')
        .then(() => page.getSlideHtml())
        .then((html) => {
          const dom: Document = jsdom(html);
          const h1 = dom.querySelector('h1');
          assert.equal(h1.textContent, 'h1 title');
          const h2 = dom.querySelector('h2');
          assert.equal(h2.textContent, 'h2 title');
        });
    });
  });

  describe('input :emoji:', function() {
    it('renders image', function() {
      const page = new SlideEditorPage(app.client);
      return page.inputText(':bow:')
        .then(() => page.findEmoji('bow'))
        .then((result) => assert.ok(result));
    });
  });
});
