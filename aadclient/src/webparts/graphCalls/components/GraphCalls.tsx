import * as React from 'react';
import styles from './GraphCalls.module.scss';
import { IGraphCallsProps } from './IGraphCallsProps';
import { IGraphCallsState } from './IGraphCallsState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';


export default class GraphPeople extends React.Component<IGraphCallsProps, IGraphCallsState> {
  constructor(props: IGraphCallsProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      image: null
    };
  }

  public render(): React.ReactElement<IGraphCallsProps> {
    return (
      <Persona primaryText={this.state.name}
        secondaryText={this.state.email}
        onRenderSecondaryText={this._renderMail}
        tertiaryText={this.state.phone}
        onRenderTertiaryText={this._renderPhone}
        imageUrl={this.state.image}
        size={PersonaSize.size100} />
    );
  }

  private _renderMail = () => {
    if (this.state.email) {
      return <Link href={`mailto:${this.state.email}`}>{this.state.email}</Link>;
    } else {
      return <div />;
    }
  }

  private _renderPhone = () => {
    if (this.state.phone) {
      return <Link href={`tel:${this.state.phone}`}>{this.state.phone}</Link>;
    } else {
      return <div />;
    }
  }

  public componentDidMount(): void {
    this.props.graphClient
      .api('me')
      .get((error: any, user: MicrosoftGraph.User, rawResponse?: any) => {
        this.setState({
          name: user.displayName,
          email: user.mail,
          phone: user.businessPhones[0]
        });
      });
  
    this.props.graphClient
      .api('/me/photo/$value')
      .responseType('blob')
      .get((err: any, photoResponse: any, rawResponse: any) => {
        const blobUrl = window.URL.createObjectURL(photoResponse);
        this.setState({ image: blobUrl });
      });
  }  
}

/* export default class GraphCalls extends React.Component<IGraphCallsProps, {}> {
  public render(): React.ReactElement<IGraphCallsProps> {
    return (
      <div className={ styles.graphCalls }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>AadHttpClient Demo</span>
            </div>
          </div>

          <div className={ styles.row }>
            <div><strong>Mail:</strong></div>
            <ul className={ styles.list }>
              { this.props.userItems &&
                this.props.userItems.map((user) =>
                  <li key={ user.id } className={ styles.item }>
                    <strong>ID:</strong> { user.id }<br />
                    <strong>Email:</strong> { user.mail }<br />
                    <strong>DisplayName:</strong> { user.displayName }
                  </li>
                )
              }
            </ul>
          </div>

        </div>
      </div>
    );
  }
} */
