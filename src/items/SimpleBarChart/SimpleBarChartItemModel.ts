/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="serialize.ts" />
/// <reference path="SimpleBarChartItemView.ts" />

module ProStyle.Extensions.Items.SimpleBarChart {

    import Models = ProStyle.Models;
    import Properties = Models.Properties;
    import Scripts = Models.Scripts;

    export class SimpleBarChartItemModel extends Models.Items.ItemModel {

        constructor(itemSet: ProStyle.Models.IItemModelSet,
                    public bars: number,
                    public width: number,
                    public height: number,
                    public margin: number,
                    public minDomainValue: number,
                    public maxDomainValue: number,
                    init: Properties.PropertyList,
                    scriptSet: Scripts.ScriptSet,
                    public barsInit: Properties.PropertyList,
                    public barsScriptSet: Scripts.ScriptSet) {

            super(itemSet, "simpleBarChart", "SimpleBarChart", [init, barsInit], [scriptSet, barsScriptSet]);

        }
        
        public serialize(): any {
            return SimpleBarChart.serialize(this);
        }

        public createView(itemViewSet: Views.IItemViewSet): SimpleBarChartItemView {
            return new SimpleBarChartItemView(this, itemViewSet);
        }
    }
}