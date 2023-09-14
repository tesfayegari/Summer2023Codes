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
  current: number;
  
  public render(): void {
    SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"];
    let currentMonth = (new Date()).getMonth();
    this.current = currentMonth;
    
    let empHtml='';
 
     const filteredEmps = this.employees.filter((e) => {       
       return (new Date(e.DateOfBirth)).getMonth() == currentMonth;
     });
     console.log('Sorted Employees', filteredEmps);
 
     const emps = filteredEmps.sort((e1, e2) => {
       const d1 = (new Date(e1.DateOfBirth)).getDate;
       const d2 = (new Date(e2.DateOfBirth)).getDate;
       
       if (d1 < d2)
         return -1;
       if (d1 > d2)
         return 1;
       return 0;
     });
     console.log('Sorted Employees', emps);
 
 
     for (let e of emps) {
 
       const dob = new Date(e.DateOfBirth);
       const date = dob.getDate();
       const month = dob.getMonth();
 
       empHtml += `<div class="col-md-3 mb-2">
                       <div class="card">
                           <img src="${this.context.pageContext.site.absoluteUrl}/_layouts/15/userphoto.aspx?size=L&username=${e.Employee.EMail}"
                               class="card-img-top" alt="...">
                           <div class="card-body">
                               <p class="card-text">Happy Birthday, ${e.Employee.Title}</p>
                               <p class="card-text">${MONTH[month]} ${date}</p>
                           </div>
                       </div>
                   </div>`;
 
     }

    //this.renderCurrentData(currentMonth);

    this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <h1>Employee's ${MONTH[currentMonth]} Birthdays</h1>
      <div class="row">   
        ${empHtml}             
      </div>
      <div class="row">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item disabled"><a class="page-link" href="#">${MONTH[currentMonth]}</a></li>            
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
     </section>`;
  }
/*
  private renderCurrentData(currentMonth: number) {
    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"];
    let empHtml = this.generateHtml(currentMonth);
    this.current = currentMonth;
    this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <h1>Employee's ${MONTH[currentMonth]} Birthdays</h1>
      <div class="row">   
        ${empHtml}             
      </div>
      <div class="row">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a id="previousEmp" class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item disabled"><a class="page-link" href="#">${MONTH[currentMonth]}</a></li>            
            <li class="page-item">
              <a id="nextEmp" class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>`;
    let prev = document.getElementById('previousEmp');
    prev?.addEventListener('click', (e:Event) => this.renderCurrentData((this.current -1)%11));
    let next = document.getElementById('nextEmp');
    next?.addEventListener('click', (e:Event) => this.renderCurrentData((this.current + 1)%11));

  }


  private generateHtml(currentMonth: number) {
    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"];
    let empHtml = '';

    const filteredEmps = this.employees.filter((e) => {
      //console.log('Comparisons', parseInt(e.Month), currentMonth);
      //return (parseInt(e.Month) - 1) == currentMonth;
      return (new Date(e.DateOfBirth)).getMonth() == currentMonth;
    });
    console.log('Sorted Employees', filteredEmps);

    const emps = filteredEmps.sort((e1, e2) => {
      const d1 = (new Date(e1.DateOfBirth)).getDate;
      const d2 = (new Date(e2.DateOfBirth)).getDate;
      // if (e1.Day < e2.Day)
      //   return -1;
      // if (e1.Day > e2.Day)
      //   return 1;
      if (d1 < d2)
        return -1;
      if (d1 > d2)
        return 1;
      return 0;
    });
    console.log('Sorted Employees', emps);


    for (let e of emps) {

      const dob = new Date(e.DateOfBirth);
      const date = dob.getDate();
      const month = dob.getMonth();

      empHtml += `<div class="col-md-3 mb-2">
                      <div class="card">
                          <img src="${this.context.pageContext.site.absoluteUrl}/_layouts/15/userphoto.aspx?size=L&username=${e.Employee.EMail}"
                              class="card-img-top" alt="...">
                          <div class="card-body">
                              <p class="card-text">Happy Birthday, ${e.Employee.Title}</p>
                              <p class="card-text">${MONTH[month]} ${date}</p>
                          </div>
                      </div>
                  </div>`;

    }
    return empHtml;
  }
*/
  protected onInit(): Promise<void> {
    let service = new SPCrud(this.context);

    return service.readItems('EmployeeBirthDays', '?$select=*,Employee/Title,Employee/EMail&$expand=Employee&$top=1000')
      .then(response => {
        console.log('Employees are .... ', response.value);
        this.employees = response.value;
      })
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
