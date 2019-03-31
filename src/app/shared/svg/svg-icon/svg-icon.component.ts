import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "svg-icon",
  templateUrl: "./svg-icon.component.html",
  styleUrls: ["./svg-icon.component.scss"]
})
export class SvgIconComponent implements AfterViewInit {
  public svgIcon: any;

  @Input()
  public icon: string;

  constructor(private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if(this.icon) {
      this.renderIcon();
    }
    this.cdRef.detectChanges();
  }

  public static icons: any = {
    google: `<svg id="google-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path id="Path_45" data-name="Path 45" class="g-1" d="M7.092,148.964l-1.114,4.158-4.071.086a16.028,16.028,0,0,1-.118-14.941h0l3.624.664L7,142.535a9.549,9.549,0,0,0,.09,6.429Z" transform="translate(0 -129.626)"/>
                <path id="Path_46" data-name="Path 46" class="g-2" d="M277,208.176a15.994,15.994,0,0,1-5.7,15.466h0l-4.565-.233-.646-4.033a9.536,9.536,0,0,0,4.1-4.869h-8.556v-6.33H277Z" transform="translate(-245.276 -195.165)"/>
                <path id="Path_47" data-name="Path 47" class="g-3" d="M54.618,318.547h0a16,16,0,0,1-24.11-4.895l5.185-4.244a9.516,9.516,0,0,0,13.712,4.872Z" transform="translate(-28.602 -290.071)"/>
                <path id="Path_48" data-name="Path 48" class="g-4" d="M53.048,3.684,47.864,7.927a9.514,9.514,0,0,0-14.027,4.982L28.625,8.642h0A16,16,0,0,1,53.048,3.684Z" transform="translate(-26.835)"/>
              </svg>
            `,
    facebook: `<svg id="facebook-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.134 32">
                <path id="Path_44" data-name="Path 44" class="f-1" d="M16.067.349a16.058,16.058,0,0,0-2.68,31.893V19.768H9.512V15.279h3.876v-3.31c0-3.84,2.346-5.933,5.772-5.933a31.986,31.986,0,0,1,3.461.176v4.014H20.244c-1.863,0-2.222.885-2.222,2.184v2.865h4.445l-.58,4.489H18.021V32.349a16.059,16.059,0,0,0-1.954-32Z" transform="translate(0 -0.349)"/>
              </svg>
              `,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80">
            <defs>
              <style>
                .cls-1 {fill: url(#linear-gradient);
                }
                .cls-2, .cls-4 {
                  fill: none;
                }
                .cls-2 {
                  stroke: #fff;
                  stroke-width: 2px;
                }
                .cls-3 {
                  stroke: none;
                }
              </style>
              <linearGradient id="linear-gradient" x1="0.227" y1="0.304" x2="0.831" y2="0.817" gradientUnits="objectBoundingBox">
                <stop offset="0" stop-color="#09f"/>
                <stop offset="1" stop-color="#1ad0fd"/>
              </linearGradient>
            </defs>
            <g id="Group_1178" data-name="Group 1178" transform="translate(-643 -190)">
              <g id="Group_1159" data-name="Group 1159" transform="translate(0)">
                <path id="Path_35" data-name="Path 35" class="cls-1" d="M40,0A40,40,0,1,1,0,40,40,40,0,0,1,40,0Z" transform="translate(643 190)"/>
                <g id="Group_29" data-name="Group 29" transform="translate(-5 -46.019)">
                  <g id="Group_30" data-name="Group 30" transform="translate(673 257.019)">
                    <g id="Rectangle_19" data-name="Rectangle 19" class="cls-2" transform="translate(0 11.23)">
                      <rect class="cls-3" width="30.565" height="27.347" rx="2"/>
                      <rect class="cls-4" x="1" y="1" width="28.565" height="25.347" rx="1"/>
                    </g>
                    <path id="Path_29" data-name="Path 29" class="cls-2" d="M4985.685,266.858v-3.092c0-13.133,19.71-12.858,19.71,0" transform="translate(-4979.758 -254.019)"/>
                    <g id="Group_27" data-name="Group 27" transform="translate(9.652 17.664)">
                      <g id="Group_28" data-name="Group 28">
                        <g id="Ellipse_5" data-name="Ellipse 5" class="cls-2">
                          <circle class="cls-3" cx="5.63" cy="5.63" r="5.63"/>
                          <circle class="cls-4" cx="5.63" cy="5.63" r="4.63"/>
                        </g>
                        <line id="Line_6" data-name="Line 6" class="cls-2" y2="4.826" transform="translate(5.63 10.456)"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          `
  };

  @ViewChild('dataContainer') dataContainer: ElementRef;
  private renderIcon(): void {
    for (const name in SvgIconComponent.icons) {
      if (name === this.icon) {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(SvgIconComponent.icons[name]);
        return;
      }
    }
  }
}
