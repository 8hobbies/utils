/**
 * Utilities for arrays.
 * @module array
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

import type { FromTypeOfName, TypeOfNames } from "./type-of.d.ts";
import type { TypeGuardOf } from "./type-guard.d.ts";

/** Type guard for an array of a given type name.
 *
 * @param arg - Expression that is determined to be an array or not.
 */
export function isArrayOf<TypeOfName extends TypeOfNames>(
  arg: unknown,
  typeName: TypeOfName,
): arg is Array<FromTypeOfName<TypeOfName>>;

/** Type guard for an array of a given type `T` determined by a given type guard.
 *
 * @typeParam T - The type of the element of the array.
 * @param arg - Expression that is determined to be an array of `T` or not.
 * @param pred - The type guard for element T.
 * @returns Whether `arg` is an array of elements of type `T`.
 */
export function isArrayOf<T>(arg: unknown, pred: TypeGuardOf<T>): arg is T[];

/** @hidden */
export function isArrayOf<T>(
  arg: unknown,
  predOrTypeName: TypeGuardOf<T> | TypeOfNames,
): arg is T[] {
  let pred: TypeGuardOf<T>;
  if (typeof predOrTypeName === "string") {
    pred = (elem): elem is T => typeof elem === predOrTypeName;
  } else {
    pred = predOrTypeName;
  }

  return Array.isArray(arg) && arg.every((elem) => pred(elem));
}
