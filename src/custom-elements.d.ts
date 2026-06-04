import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "sourcer-profile-card": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        profile?: string;
        sourcerBaseUrl?: string;
        jobId?: string;
        utmCampaign?: string;
        utmMedium?: string;
      };

      "sourcer-profile-list": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        apiBaseUrl?: string;
        authToken?: string;
        jobId?: string;
        utmCampaign?: string;
        utmMedium?: string;
        sourcerBaseUrl?: string;
        resultLimit?: number;
      };
    }
  }
}