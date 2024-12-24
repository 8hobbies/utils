/** Utilities for handling objects.
 *
 * @module object
 */

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

/** A type guard that determines if the given key is a member the given object.
 *
 * @param key - the key.
 * @param obj - the object.
 * @typeParam T - the type of the object.
 * @returns true if `key` is a member of `object`, false otherwise. The type of
 * `key` is determined to be `keyof T` if the return value is true.
 */
export function isInObject<T extends object>(
  key: PropertyKey,
  obj: T,
): key is keyof T {
  return key in obj;
}
