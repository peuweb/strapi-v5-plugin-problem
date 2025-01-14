import { Strapi } from '@strapi/strapi';

export interface UzapiConfig {
  baseUrl: string;
  sessionKey: string;
}

export interface SendMessageParams {
  number: string;
  text: string;
}

export interface SendTemplateParams {
  number: string;
  template: string;
  components: any[];
}

export interface UzapiService {
  config: UzapiConfig;
  sendText(params: SendMessageParams): Promise<any>;
  sendTemplate(params: SendTemplateParams): Promise<any>;
}

declare module '@strapi/strapi' {
  interface Strapi {
    service(uid: 'api::notification.uzapi'): UzapiService;
  }
} 