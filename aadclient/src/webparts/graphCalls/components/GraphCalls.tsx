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
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
