// src/hana/hana.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as hanaClient from '@sap/hana-client';

@Injectable()
export class HanaService {
  private connection: hanaClient.Connection;
  private config: ConfigService;

  constructor(private readonly configService: ConfigService) {
    this.config = configService;
    const connectionParams = {
      serverNode: `${this.config.get<string>(
        'HANA_DB_HOST',
      )}:${+this.config.get<number>('HANA_DB_PORT')}`,
      uid: this.config.get<string>('HANA_DB_USER'),
      pwd: this.config.get<string>('HANA_DB_CREDENTIAL'),
      currentSchema: this.config.get<string>('HANA_DB_DATABASE'),
      pooling: true,
      connectionLifetime: 1800,
    };

    this.connection = hanaClient.createConnection();
    this.connection.connect(connectionParams, (err) => {
      if (err) {
        console.error('Error connecting to SAP HANA:', err);
      } else {
        console.log('Connected to SAP HANA');
      }
    });
  }

  async executeQuery(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.exec(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      this.connection.disconnect(() => {
        console.log('Disconnected from SAP HANA');
        resolve();
      });
    });
  }
}
