import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'GraphCallsWebPartStrings';
import GraphCalls from './components/GraphCalls';
import { IGraphCallsProps } from './components/IGraphCallsProps';
import { IUserItem } from '../../models/IUserItem';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IGraphCallsWebPartProps {
  description: string;
}

export default class GraphCallsWebPart extends BaseClientSideWebPart<IGraphCallsWebPartProps> {

/*   public render(): void {
    if (!this.renderedOnce) {
      this._getUsers()
        .then((results: IUserItem[]) => {
          const element: React.ReactElement<IGraphCallsProps> = React.createElement(
            GraphCalls,
            {
              userItems: results
            }
        );
  
        ReactDom.render(element, this.domElement);
      });
    }

  } */
  public render(): void {
    this.context.msGraphClientFactory.getClient()
    .then((client: MSGraphClient): void => {
      const element: React.ReactElement<IGraphCallsProps> = React.createElement(
        GraphCalls,
        {
          graphClient: client
        }
      );
    
      ReactDom.render(element, this.domElement);
    });
  }

  
  private _getUsers(): Promise<IUserItem[]> {
    return new Promise<IUserItem[]>((resolve, reject) => {
      this.context.aadHttpClientFactory
        .getClient('https://graph.microsoft.com')
        .then((aadClient: AadHttpClient) => {
          const endpoint: string = 'https://graph.microsoft.com/v1.0/users?$top=10&$select=id,displayName,mail';
          aadClient.get(endpoint, AadHttpClient.configurations.v1)
            .then((rawResponse: HttpClientResponse) => {
              return rawResponse.json();
            })
            .then((jsonResponse: any) => {
              resolve(jsonResponse.value);
            });
        });
      });
  }  

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
