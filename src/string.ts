/**
 * Utilities for strings.
 * @module string
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

/** Indicates whether a give string is blank.
 *
 * A string is blank if it is empty or contains only blank characters:
 * https://developer.mozilla.org/en-US/docs/Glossary/Whitespace
 *
 * @param s - A string to determine whether it's blank.
 * @returns whether `s` is blank.
 */
export function isBlank(s: string): boolean {
  return s.trim().length === 0;
}
