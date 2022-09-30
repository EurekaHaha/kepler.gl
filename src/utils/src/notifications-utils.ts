// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {generateHashId} from './utils';

import {
  DEFAULT_NOTIFICATION_MESSAGE,
  DEFAULT_NOTIFICATION_TOPICS,
  DEFAULT_NOTIFICATION_TYPES,
  DEFAULT_UUID_COUNT,
  BUG_REPORT_LINK
} from '@kepler.gl/constants';

/**
 * Creates a notification
 * @param opt
 * @param opt.message - Message to display during the notification
 * @param opt.type - The type of message. One of DEFAULT_NOTIFICATION_TYPES
 * @param opt.topic - The topic the notification belongs to. One of DEFAULT_NOTIFICATION_TOPICS
 * @param opt.id optional id for notification. If not provided it will be generated by the method
 * @param opt.options - Extra parameters to store as part of hte notification
 * @returns
 */
export function createNotification({
  message = DEFAULT_NOTIFICATION_MESSAGE,
  type = DEFAULT_NOTIFICATION_TYPES.info,
  topic = DEFAULT_NOTIFICATION_TOPICS.global,
  id = generateHashId(DEFAULT_UUID_COUNT),
  ...options
}: {
  message?: string;
  type?: string;
  topic?: string;
  id?: string;
  options?: any;
}) {
  return {
    ...options,
    id,
    message,
    type,
    topic
  };
}

/**
 * Creates an error notification
 * @param options
 * @returns {{topic, id, message, type: (null|number)}}
 */
export const errorNotification = options => ({
  ...createNotification(options),
  type: DEFAULT_NOTIFICATION_TYPES.error
});

/**
 * Creates a success notification
 * @param options
 * @returns {{topic, id, message, type: null}}
 */
export const successNotification = options => ({
  ...createNotification(options),
  type: DEFAULT_NOTIFICATION_TYPES.success
});

export const exportImageError = options =>
  errorNotification({
    ...options,
    topic: DEFAULT_NOTIFICATION_TOPICS.global,
    message: `Failed to export image, please take a screenshot of the javascript console, report the with [this link](${BUG_REPORT_LINK}) `
  });