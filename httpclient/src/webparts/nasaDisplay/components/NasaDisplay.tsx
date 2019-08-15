import * as React from 'react';
import styles from './NasaDisplay.module.scss';
import { INasaDisplayProps } from './INasaDisplayProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class NasaDisplay extends React.Component<INasaDisplayProps, {}> {
  public render(): React.ReactElement<INasaDisplayProps> {
    return (
      <div className={ styles.nasaDisplay }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Messing around with HTTP Client</span>
            </div>
          </div>
          <div className={ styles.row }>
            <img src={ this.props.apolloImage.links[0].href } />
            <div><strong>Title:</strong> { this.props.apolloImage.data[0].title }</div>
            <div><strong>Keywords:</strong></div>
            <ul className={ styles.list }>
              { this.props.apolloImage &&
                this.props.apolloImage.data[0].keywords.map((keyword) =>
                  <li key={ keyword} className={ styles.item }>
                    { keyword }
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
