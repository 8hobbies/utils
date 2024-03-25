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

import { expectType } from "ts-expect";
import { isArrayOf } from "./array.js";

describe("isArrayOf with string type names", () => {
  test("Matched types", () => {
    const a: unknown = ["a", "b"];
    const aResult = isArrayOf(a, "string");
    expect(aResult).toBeTruthy();
    if (!aResult) {
      throw new Error("Unexpected falsy result.");
    }
    expectType<string[]>(a);

    const b: unknown = [1, 2];
    const bResult = isArrayOf(b, "number");
    expect(bResult).toBeTruthy();
    if (!bResult) {
      throw new Error("Unexpected falsy result.");
    }
    expectType<number[]>(b);
  });

  test("Mismatched types", () => {
    const a = ["a", "b"] as const;
    expect(isArrayOf(a, "number")).toBeFalsy();

    const b = [1, "b"] as const;
    expect(isArrayOf(b, "string")).toBeFalsy();
  });

  test("Empty array", () => {
    const a = [] as const;
    expect(isArrayOf(a, "number")).toBeTruthy();
  });
});

describe("isArrayOf with specified type guards", () => {
  interface TestType {
    testKey: unknown;
  }
  function testTypeGuard(arg: unknown): arg is TestType {
    return typeof arg === "object" && arg !== null && "testKey" in arg;
  }

  test("Matched types", () => {
    const a = [{ testKey: "testVal" }, { testKey: "testVal2" }] as const;
    const aResult = isArrayOf(a, testTypeGuard);
    expect(aResult).toBeTruthy();
    if (!aResult) {
      throw new Error("Unexpected falsy result.");
    }
    expectType<TestType[]>(a);
  });

  test("Mismatched types", () => {
    const a = [{ testKey1: "testVal" }, { testKey: "testVal2" }] as const;
    expect(isArrayOf(a, testTypeGuard)).toBeFalsy();
    const b = [{ testKey1: "testVal" }, { testKey1: "testVal2" }] as const;
    expect(isArrayOf(b, testTypeGuard)).toBeFalsy();
  });

  test("Empty array", () => {
    const a = [] as const;
    expect(isArrayOf(a, testTypeGuard)).toBeTruthy();
  });
});
