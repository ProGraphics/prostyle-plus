/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="SimpleBarChartItemModel.ts" />
/// <reference path="BarDataPropertyType.ts" />

module ProStyle.Extensions.Items.SimpleBarChart {

    import Properties = ProStyle.Models.Properties;

    export class SimpleBarChartPropertyTypes {

        private static _propertyTypes: ProStyle.Models.Properties.IPropertyType[] = undefined;
        private static _barPropertyTypes: ProStyle.Models.Properties.IPropertyType[] = undefined;

        private static cacheProperties() {

            SimpleBarChartPropertyTypes._propertyTypes = [];
            SimpleBarChartPropertyTypes._barPropertyTypes = [];

            var p = SimpleBarChartPropertyTypes._propertyTypes;
            //p.push(Properties.Cache.ANCHOR);
            p.push(Properties.Cache.ANIMATION);
            //p.push(Properties.Cache.BACKGROUND);
            //p.push(Properties.Cache.BORDER);
            //p.push(Properties.Cache.CORNERS);
            p.push(Properties.Cache.CROP_SVG);
            p.push(Properties.Cache.OPACITY);
            p.push(Properties.Cache.POSITION);
            p.push(Properties.Cache.ROTATION);
            p.push(Properties.Cache.SCALE);
            p.push(Properties.Cache.SKEW);
            //p.push(Properties.Cache.TRANSFORM_ORIGIN);

            var p = SimpleBarChartPropertyTypes._barPropertyTypes;
            p.push(Properties.Cache.ANIMATION);
            p.push(new Properties.SvgFillPropertyType("rgba(0,0,0,0.5)"));
            p.push(Properties.Cache.OPACITY);
            p.push(Properties.Cache.SKEW);
            p.push(new BarDataPropertyType());
        }

        public static get(): ProStyle.Models.Properties.IPropertyType[] {
            if (SimpleBarChartPropertyTypes._propertyTypes === undefined) SimpleBarChartPropertyTypes.cacheProperties();
            return SimpleBarChartPropertyTypes._propertyTypes;
        }

        public static getForBars(): ProStyle.Models.Properties.IPropertyType[] {
            if (SimpleBarChartPropertyTypes._barPropertyTypes === undefined) SimpleBarChartPropertyTypes.cacheProperties();
            return SimpleBarChartPropertyTypes._barPropertyTypes;
        }
    }
}