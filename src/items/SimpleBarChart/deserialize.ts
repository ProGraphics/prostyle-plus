/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="SimpleBarChartItemModel.ts" />
/// <reference path="SimpleBarChartPropertyTypes.ts" />

module ProStyle.Extensions.Items.SimpleBarChart {

    var DEFAULT_WH = 50; //% of container
    var DEFAULT_M = 1; //% of chart width

    import Models = ProStyle.Models;
    import Serialization = ProStyle.Serialization;
    import Scripts = Models.Scripts;
    import Util = ProStyle.Util;

    export function deserialize(itemSet: Models.IItemModelSet, json): SimpleBarChartItemModel {
        var bars = Math.max(1, Math.min(Util.convertToNumber(Util.getSetup(json, "bars")), 100));
        var width = Math.max(0, Util.convertToNumber(Util.getSetup(json, "width"), DEFAULT_WH));
        var height = Math.max(0, Util.convertToNumber(Util.getSetup(json, "height"), DEFAULT_WH));
        var margin = Math.max(0, Util.convertToNumber(Util.getSetup(json, "margin"), DEFAULT_M));

        var minDomainValue = 0;
        var maxDomainValue = 0;
        var domain = Util.getSetup(json, "domain");

        if (typeof domain === 'number') {
            maxDomainValue = domain;
        }
        else if (domain instanceof Array) {
            minDomainValue = domain.length > 0 ? Util.convertToNumber(domain[0]) : 0;
            maxDomainValue = domain.length > 1 ? Util.convertToNumber(domain[1]) : 0;
        }

        if (maxDomainValue < minDomainValue) {
            var swap = maxDomainValue;
            maxDomainValue = minDomainValue;
            minDomainValue = swap;
        }

        var propertyTypes = SimpleBarChartPropertyTypes.get();
        var barPropertyTypes = SimpleBarChartPropertyTypes.getForBars();

        var init = Serialization.PropertyListReader.read(itemSet.story, json.init, propertyTypes);
        var barsInit = Serialization.PropertyListReader.read(itemSet.story, json.barInit || json.barsInit, barPropertyTypes);

        var scriptSet = Serialization.ScriptSetReader.readJson(itemSet, "Chart", json, [""], propertyTypes);
        var barsScriptSet = Serialization.ScriptSetReader.readJson(itemSet, "Bars", json, ["bar", "bars"], barPropertyTypes);

        return new SimpleBarChartItemModel(itemSet, bars, width, height, margin, minDomainValue, maxDomainValue,
                                           init, scriptSet, barsInit, barsScriptSet);
    }
}