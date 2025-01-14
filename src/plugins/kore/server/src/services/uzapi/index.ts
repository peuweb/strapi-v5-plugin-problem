/**
 * Uzapi service for sending WhatsApp messages
 */

import type { Core } from '@strapi/strapi';
import { UzapiConfig, SendMessageParams, SendTemplateParams } from './uzapi';

const uzapiConfig: UzapiConfig = {
  baseUrl: process.env.UZAPI_BASE_URL,
  sessionKey: process.env.UZAPI_SESSION_KEY,
};

const uzapiService = ({ strapi }: { strapi: Core.Strapi }) => ({
  config: uzapiConfig,

  /**
   * Sends a text message via Uzapi WhatsApp service
   * @param params SendMessageParams object containing number and text
   * @returns Promise with the API response
   */
  async sendText(params: SendMessageParams): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/sendText`, {
        method: 'POST',
        headers: {
          'sessionkey': this.config.sessionKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          session: this.config.sessionKey,
          number: params.number,
          text: params.text
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send WhatsApp message: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      strapi.log.error('Uzapi service error:', error);
      throw error;
    }
  },

  /**
   * Sends a template message via Uzapi WhatsApp service
   * @param params object containing number and template data
   * @returns Promise with the API response
   */
  async sendTemplate(params: SendTemplateParams): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/sendTemplate`, {
        method: 'POST',
        headers: {
          'sessionkey': this.config.sessionKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          session: this.config.sessionKey,
          number: params.number,
          template: params.template,
          components: params.components
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send WhatsApp template: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      strapi.log.error('Uzapi service error:', error);
      throw error;
    }
  }
});

export default uzapiService; 