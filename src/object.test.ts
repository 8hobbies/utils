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
import { isInObject } from "./object.js";

test("Returns true if key is in object", () => {
  const obj = { a: 1, b: 2 } as const;
  const key = "a" as const;
  expect(isInObject(key, obj)).toBeTruthy();
});

test("Returns false if key is not in object", () => {
  const obj = { a: 1, b: 2 } as const;
  const key = "c" as const;
  expect(isInObject(key, obj)).toBeFalsy();
});

test("Type guard determines key type to keyof object", () => {
  const obj = { a: 1, b: 2 } as const;
  const key = "a" as const;
  if (isInObject(key, obj)) {
    expectType<"a" | "b">(key);
  } else {
    expectType<never>(key);
  }
});
