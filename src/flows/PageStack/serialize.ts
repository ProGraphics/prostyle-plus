/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="PageStackFlowModel.ts" />

module ProStyle.Extensions.Flows.PageStack {

    import Models = ProStyle.Models;
    import Scripts = ProStyle.Models.Scripts;
    import Util = ProStyle.Util;
    
    export function serialize(model: PageStackFlowModel): any  {

        //TODO: write the json configuration back out.
        // Important,
        //   don't write current page placement values if it is default
        //   don't write future and past page placements and their offsets if they equal the defaults

        var json: any = {};
        json.setup = {};
        if (model.defaultPageClass !== undefined) json.setup.defaultPageClass = model.defaultPageClass;
        return json;
    }
}