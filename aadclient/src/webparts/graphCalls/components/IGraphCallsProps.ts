/* import { IUserItem } from '../../../models/IUserItem'; */
import { MSGraphClient } from '@microsoft/sp-http';
/* export interface IGraphCallsProps {
  userItems: IUserItem[];
} */

export interface IGraphCallsProps {
  graphClient: MSGraphClient;
}