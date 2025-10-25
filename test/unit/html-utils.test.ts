import { describe, it, expect } from 'vitest';
import { decodeHtmlEntity } from '../../server/utils/html-utils';

describe('decodeHtmlEntity', () => {
  it('should decode basic HTML entities', () => {
    const input = 'Tom &amp; Jerry &lt;Cartoon&gt;';
    const output = decodeHtmlEntity(input);
    expect(output).toBe('Tom & Jerry <Cartoon>');
  });

  it('should decode all supported entities', () => {
    const input = '&amp;&apos;&gt;&lt;&quot;&nbsp;&#160;';
    const output = decodeHtmlEntity(input);
    expect(output).toBe('&\'><"  '); // note: nbsp and #160 are both replaced with a space
  });

  it('should leave unknown entities untouched', () => {
    const input = 'This is &unknown; and should stay &unknown;';
    const output = decodeHtmlEntity(input);
    expect(output).toBe(input);
  });

  it('should handle text without any entities', () => {
    const input = 'Plain text with no entities.';
    const output = decodeHtmlEntity(input);
    expect(output).toBe(input);
  });

  it('should handle mixed known and unknown entities', () => {
    const input = 'Known: &amp;, Unknown: &foo;';
    const output = decodeHtmlEntity(input);
    expect(output).toBe('Known: &, Unknown: &foo;');
  });

  it('should decode numeric space entity (#160) to space', () => {
    const input = 'Hello&#160;World';
    const output = decodeHtmlEntity(input);
    expect(output).toBe('Hello World');
  });

  it('should work with uppercase entities (case-insensitive)', () => {
    const input = '1 &AMP; 2 &LT; 3';
    const output = decodeHtmlEntity(input);
    expect(output).toBe('1 & 2 < 3');
  });

  it('should handle repeated entities efficiently', () => {
    const input = '&amp;&amp;&amp;';
    const output = decodeHtmlEntity(input);
    expect(output).toBe('&&&');
  });
});
