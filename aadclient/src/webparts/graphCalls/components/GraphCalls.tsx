import * as React from 'react';
import styles from './GraphCalls.module.scss';
import { IGraphCallsProps } from './IGraphCallsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class GraphCalls extends React.Component<IGraphCallsProps, {}> {
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
}
