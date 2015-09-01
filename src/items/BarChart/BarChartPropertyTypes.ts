/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="BarChartItemModel.ts" />
/// <reference path="BarDataPropertyType.ts" />

module ProStyle.Extensions.Items.BarChart {

    import Properties = ProStyle.Models.Properties;

    export class BarChartPropertyTypes {

        private static _propertyTypes: ProStyle.Models.Properties.IPropertyType[] = undefined;
        private static _barPropertyTypes: ProStyle.Models.Properties.IPropertyType[] = undefined;

        private static cacheProperties() {

            BarChartPropertyTypes._propertyTypes = [];
            BarChartPropertyTypes._barPropertyTypes = [];

            var p = BarChartPropertyTypes._propertyTypes;
            p.push(Properties.Cache.ANIMATION);
            p.push(Properties.Cache.CLASS);
            p.push(Properties.Cache.CROP_SVG);
            p.push(Properties.Cache.OPACITY);
            p.push(Properties.Cache.POSITION);
            p.push(Properties.Cache.ROTATION);
            p.push(Properties.Cache.SCALE);
            p.push(Properties.Cache.SKEW);

            var p = BarChartPropertyTypes._barPropertyTypes;
            p.push(Properties.Cache.ANIMATION);
            p.push(Properties.Cache.CLASS);
            p.push(new Properties.SvgFillPropertyType("rgba(0,0,0,0.5)"));
            p.push(Properties.Cache.OPACITY);
            p.push(Properties.Cache.SKEW);
            p.push(new BarDataPropertyType());
        }

        public static get(): ProStyle.Models.Properties.IPropertyType[] {
            if (BarChartPropertyTypes._propertyTypes === undefined) BarChartPropertyTypes.cacheProperties();
            return BarChartPropertyTypes._propertyTypes;
        }

        public static getForBars(): ProStyle.Models.Properties.IPropertyType[] {
            if (BarChartPropertyTypes._barPropertyTypes === undefined) BarChartPropertyTypes.cacheProperties();
            return BarChartPropertyTypes._barPropertyTypes;
        }
    }
}