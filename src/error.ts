/**
 * Utilities for errors.
 * @module error
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

/** Converts an error in catch clause to string.
 *
 * @param error - The error object.
 * @returns
 * 1. If `error` is a string, returns `error`.
 * 2. If `error` is an object that has a `message` field, returns `error.message`.
 * 3. Otherwise, apply {@link !JSON.stringify} to `error` and returns the result.
 * @example
 * ```
 * try {
 *   // ...
 * } catch (e) {
 *   console.error(`Something failed: ${convertErrorToString(e)}`);
 * }
 * ```
 */
export function convertErrorToString(error: unknown): string {
  if (typeof error === "string") {
    return error;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  } else {
    return JSON.stringify(error);
  }
}
