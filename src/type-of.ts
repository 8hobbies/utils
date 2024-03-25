/**
 * Utilities for type names used in {@link !typeof}.
 * @module type-of
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

/**
 * @internal
 * Mapping from strings that can be returned by {@link !typeof} to their corresponding types.
 */
interface TypeOfTypesMapping {
  bigint: bigint;
  boolean: boolean;
  function: Function;
  number: number;
  object: object;
  string: string;
  symbol: symbol;
  undefined: undefined;
}

/**
 * List of types that may be returned by {@link !typeof}.
 */
export const typeOfNames = [
  "bigint",
  "boolean",
  "function",
  "number",
  "object",
  "string",
  "symbol",
  "undefined",
] as const;

/**
 * The names of the types that may be returned by {@link !typeof}.
 */
export type TypeOfNames = (typeof typeOfNames)[number];

/**
 * Get the type from the name returned by `typeof`.
 *
 * @typeParam TypeOfName - The name of the type that may be returned by {@link !typeof}. This is
 * useful when type manipulation requires a mapping between the return value of {@link !typeof} and
 * their corresponding types.
 *
 * @example
 * ```
 * const a: FromTypeOfName<"boolean">;  // a is boolean
 * const b: FromTypeOfname<"string">;  // b is string
 * const c: FromTypeOfname<"number" | "undefined">;  // c is number | undefined
 * ```
 */
export type FromTypeOfName<TypeOfName extends TypeOfNames> =
  TypeOfTypesMapping[TypeOfName];
