/** @license Apache-2.0
 *
 * Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>
 *
 * Licensed under the Apache License, Version 2.0(the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isOneOf } from "./is-one-of.js";

describe("isOneOf applied to a collection of literals", () => {
  for (const collection of [
    ["a", "b"] as const,
    new Set(["a", "b"] as const),
  ]) {
    test(`${collection.toString()} including with non-literal element type returns true`, () => {
      expect(isOneOf("a", collection)).toBe(true);
    });

    test(`${collection.toString()} not including with non-literal element type returns false`, () => {
      expect(isOneOf("c", collection)).toBe(false);
    });

    test(`${collection.toString()} including with literal element type leads to no type error`, () => {
      expect(isOneOf("a" as const, collection)).toBe(true);
    });

    test(`${collection.toString()} not including literal element type leads to no type error`, () => {
      expect(isOneOf("c" as const, collection)).toBe(false);
    });
  }
});

describe("isOneOf applied to unknown collection type", () => {
  test("throw error", () => {
    expect(() => {
      // @ts-expect-error
      isOneOf("a", 100);
    }).toThrow(/Unreachable/);
  });
});
