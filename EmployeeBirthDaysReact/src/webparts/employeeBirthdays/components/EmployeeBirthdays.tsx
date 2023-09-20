import * as React from 'react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import styles from './EmployeeBirthdays.module.scss';
import { IEmployeeBirthdaysProps } from './IEmployeeBirthdaysProps';
import { Employee } from './Emplooyee';
import SPCrud from '../services/SPCrud';


export interface IEmployeeBirthdaysState {
  employee: any[];
  filteredEmpls: any[];
  currentMonth: number;
}

export default class EmployeeBirthdays extends React.Component<IEmployeeBirthdaysProps, IEmployeeBirthdaysState> {
  service: SPCrud;
  constructor(props: IEmployeeBirthdaysProps) {
    super(props);
    this.state = { employee: [], filteredEmpls: [], currentMonth: (new Date()).getMonth() }
    this.service = new SPCrud(this.props.context);
  }

  componentDidMount(): void {
    this.props.lsitId && this.service.readItemsById(this.props.lsitId, '?$select=*,Employee/Title,Employee/EMail&$expand=Employee&$top=1000')
      .then(response => {
        console.log('Employees are .... ', response.value);

        const filteredEmps = response.value.filter((e: any) => {
          return (new Date(e.DateOfBirth)).getMonth() == this.state.currentMonth;
        });
        
    
        const emps = filteredEmps.sort((e1: any, e2: any) => {
          const d1 = (new Date(e1.DateOfBirth)).getDate;
          const d2 = (new Date(e2.DateOfBirth)).getDate;
    
          if (d1 < d2)
            return -1;
          if (d1 > d2)
            return 1;
          return 0;
        });
    
        this.setState({employee: response.value, filteredEmpls: emps});
        
      })
  }

  componentDidUpdate(prevProps: Readonly<IEmployeeBirthdaysProps>, prevState: Readonly<IEmployeeBirthdaysState>, snapshot?: any): void {
    if (prevProps.lsitId != this.props.lsitId) {
      this.componentDidMount();
    }
  }


  private arrowClicked(name: string) {
    console.log('You cliocked ', name);
    let currentMonth = this.state.currentMonth;

    if (name == 'next')
      currentMonth = (currentMonth + 1) % 12;
    else
      currentMonth = (currentMonth - 1) == -1 ? 11 : (currentMonth - 1) % 12;


    const filteredEmps = this.state.employee.filter((e) => {
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

    this.setState({currentMonth: currentMonth, filteredEmpls: emps})
    console.log('Sorted Employees', emps);
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<IEmployeeBirthdaysProps> {
    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"];

    const empComponents = this.state.filteredEmpls?.map(e => {
      const dob = new Date(e.DateOfBirth);
      const date = dob.getDate();
      const month = dob.getMonth();
      return <Employee
        name={e.Employee.Title}
        Email={e.Employee.EMail}
        absoluteUrl={this.props.context.pageContext.web.absoluteUrl}
        month={month}
        date={date}
      ></Employee>
    });

    return (
      <section className={`${styles.employeeBirthdays} ${this.props.hasTeamsContext ? styles.teams : ''}`}>
        <div className="row">
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty} />
        </div>
        <div className="row">
          {
            !this.props.lsitId && <Placeholder iconName='Edit'
              iconText='Configure your web part'
              description='Please configure the web part.'
              buttonLabel='Configure'
              onConfigure={this._onConfigure}
            />
          }
          {this.props.lsitId && empComponents}
        </div>

        {this.props.lsitId && <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous" onClick={e => this.arrowClicked('previous')}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item disabled"><a className="page-link" href="#">{MONTH[this.state.currentMonth]}</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next" onClick={e => this.arrowClicked('next')}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>}

      </section>
    );
  }
}
