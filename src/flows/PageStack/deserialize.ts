/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="PageStackFlowModel.ts" />

module ProStyle.Extensions.Flows.PageStack {

    import Models = ProStyle.Models;
    import Scripts = ProStyle.Models.Scripts;
    import Util = ProStyle.Util;

    export function deserialize(story: Models.Story, json: any): Models.Flows.FlowModel {

        //
        // Configuration common to all flows
        //
        var placement = Types.Placement.fromJson(Util.getSetup(json, "placement"));
        var pageAspectRatio = Util.convertToNumber(Util.getSetup(json, "pageAspectRatio"), 4 / 3); //stack flows default to 4/3 ratio

        //
        // Configuration specific to stack flows
        //
        var stacks = Types.Stacks.fromJson(Util.getSetup(json, "stacks") || PageStackFlowModel.defaultStacksJson);

        return new PageStackFlowModel(story, placement, Util.getSetup(json, "defaultPageClass"), pageAspectRatio, stacks);
    }
}