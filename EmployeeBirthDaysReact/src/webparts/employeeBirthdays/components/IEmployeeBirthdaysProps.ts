import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IEmployeeBirthdaysProps {
  title: string;   
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  hasTeamsContext: boolean;
  context: WebPartContext;
  lsitId: string; 
}
