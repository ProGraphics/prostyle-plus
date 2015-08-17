/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="BarChartItemModel.ts" />
/// <reference path="BarChartPropertyTypes.ts" />

module ProStyle.Extensions.Items.BarChart {

    var DEFAULT_WH = 50; //% of container
    var DEFAULT_M = 1; //% of chart width

    import Models = ProStyle.Models;
    import Serialization = ProStyle.Serialization;
    import Scripts = Models.Scripts;
    import Util = ProStyle.Util;

    export function serialize(model: BarChartItemModel): any {
        return {};
    }
}