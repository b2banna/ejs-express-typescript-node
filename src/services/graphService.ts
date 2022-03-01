'use strict'

import { Client } from '@microsoft/microsoft-graph-client';
require('isomorphic-fetch');

import constants from '../constants';

export default class MicrosoftGraphService {

    private async _getAuthenticatedClient(accessToken: string): Promise<Client> {
        return Client.init({ authProvider: (done) => done(null, accessToken) });
    }

    public async getUserDetails(accessToken: string) {
        const client = await this._getAuthenticatedClient(accessToken);
        return await client.api(constants.MICROSOFT_GRAPH_CLIENT.API.ME.URL)
            .select(constants.MICROSOFT_GRAPH_CLIENT.API.ME.SELECT)
            .get();
    }

    public async getUserPhoto(accessToken: string) {
        const client = await this._getAuthenticatedClient(accessToken);
        return await client.api('me/photo/$value')
            .get();
    }

}
