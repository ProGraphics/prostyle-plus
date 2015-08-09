/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="PageStackFlowModel.ts" />

module ProStyle.Extensions.Flows.PageStack {

    import Models = ProStyle.Models;
    import Views = ProStyle.Views;

    export class PageStackFlowView extends Views.Flows.PlacementFlowView {

        constructor(private pageStackFlow: PageStackFlowModel, camera: Views.CameraView, flowIndex: number) {
            super(pageStackFlow, camera, flowIndex);
        }

        public initializePages(timeline: TimelineMax) {

            var pageSize = this.camera.size.getContainedSize(this.pageStackFlow.pageAspectRatio);

            this.pages.forEach((pageElem: Views.PageView, index: number) => {
                var css = {
                    width: pageSize.width,
                    height: pageSize.height,
                    perspective: 10000 //(pageSize.width + pageSize.height) / 2
                };
                timeline.set(this.pages[index].div, css, "initialize");
            });
        }

        public generatePageMovement(timeline: TimelineMax, label: string, pageIndex: number) {
            var current = this.pageStackFlow.stacks.current;
            var future = this.pageStackFlow.stacks.future;
            var futureOffset = this.pageStackFlow.stacks.futureOffset;
            var past = this.pageStackFlow.stacks.past;
            var pastOffset = this.pageStackFlow.stacks.pastOffset;

            var pageSize = this.camera.size.getContainedSize(this.pageStackFlow.pageAspectRatio);

            var css = current.renderCss(pageSize);
            this.applyCss(timeline, this.pages[pageIndex].div, label, 1, css, Expo.easeOut);

            past = past.duplicate();
            for (var i = pageIndex - 1; i >= 0; i--) {
                css = past.renderCss(pageSize);
                this.applyCss(timeline, this.pages[i].div, label, 1, css, Expo.easeOut);
                past.adjust(pastOffset);
            }

            future = future.duplicate();
            for (var i = pageIndex + 1; i < this.pages.length; i++) {
                css = future.renderCss(pageSize);
                this.applyCss(timeline, this.pages[i].div, label, 1, css, Expo.easeOut);
                future.adjust(futureOffset);
            }
        }

        private applyCss(timeline: TimelineMax, div: HTMLElement, label: string, duration: number, css: any,
                         ease: Ease) {
            if (label === "initialize") {
                timeline.set(div, css, label);
            }
            else {
                css.ease = ease;
                timeline.to(div, duration, css, label);
            }
        }
    }
}