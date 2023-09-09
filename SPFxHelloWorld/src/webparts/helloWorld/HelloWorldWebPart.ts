import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPComponentLoader } from "@microsoft/sp-loader";


import styles from './HelloWorldWebPart.module.scss';

import SPCrud from './services/SPCrud';

export interface IHelloWorldWebPartProps {
  description: string;
  listChoice: string;
  choiceGroup: string;
  slinder: number;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';
  employees: any[];

  public render(): void {
    SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");



    this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <h1>Employee Birthdays</h1>
      <div class="row">
      <div class="col-md-3">
          <div class="card">
              <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
                  class="card-img-top" alt="...">
              <div class="card-body">
                  <p class="card-text">Happy Birthday John Do</p>
                  <p class="card-text">September 20</p>
              </div>
          </div>
      </div>
      <div class="col-md-3">
          <div class="card">
              <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
                  class="card-img-top" alt="...">
              <div class="card-body">
                  <p class="card-text">Happy Birthday John Do</p>
                  <p class="card-text">September 20</p>
              </div>
          </div>
      </div>
      <div class="col-md-3">
          <div class="card">
              <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
                  class="card-img-top" alt="...">
              <div class="card-body">
                  <p class="card-text">Happy Birthday John Do</p>
                  <p class="card-text">September 20</p>
              </div>
          </div>
      </div>
      <div class="col-md-3">
          <div class="card">
              <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
                  class="card-img-top" alt="...">
              <div class="card-body">
                  <p class="card-text">Happy Birthday John Do</p>
                  <p class="card-text">September 20</p>
              </div>
          </div>
      </div>
    </div>
    </section>`;
  }

  protected onInit(): Promise<void> {
    let service = new SPCrud(this.context);

    return service.readItems('EmployeeBirthDays', '?$select=*,Employee/Title,Employee/EMail&$expand=Employee')
      .then(response => {
        console.log('Employees are .... ', response.value);
        this.employees = response.value;
      })
    // return this._getEnvironmentMessage().then(message => {
    //   //this._environmentMessage = message;
    // });
  }


  /*
    private _getEnvironmentMessage(): Promise<string> {
      if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
        return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
          .then(context => {
            let environmentMessage: string = '';
            switch (context.app.host.name) {
              case 'Office': // running in Office
                environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
                break;
              case 'Outlook': // running in Outlook
                environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
                break;
              case 'Teams': // running in Teams
                environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
                break;
              default:
                throw new Error('Unknown host');
            }
  
            return environmentMessage;
          });
      }
  
      return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
    }
  */
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Webpart Settings"
          },
          groups: [
            {
              groupName: "General Settings",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Webpart Title"
                }),
                PropertyPaneDropdown('listChoice', {
                  label: 'Select a list',
                  options: [
                    { key: 'Red', text: 'Red' },
                    { key: 'Blue', text: 'Blue' },
                    { key: 'Green', text: 'Green' },
                    { key: 'Black', text: 'Black' },
                    { key: 'Yellow', text: 'Yellow' }
                  ]
                }),
                PropertyPaneChoiceGroup('choiceGroup', {
                  label: 'Display',
                  options: [
                    { key: 'Red', text: 'Red' },
                    { key: 'Blue', text: 'Blue' },
                    { key: 'Green', text: 'Green' },
                    { key: 'Black', text: 'Black' },
                    { key: 'Yellow', text: 'Yellow' }
                  ]
                }),
                PropertyPaneSlider('slinder', {
                  label: 'Number of item to display',
                  min: 0,
                  max: 50,
                  value: 23
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
