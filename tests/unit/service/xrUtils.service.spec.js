import { module, inject } from "angular-mocks";

import "../../../app/core/core.module";

(function () {
    'use strict';

    describe('XrUtils', function(){

        var XrUtils,
            filter,
            momentMock,
            mockWeekNumber;

        beforeEach(module('xr.core'));
        beforeEach(module(function ($provide) {
            mockWeekNumber = 42;
            momentMock = function () {
                return {
                    isoWeek: function () {
                        return mockWeekNumber;
                    },
                    month: function () {
                        return 0;
                    }
                }
            };

            momentMock.months = function () {
                return ["January","February","March","April","May","June","July","August","September","October","November","December"];
            };

            $provide.value('moment', momentMock);
        }));
        beforeEach(inject(function(_XrUtils_, $filter) {
            XrUtils = _XrUtils_;
            filter = $filter;
        }));

        describe('getFormattedEntryDate', function () {
            it('should set up simple date on daily entries', function () {
                var isoDate = new Date().toISOString();
                var dailyEntry = {
                    typeName: 'Daily',
                    effectiveDate: isoDate
                };

                var formattedDate = XrUtils.getFormattedEntryDate(dailyEntry);
                expect(formattedDate).toBe(filter('date')(dailyEntry.effectiveDate));
            });

            it('should set up week number date for weekly entries', function () {
                var isoDate = new Date().toISOString();
                var weeklyEntry = {
                    typeName: 'Weekly',
                    effectiveDate: isoDate
                };

                var formattedDate = XrUtils.getFormattedEntryDate(weeklyEntry);
                expect(formattedDate).toBe('Week ' + mockWeekNumber);
            });
            
            it('should set up month for monthly entries', function () {
                var isoDate = new Date().toISOString();
                var monthlyEntry = {
                    typeName: 'Monthly',
                    effectiveDate: isoDate
                };

                var formattedDate = XrUtils.getFormattedEntryDate(monthlyEntry);
                expect(formattedDate).toBe('January');
            });

            it('should return empty string for non-supported entries', function () {
                var isoDate = new Date().toISOString();
                var invalidEntry = {
                    typeName: 'Quarterly',
                    effectiveDate: isoDate
                };

                var formattedDate = XrUtils.getFormattedEntryDate(invalidEntry);
                expect(formattedDate).toBe('');
            });
        });

        describe('getEntryHeader', function () {
            it('should return a combination of typeName and className', function () {
                var entry = {
                    typeName: 'Daily',
                    className: 'Outcome'
                };

                var entryHeader = XrUtils.getEntryHeader(entry);

                expect(entryHeader).toBe(entry.typeName + ' ' + entry.className);
            });
        });

    });
})();