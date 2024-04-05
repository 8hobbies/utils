/** Utilities for determining whether a value is in a given {@link !Array}/{@link !Set}.
 *
 * JavaScript {@link !Array.includes} and {@link !Set.has} determine whether a value is in a given
 * {@link !Array}/{@link !Set}. They are typed such that the parameter must be assignable to the
 * element type of the {@link !Array}/{@link !Set}:
 *
 * ```ts
 * const fruits = ["apple", "orange", "grape"];  // or new Set(["apple", "orange", "grape"])
 * const fireball: string = "fire ball";
 * const containingFireball = fruits.includes(fireball);  // or fruits.has(fireball); OK
 * const containingNumber1 = fruits.includes(1);  // or fruits.has(1);
 * // error: Argument of type 'number' is not assignable to parameter of type 'string'.
 * ```
 *
 * This makes sense, because when `fruits` is dynamically constructed by the logic of the program,
 * an unmatched element type is not intended and likely an error. However, the third line in the
 * above code snippet would fail to compile if array contains literal types:
 *
 * ```ts
 * const fruits = ["apple", "orange", "grape"] as const;  // or new Set(["apple", "orange", "grape"] as const);
 * const fireball: string = "fire ball";
 * const containingFireball = fruits.includes(fireball);  // or fruits.has(fireball);
 * // error: Argument of type 'string' is not assignable to parameter of
 * // type '"apple" | "orange" | "grape"'.
 * ```
 *
 * This doesn't make sense because the semantics has changed: `fireball` doesn't have to have one of
 * the literal string types in `fruits`.
 *
 * To address this issue, this module provides a {@link isOneOf} function that is typed to
 * accommodate the second scenario above, while retains the same logic as {@link !Array.includes}
 * and {@link !Set.has}:
 *
 * ```ts
 * const fruits = ["apple", "orange", "grape"] as const;  // or new Set(["apple", "orange", "grape"] as const);
 * const fireball: string = "fire ball";
 * const containsFireball = isOneOf(fireball, fruits);  // OK
 * ```
 *
 * For the first scenario, you should continue using {@link !Array.includes} and {@link !Set.has}.
 *
 * @module is-one-of
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

/** Returns whether `array` includes `element`.
 *
 * Logically this is the same as `array.includes(element)`, but is typed differently to accommondate
 * the scenario in which `array` contains literal-type elements. See {@link is-one-of} for details.
 *
 * @typeParam T - The type of `element`.
 * @param element - The element to be determined whether it is included in `array`.
 * @param array - The array to be determined whether it includes `element`.
 * @returns Whether whether `array` includes `element`.
 * @see {@link is-one-of}
 */
export function isOneOf<T>(
  element: T,
  array: Readonly<Array<NoInfer<T>>>,
): boolean;

/** Returns whether `set` includes `element`.
 *
 * Logically this is the same as `set.has(element)`, but is typed differently to accommodate the
 * scenario in which `set` contains literal-type elements. See {@link is-one-of} for details.
 *
 * @typeParam T - The type of `element`.
 * @param element - The element to be determined whether it is included in `set`.
 * @param set - The set to be determined whether it includes `element`.
 * @returns Whether whether `set` includes `element`.
 * @see {@link is-one-of}
 */
export function isOneOf<T>(element: T, set: Readonly<Set<NoInfer<T>>>): boolean;

/** A catch-all overload of the other two overloads. Check out the other two overloads for details.
 *
 * This overload addresses the edge case in which `collection` may be either a {@link Array} or
 * {@link Set}, and is expected to be used rarely.
 *
 * @example
 * ```ts
 * for (const collection of [
 *   ["apple", "orange"] as const,
 *   new Set(["green", "red"] as const),
 * ]) {
 *   isOneOf("sky", collection);
 *   // collection is of type readonly ["apple", "orange"] | Set<"green" | "red">
 * }
 * ```
 */
export function isOneOf<T>(
  element: T,
  collection: Readonly<Array<NoInfer<T>>> | Readonly<Set<NoInfer<T>>>,
): boolean;

/** @hidden */
export function isOneOf<T>(
  element: T,
  collection: Readonly<Array<NoInfer<T>>> | Readonly<Set<NoInfer<T>>>,
): boolean {
  if (Array.isArray(collection)) {
    return collection.includes(element);
  } else if (collection instanceof Set) {
    return collection.has(element);
  }
  throw new Error("Unreachable code reached");
}
